# Налаштування SSO: Microsoft Entra ID (Azure AD)

!!! abstract "Огляд"

    Покрокове налаштування входу у WildcoreDMS через **Microsoft Entra ID** (колишній Azure AD,
    Microsoft 365). Загальний опис (як працює SSO, ролі, типові помилки) — на сторінці
    [Вхід через SSO](./index.md).

## Що потрібно знати заздалегідь

| Параметр | Значення |
|----------|----------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Адреса налаштувань | `https://login.microsoftonline.com/<tenant-id>/v2.0/.well-known/openid-configuration` |
| Issuer | `https://login.microsoftonline.com/<tenant-id>/v2.0` |
| Claim груп | `roles` (App roles застосунку) |

!!! warning "Лише конкретний tenant"
    Використовуйте адресу з **Directory (tenant) ID**. Для адрес `common` / `organizations`
    issuer у документі містить шаблон `{tenantid}`, і перевірка не пройде.

## 1. Реєстрація застосунку

1. Відкрийте [Microsoft Entra admin center](https://entra.microsoft.com/) →
   **Identity** → **Applications** → **App registrations** → **New registration**
   (або в порталі Azure: **Microsoft Entra ID** → **App registrations**).
2. Заповніть:
    - Name — `WildcoreDMS`;
    - Supported account types — **Accounts in this organizational directory only (Single tenant)**;
    - Redirect URI — платформа **Web**, адреса `https://dms.example.com/api/v1/auth/oidc/callback`.
3. **Register**.
4. На сторінці **Overview** скопіюйте **Application (client) ID** та **Directory (tenant) ID**.
   Кнопка **Endpoints** показує точну адресу **OpenID Connect metadata document**.

## 2. Секрет клієнта

1. **Certificates & secrets** → вкладка **Client secrets** → **New client secret**.
2. Description — `WildcoreDMS`, Expires — оберіть термін → **Add**.
3. Одразу скопіюйте значення з колонки **Value** (не *Secret ID*) — пізніше воно буде приховане.

!!! warning
    Секрет має термін дії. Заздалегідь створіть новий і оновіть його у WildcoreDMS
    (`wca auth:configure`), інакше вхід через SSO перестане працювати.

## 3. Email у токені

1. **Token configuration** → **Add optional claim**.
2. Token type — **ID** → позначте `email` (за бажанням `preferred_username`) → **Add**.
3. Якщо з'явиться запит *Turn on the Microsoft Graph email permission* — погодьтесь.

Перевірте **API permissions**: мають бути делеговані дозволи Microsoft Graph `openid`,
`profile`, `email` (та `User.Read`). За потреби натисніть **Grant admin consent for ...**.

## 4. Ролі застосунку (App roles)

Групи Entra ID приходять у токені як ідентифікатори (GUID), а не назви, тому для ролей
WildcoreDMS зручніше використовувати **App roles** — вони приходять у claim `roles` рядками.

1. У застосунку → **App roles** → **Create app role**.
2. Заповніть:
    - Display name — наприклад `WildcoreDMS Administrator`;
    - Allowed member types — **Users/Groups**;
    - **Value** — назва для зіставлення з роллю WildcoreDMS, наприклад `administrator`
      (саме це значення вказується у «Зіставленні груп SSO»);
    - Description — довільно;
    - *Do you want to enable this app role?* — позначено → **Apply**.
3. Повторіть для кожної ролі (`operator`, `installer`, ...).

Майстер `wca auth:configure` може вивести список значень, які потрібно створити, для
вибраних ролей WildcoreDMS.

## 5. Призначення користувачів

1. **Identity** → **Applications** → **Enterprise applications** → `WildcoreDMS`.
2. **Users and groups** → **Add user/group** → оберіть користувачів (або групи — потрібна
   ліцензія Entra ID P1/P2) → **Select a role** → роль застосунку → **Assign**.
3. Щоб увійти могли лише призначені користувачі: **Properties** → **Assignment required?** — **Yes** → **Save**.

## 6. Налаштування WildcoreDMS

```bash
sudo wca auth:configure
```

Оберіть провайдера `entra`, вкажіть адресу налаштувань з кроку 1, Application (client) ID
та значення секрету. Або вручну в `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=Microsoft
OIDC_ISSUER=https://login.microsoftonline.com/<tenant-id>/v2.0
OIDC_CLIENT_ID=<Application (client) ID>
OIDC_CLIENT_SECRET=<Value секрету>
OIDC_EMAIL_CLAIM=email
OIDC_LOGIN_CLAIM=preferred_username
OIDC_GROUPS_CLAIM=roles
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=yes
```

та виконайте `sudo wca system:http:reset`.

Особливості:

- Якщо у користувачів не заповнено атрибут пошти, використовуйте
  `OIDC_EMAIL_CLAIM=preferred_username` (UPN у форматі email).
- `preferred_username` (UPN) може бути довшим за 50 символів — тоді оберіть інший
  `OIDC_LOGIN_CLAIM` або створіть користувача у WildcoreDMS заздалегідь.

У веб-панелі WildcoreDMS: `Користувачі > Ролі` → `Змінити` → **«Зіставлення груп SSO»** —
впишіть **Value** відповідних App roles. Див. [Ролі](./index.md#roles).
