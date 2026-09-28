# Налаштування SSO: Authentik

!!! abstract "Огляд"

    Покрокове налаштування входу у WildcoreDMS через **Authentik**. Загальний опис
    (як працює SSO, ролі, типові помилки) — на сторінці [Вхід через SSO](./index.md).

    Приклади нижче:

    - адреса WildcoreDMS — `https://dms.example.com`;
    - адреса Authentik — `https://auth.example.com`;
    - slug застосунку — `wildcore`.

## Що потрібно знати заздалегідь

| Параметр | Значення |
|----------|----------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Адреса налаштувань | `https://auth.example.com/application/o/wildcore/.well-known/openid-configuration` |
| Issuer | `https://auth.example.com/application/o/wildcore/` (**зі слешем у кінці**) |
| Claim груп | `groups` (приходить разом зі scope `profile`) |

## 1. Створення провайдера та застосунку

У нових версіях Authentik найпростіше скористатися майстром:
`Applications` → `Applications` → **Create with Provider** (у старих версіях — спершу
створіть провайдера, потім застосунок, див. нижче).

**Застосунок (Application):**

- Name — `WildcoreDMS`;
- Slug — `wildcore` (з нього будується issuer);
- Launch URL — `https://dms.example.com` (необов'язково, для показу в порталі користувача).

**Тип провайдера:** **OAuth2/OpenID Provider**.

**Налаштування провайдера:**

- Name — `WildcoreDMS`;
- Authorization flow — `default-provider-authorization-implicit-consent`
  (без додаткового екрана згоди) або `...-explicit-consent`;
- **Client type — `Confidential`**;
- Client ID — згенерований (скопіюйте);
- Client Secret — згенерований (скопіюйте);
- **Redirect URIs/Origins** — `https://dms.example.com/api/v1/auth/oidc/callback`
  (режим *Strict*, якщо є вибір);
- **Signing Key** — будь-який RSA-сертифікат, наприклад `authentik Self-signed Certificate`.
  Без ключа токени підписуються HS256, а WildcoreDMS приймає лише **RS256**.

У розділі **Advanced protocol settings** перевірте:

- Scopes — обрані `openid`, `email`, `profile` (типові mapping'и authentik);
- Subject mode — можна залишити за замовчуванням;
- **Include claims in id_token** — увімкнено (рекомендовано).

Завершіть майстер (**Submit**).

??? note "Старі версії Authentik (без майстра)"
    1. `Applications` → `Providers` → **Create** → **OAuth2/OpenID Provider** → заповніть поля,
       як описано вище → **Finish**.
    2. `Applications` → `Applications` → **Create**: Name, Slug `wildcore`, Provider — створений
       провайдер → **Create**.

## 2. Адреса налаштувань та issuer

Відкрийте `Applications` → `Providers` → провайдер WildcoreDMS. На сторінці провайдера вказані
**OpenID Configuration URL** та **OpenID Configuration Issuer** — саме їх використовуйте при
налаштуванні WildcoreDMS.

## 3. Групи для ролей WildcoreDMS

1. `Directory` → `Groups` → **Create**: Name — назва, що зіставлятиметься з роллю
   WildcoreDMS, наприклад `wildcore-admins`, `operator` → **Create**.
2. Відкрийте групу → вкладка **Users** → **Add existing user** → оберіть користувачів.
3. Перевірте, що у користувачів заповнено **Email** (`Directory` → `Users` → користувач → **Edit**).

Групи користувача приходять у claim `groups` через scope `profile` — додатково нічого
налаштовувати не потрібно.

!!! tip "Обмеження доступу до застосунку"
    Щоб увійти у WildcoreDMS могли лише певні користувачі: `Applications` → `Applications` →
    `WildcoreDMS` → вкладка **Policy / Group / User Bindings** → **Bind existing policy/group/user**
    → оберіть групу. Інші користувачі отримають відмову ще на стороні Authentik.

## 4. Перевірка токена

`Applications` → `Providers` → провайдер WildcoreDMS → вкладка **Preview** → оберіть користувача.
У результаті мають бути `email`, `preferred_username` та `groups`.

## 5. Налаштування WildcoreDMS

```bash
sudo wca auth:configure
```

Оберіть провайдера `authentik`, вкажіть **OpenID Configuration URL**, Client ID та Client Secret.
Або вручну в `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=Authentik
OIDC_ISSUER=https://auth.example.com/application/o/wildcore/
OIDC_CLIENT_ID=<Client ID>
OIDC_CLIENT_SECRET=<Client Secret>
OIDC_LOGIN_CLAIM=preferred_username
OIDC_GROUPS_CLAIM=groups
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=yes
```

та виконайте `sudo wca system:http:reset`.

У веб-панелі WildcoreDMS: `Користувачі > Ролі` → `Змінити` → **«Зіставлення груп SSO»** —
впишіть назви груп Authentik (наприклад `wildcore-admins`). Див. [Ролі](./index.md#roles).
