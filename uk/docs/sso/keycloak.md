# Налаштування SSO: Keycloak

!!! abstract "Огляд"

    Покрокове налаштування входу у WildcoreDMS через **Keycloak**. Загальний опис
    (як працює SSO, ролі, типові помилки) — на сторінці [Вхід через SSO](./index.md).

    Нижче використовуються приклади:

    - адреса WildcoreDMS — `https://dms.example.com`;
    - адреса Keycloak — `https://sso.example.com`, realm — `main`;
    - Client ID — `wildcore`.

## Що потрібно знати заздалегідь

| Параметр | Значення |
|----------|----------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Адреса налаштувань (Keycloak 17+) | `https://sso.example.com/realms/main/.well-known/openid-configuration` |
| Адреса налаштувань (до 17 або з `/auth`) | `https://sso.example.com/auth/realms/main/.well-known/openid-configuration` |
| Claim груп (рекомендовано) | `resource_access.wildcore.roles` — ролі клієнта |

!!! warning "Публічна адреса Keycloak"
    Keycloak формує issuer з адреси запиту. Зафіксуйте публічну адресу параметром
    `KC_HOSTNAME` / `--hostname` (Keycloak 17+) або полем **Frontend URL** у
    `Realm settings` (старі версії), і переконайтесь, що сервер WildcoreDMS звертається до
    Keycloak за **тією ж** адресою, що і браузер.

Є два шляхи: швидкий — імпорт JSON, який генерує майстер WildcoreDMS, та ручний — через
інтерфейс Keycloak.

## Варіант 1. Швидке налаштування через Partial import (рекомендовано)

Майстер WildcoreDMS генерує файл, який одним імпортом створює в realm клієнт, mapper та
ролі для всіх ролей WildcoreDMS.

**На сервері WildcoreDMS:**

1. Виконайте `sudo wca auth:configure`, оберіть способи входу (`internal,oidc`) та провайдера `keycloak`.
2. Вкажіть адресу `https://sso.example.com/realms/main/.well-known/openid-configuration`.
3. **Client ID** — будь-який, наприклад `wildcore` (клієнт створиться при імпорті).
   **Client secret** можна залишити порожнім — майстер згенерує його сам і запише
   і в JSON, і в налаштування WildcoreDMS.
4. **Groups claim** — залиште за замовчуванням `resource_access.wildcore.roles`
   (ролі клієнта). Альтернативи: `realm_access.roles` (ролі realm) або `groups` (групи Keycloak).
5. На питання `Generate Keycloak partial import JSON` відповідайте `yes` і позначте ролі
   WildcoreDMS, для яких треба створити ролі в Keycloak.
   Назви беруться з поля «Зіставлення груп SSO» ролі, а якщо воно порожнє — транслітеруються
   (`Офіс Менеджер` → `ofis-menedzher`) і зберігаються у зіставлення ролі.
6. Майстер виведе JSON і збереже його у файл `var/keycloak-import-wildcore.json`
   (повний шлях показано у виводі). Скопіюйте файл на свій комп'ютер.

**В адмін-консолі Keycloak:**

1. Оберіть realm `main` (список realm у лівому верхньому куті).
2. `Realm settings` → кнопка **Action** (праворуч угорі) → **Partial import**.
3. Завантажте файл JSON, позначте ресурси (Clients, Roles/Groups) → **Import**.
4. Призначте ролі користувачам: `Users` → користувач → вкладка **Role mapping** →
   **Assign role** → фільтр **Filter by clients** → оберіть ролі клієнта `wildcore` → **Assign**.
   (Якщо обрано `groups` — додайте користувачів у групи: `Users` → користувач → **Groups** → **Join Group**.)
5. Перевірте, що у користувачів заповнений **Email** (`Users` → користувач → **Details**).

!!! danger "Окремий Client ID для кожної інсталяції"
    Якщо клієнт вже існує, варіант **Overwrite** при імпорті замінить його secret — і всі
    інсталяції, що його використовують, перестануть входити. Використовуйте окремі Client ID,
    наприклад `wildcore-dms` та `wildcore-dms-dev`.

## Варіант 2. Ручне налаштування через інтерфейс

### Keycloak 19+ (нова адмін-консоль)

**1. Створення клієнта**

1. Оберіть realm → `Clients` → **Create client**.
2. **General settings:**
    - Client type — `OpenID Connect`;
    - Client ID — `wildcore`;
    - Name — `WildcoreDMS` (довільно) → **Next**.
3. **Capability config:**
    - Client authentication — **On** (це робить клієнт конфіденційним);
    - Authorization — Off;
    - Authentication flow — лише **Standard flow** (зніміть *Direct access grants*,
      *Implicit flow*, *Service accounts roles*);
    - PKCE Method (якщо поле є у вашій версії) — `S256` → **Next**.
