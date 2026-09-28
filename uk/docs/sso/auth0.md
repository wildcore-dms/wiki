# Налаштування SSO: Auth0

!!! abstract "Огляд"

    Покрокове налаштування входу у WildcoreDMS через **Auth0** (Okta Customer Identity).
    Загальний опис (як працює SSO, ролі, типові помилки) — на сторінці [Вхід через SSO](./index.md).

## Що потрібно знати заздалегідь

| Параметр | Значення |
|----------|----------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Адреса налаштувань | `https://<tenant>.<region>.auth0.com/.well-known/openid-configuration` (або ваш custom domain) |
| Issuer | `https://<tenant>.<region>.auth0.com/` (**зі слешем у кінці**) |
| Логін користувача | `nickname` (у Auth0 немає `preferred_username`) |
| Claim груп | `roles` (додається через Action, див. крок 4) |

## 1. Створення застосунку

1. [Auth0 Dashboard](https://manage.auth0.com/) → **Applications** → **Applications** →
   **Create Application**.
2. Name — `WildcoreDMS`, тип — **Regular Web Applications** → **Create**.
   (Екран вибору технології можна пропустити.)

## 2. Налаштування застосунку

Вкладка **Settings**:

- **Domain**, **Client ID**, **Client Secret** — скопіюйте, знадобляться для WildcoreDMS;
- **Allowed Callback URLs** — `https://dms.example.com/api/v1/auth/oidc/callback`;
- Allowed Logout URLs / Allowed Web Origins — можна залишити порожніми;
- внизу **Advanced Settings**:
    - вкладка **OAuth** — JSON Web Token (JWT) Signature Algorithm — **RS256**;
    - вкладка **Grant Types** — позначено **Authorization Code** (інші можна зняти);
- **Save Changes**.

Вкладка **Credentials**: **Authentication Method** — **Client Secret (Basic)** → **Save**.
WildcoreDMS передає secret через Basic-авторизацію.

Вкладка **Connections**: залиште увімкненими лише ті джерела користувачів (Database, Google,
Enterprise), якими мають входити співробітники.

## 3. Ролі

1. **User Management** → **Roles** → **Create Role**: Name — назва для зіставлення з роллю
   WildcoreDMS (наприклад `administrator`, `operator`), Description → **Create**.
2. Призначення: **User Management** → **Users** → користувач → вкладка **Roles** →
   **Assign Roles** → оберіть роль → **Assign**.
3. Перевірте, що у користувача заповнено email.

## 4. Передача ролей у токен (Action)

За замовчуванням ролі Auth0 у токен не потрапляють — їх додає Action:

1. **Actions** → **Library** → **Create Action** → **Build from scratch**
   (у старих версіях — **Build Custom**).
2. Name — `Add roles to ID token`, Trigger — **Login / Post Login**, Runtime — рекомендований → **Create**.
3. Замініть код на:

    ```js
    exports.onExecutePostLogin = async (event, api) => {
      api.idToken.setCustomClaim('roles', event.authorization?.roles || []);
    };
    ```

4. **Deploy**.
5. **Actions** → **Triggers** (у старих версіях — **Flows**) → **post-login** → перетягніть
   `Add roles to ID token` з правої панелі (*Custom*) між **Start** та **Complete** → **Apply**.

Claim можна назвати і з namespace (наприклад `https://dms.example.com/roles`) — тоді вкажіть
його повністю в `OIDC_GROUPS_CLAIM`.

## 5. Налаштування WildcoreDMS

```bash
sudo wca auth:configure
```

Оберіть провайдера `auth0`, вкажіть адресу `https://<Domain>/.well-known/openid-configuration`,
Client ID та Client Secret. Або вручну в `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=Auth0
OIDC_ISSUER=https://<tenant>.<region>.auth0.com/
OIDC_CLIENT_ID=<Client ID>
OIDC_CLIENT_SECRET=<Client Secret>
OIDC_LOGIN_CLAIM=nickname
OIDC_GROUPS_CLAIM=roles
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=yes
```

та виконайте `sudo wca system:http:reset`.

У веб-панелі WildcoreDMS: `Користувачі > Ролі` → `Змінити` → **«Зіставлення груп SSO»** —
впишіть назви ролей Auth0. Див. [Ролі](./index.md#roles).

!!! tip "Перевірка токена"
    Якщо роль не призначається, подивіться текст помилки на сторінці входу WildcoreDMS:
    у дужках вказані групи, отримані від провайдера. Порожньо — Action не додано у
    post-login trigger або не натиснуто **Deploy** / **Apply**.