4. **Login settings:**
    - Valid redirect URIs — `https://dms.example.com/api/v1/auth/oidc/callback`;
    - Root URL / Home URL — `https://dms.example.com` (необов'язково);
    - Web origins — можна залишити порожнім → **Save**.
5. Відкрийте вкладку **Credentials**: Client Authenticator — `Client Id and Secret`,
   скопіюйте **Client secret**.
6. (Необов'язково, для старіших 19+ без поля PKCE) вкладка **Advanced** → *Advanced settings* →
   **Proof Key for Code Exchange Code Challenge Method** — `S256` → **Save**.

**2. Ролі для WildcoreDMS**

1. `Clients` → `wildcore` → вкладка **Roles** → **Create role**.
2. Role name — назва, яка буде зіставлена з роллю WildcoreDMS, наприклад `administrator`,
   `operator`, `installer` → **Save**. Повторіть для кожної ролі.

**3. Mapper — передача ролей у ID token**

За замовчуванням Keycloak кладе ролі лише в access token, а WildcoreDMS читає ID token та
userinfo, тому потрібен mapper:

1. `Clients` → `wildcore` → вкладка **Client scopes** → `wildcore-dedicated`.
2. **Configure a new mapper** (або **Add mapper** → **By configuration**) → **User Client Role**.
3. Заповніть:
    - Name — `client roles`;
    - Client ID — `wildcore`;
    - Multivalued — **On**;
    - Token Claim Name — `resource_access.${client_id}.roles`;
    - Claim JSON Type — `String`;
    - **Add to ID token** — **On**, Add to access token — On, **Add to userinfo** — **On** → **Save**.

Інші варіанти джерела груп:

| Джерело | Mapper type | Token Claim Name | Groups claim у WildcoreDMS |
|---------|-------------|------------------|----------------------------|
| Ролі клієнта (рекомендовано) | User Client Role, Client ID `wildcore`, Multivalued On | `resource_access.${client_id}.roles` | `resource_access.wildcore.roles` |
| Ролі realm | User Realm Role, Multivalued On | `realm_access.roles` | `realm_access.roles` |
| Групи | Group Membership, **Full group path Off** | `groups` | `groups` |

З *Full group path On* групи приходять як `/wca-admins` — тоді вказуйте їх у зіставленні
ролей разом зі слешем.

**4. Призначення ролей користувачам**

`Users` → користувач → вкладка **Role mapping** → **Assign role** → **Filter by clients** →
ролі клієнта `wildcore` → **Assign**. Перевірте, що у користувача заповнено **Email**.

**5. Перевірка токена**

`Clients` → `wildcore` → **Client scopes** → вкладка **Evaluate** → оберіть користувача →
**Generated ID token**. У токені мають бути `email`, `preferred_username` та
`resource_access.wildcore.roles`.

### Keycloak до 19 (стара адмін-консоль)

1. Realm → `Clients` → **Create**: Client ID `wildcore`, Client Protocol `openid-connect` → **Save**.
2. Вкладка **Settings**:
    - Access Type — **confidential**;
    - Standard Flow Enabled — **On**, Implicit Flow / Direct Access Grants / Service Accounts — Off;
    - Valid Redirect URIs — `https://dms.example.com/api/v1/auth/oidc/callback` → **Save**.
3. Вкладка **Credentials** → скопіюйте **Secret**.
4. Вкладка **Roles** → **Add Role** — створіть ролі для WildcoreDMS.
5. Вкладка **Mappers** → **Create**: Mapper Type `User Client Role`, Client ID `wildcore`,
   Multivalued On, Token Claim Name `resource_access.${client_id}.roles`,
   **Add to ID token On**, Add to userinfo On → **Save**.
6. Користувачам: `Users` → користувач → **Role Mappings** → *Client Roles* `wildcore` → **Add selected**.

## Налаштування WildcoreDMS

```bash
sudo wca auth:configure
```

Оберіть провайдера `keycloak`, вкажіть адресу налаштувань, Client ID та Client secret,
Groups claim `resource_access.wildcore.roles`. Або вручну в `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=Keycloak
OIDC_ISSUER=https://sso.example.com/realms/main
OIDC_CLIENT_ID=wildcore
OIDC_CLIENT_SECRET=<Client secret>
OIDC_LOGIN_CLAIM=preferred_username
OIDC_GROUPS_CLAIM=resource_access.wildcore.roles
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=yes
```

та виконайте `sudo wca system:http:reset`.

Далі у веб-панелі WildcoreDMS: `Користувачі > Ролі` → `Змінити` → **«Зіставлення груп SSO»** —
впишіть назви ролей Keycloak (якщо назви ролей збігаються, поле можна не заповнювати —
див. [Ролі](./index.md#roles)).
