# Вхід через SSO (OpenID Connect)

!!! abstract "Огляд"

    Починаючи з версії **0.31** WildcoreDMS підтримує вхід через зовнішнього провайдера
    ідентифікації за протоколом **OpenID Connect (OIDC)** — Keycloak, Authentik,
    Google Workspace, Microsoft Entra ID (Azure AD), Auth0, Authelia, Zitadel, GitLab тощо.

    Користувачі входять кнопкою **«Увійти через ...»** на сторінці входу, обліковий запис
    у WildcoreDMS створюється автоматично при першому вході, а роль може призначатись
    за групами/ролями користувача у провайдері.

Ця сторінка описує загальну частину, яка не залежить від провайдера. Покрокові
інструкції для конкретних систем (що і де натискати в їх інтерфейсі):

| Провайдер | Інструкція |
|-----------|------------|
| Keycloak | [Налаштування Keycloak](./keycloak.md) |
| Authentik | [Налаштування Authentik](./authentik.md) |
| Google Workspace | [Налаштування Google](./google.md) |
| Microsoft Entra ID (Azure AD) | [Налаштування Entra ID](./entra-id.md) |
| Auth0 | [Налаштування Auth0](./auth0.md) |
| Інші (Authelia, Zitadel, GitLab, ...) | [див. нижче](#other) |

## Як це працює

```
Браузер ──> WildcoreDMS ──> сторінка входу провайдера (логін/пароль, MFA)
Провайдер ──> WildcoreDMS: /api/v1/auth/oidc/callback?code=...
WildcoreDMS ──(сервер-сервер)──> провайдер: обмін коду на токени, перевірка підпису
WildcoreDMS ──> користувач потрапляє у веб-панель з потрібною роллю
```

- Використовується **Authorization Code Flow + PKCE (S256)** з конфіденційним клієнтом
  (Client ID + Client secret).
- Адреси провайдера та ключі підпису WildcoreDMS отримує сам з документа
  `{issuer}/.well-known/openid-configuration` — вказувати їх вручну не потрібно.
- Вхід за логіном/паролем можна залишити паралельно з SSO.
- Двофакторна автентифікація та обмеження за IP, налаштовані у користувача WildcoreDMS,
  діють і при вході через SSO.

## Вимоги до провайдера

| Вимога | Де перевірити |
|--------|---------------|
| Публікує документ `{issuer}/.well-known/openid-configuration` | відкрити адресу в браузері |
| Підписує ID token алгоритмом **RS256** | поле `id_token_signing_alg_values_supported` у документі |
| Підтримує автентифікацію клієнта **`client_secret_basic`** | поле `token_endpoint_auth_methods_supported` у документі |
| Передає **email** користувача в ID token або userinfo | див. [Дані користувача](#claims) |

**Мережа.** Браузер користувача має відкривати сторінку провайдера, а сервер
WildcoreDMS (контейнер `wca`) — мати доступ до провайдера (завантаження налаштувань,
ключів, обмін коду). Сам провайдер до WildcoreDMS не звертається, тому WildcoreDMS може
бути у закритій мережі.

## Крок 1. Реєстрація клієнта у провайдера { #client }

У будь-якому провайдері створюється «застосунок»/«клієнт» OIDC. Назви полів відрізняються,
зміст однаковий:

| Параметр | Значення |
|----------|----------|
| Тип | OpenID Connect, web application, **confidential** (з секретом) |
| Grant type / flow | **Authorization Code** (інші не потрібні) |
| Redirect URI / Callback URL | `https://<адреса WildcoreDMS>/api/v1/auth/oidc/callback` |
| Scopes | `openid`, `profile`, `email` (+ scope з групами, якщо провайдер цього вимагає) |
| Автентифікація клієнта | client secret (basic) |
| PKCE | можна зробити обов'язковим, метод `S256` |

!!! info "Redirect URI"
    Адреса будується з параметра `EXTERNAL_HTTP_ADDRESS` у `/opt/wildcore-dms/.env` — це
    адреса, за якою користувачі відкривають WildcoreDMS. Наприклад, для
    `EXTERNAL_HTTP_ADDRESS=https://dms.example.com` redirect URI буде
    `https://dms.example.com/api/v1/auth/oidc/callback`.
    Майстер налаштування (крок 3) виводить точне значення.
    Якщо WildcoreDMS опубліковано за нестандартним шляхом (через проксі), redirect URI
    можна задати явно параметром `OIDC_REDIRECT_URI`.

Після створення клієнта збережіть **Client ID** та **Client secret**.

## Крок 2. Issuer

Issuer — ідентифікатор провайдера. WildcoreDMS порівнює його **посимвольно** зі значенням
у документі `.well-known/openid-configuration` та в токені, тому не збирайте його вручну:

1. Знайдіть у провайдера адресу `.../.well-known/openid-configuration`
   (у кожній інструкції провайдера вказано, де вона).
2. Майстер налаштування сам візьме з неї поле `"issuer"`. При ручному налаштуванні
   скопіюйте його як є — **разом зі слешем у кінці**, якщо він там є.

Перевірте, що документ відкривається **з сервера WildcoreDMS** і повертає той самий issuer:

```bash
docker exec wca curl -s https://sso.example.com/realms/main/.well-known/openid-configuration | grep -o '"issuer":"[^"]*"'
```

- Якщо провайдер формує issuer з адреси запиту (так робить, наприклад, Keycloak без
  зафіксованого hostname), браузер і сервер WildcoreDMS мають звертатися до нього
  за **однією й тією ж** адресою. Інакше issuer у токені не співпаде.
- Сертифікат провайдера має бути довіреним для сервера WildcoreDMS (публічний CA або
  корпоративний CA, доданий у контейнер). Інакше — помилка `cURL error 60`.

## Дані користувача (claims) { #claims }

WildcoreDMS читає дані користувача з ID token. Якщо email або групи в ньому відсутні —
додатково запитує userinfo.

| Дані | Параметр | За замовчуванням | Обов'язково |
|------|----------|------------------|-------------|
| Email | `OIDC_EMAIL_CLAIM` | `email` | так, якщо пошук користувача за email |
| Логін нового користувача (до 50 символів) | `OIDC_LOGIN_CLAIM` | `preferred_username` | так, при створенні користувача |
| Ім'я | `OIDC_NAME_CLAIM` | `name` | ні (інакше береться логін) |
| Групи/ролі | `OIDC_GROUPS_CLAIM` | `groups` | ні |
| Ідентифікатор облікового запису | — | завжди `sub` | так |

- Вкладені claims вказуються через крапку: `realm_access.roles`,
  `resource_access.wildcore.roles`.
- Якщо у провайдера немає `preferred_username` — використовуйте `email` як логін.
- Групи мають приходити **в ID token або userinfo** (не лише в access token) списком рядків.
- Переглянути, що реально приходить, можна інструментами провайдера (Evaluate у Keycloak,
  Preview в Authentik) або декодувавши ID token на [jwt.io](https://jwt.io).

## Крок 3. Налаштування WildcoreDMS { #configure }

### Через майстер (рекомендовано)

На сервері WildcoreDMS виконайте:

```bash
sudo wca auth:configure
```

Майстер запитає:

1. **Способи входу** — `internal` (логін/пароль), `oidc` (SSO) або обидва.
2. **Провайдера** — `keycloak`, `entra`, `authentik`, `authelia`, `auth0`, `google`
   або `other`. Від вибору залежать типові значення claims та підказки щодо налаштування
   провайдера.
3. **Назву кнопки** — текст кнопки «Увійти через ...» на сторінці входу.
4. **Адресу `.../.well-known/openid-configuration`** — майстер перевірить її доступність
   і візьме issuer (`Discovery document is available, issuer: ...`).
5. **Client ID / Client secret**.
6. **Claims** email, логіна, імені та груп.
7. **Режим синхронізації ролі** та **роль за замовчуванням**.

Після цього майстер виведе redirect URI для реєстрації у провайдера, запропонує
зіставити ролі WildcoreDMS з групами провайдера (для Keycloak — згенерує JSON для імпорту),
збереже налаштування та перезапустить обробники запитів.

### Вручну в `.env`

Параметри знаходяться у `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=SSO
OIDC_ISSUER=<issuer з документа .well-known/openid-configuration>
OIDC_CLIENT_ID=<client id>
OIDC_CLIENT_SECRET=<client secret>
OIDC_ADDITIONAL_SCOPES=
OIDC_EMAIL_CLAIM=email
OIDC_LOGIN_CLAIM=preferred_username
OIDC_NAME_CLAIM=name
OIDC_GROUPS_CLAIM=groups
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=yes
OIDC_DEFAULT_ROLE=
OIDC_DENY_LOCAL_LOGIN=no
```

Після ручної зміни застосуйте налаштування: `sudo wca system:http:reset`.

| Параметр | Призначення |
|----------|-------------|
| `AUTH_METHODS` | `internal`, `oidc` або обидва через кому |
| `AUTH_AUTO_INITIATE` | `yes` — якщо єдиний спосіб входу `oidc`, сторінка входу одразу переходить до провайдера |
| `OIDC_NAME` | текст кнопки «Увійти через ...» |
| `OIDC_ADDITIONAL_SCOPES` | додаткові scopes через кому (наприклад `groups`); `openid, profile, email` запитуються завжди |
| `OIDC_MATCH_BY` | як знайти наявного користувача при першому вході: `email` або `login` |
| `OIDC_SYNC_ROLE` | `yes` — роль перераховується при кожному вході, `no` — лише при створенні |
| `OIDC_DEFAULT_ROLE` | назва ролі, якщо групи не співпали; порожньо — вхід заборонено |
| `OIDC_DENY_LOCAL_LOGIN` | `yes` — користувачам, створеним через SSO, вхід за паролем заборонено |
| `OIDC_REDIRECT_URI`, `OIDC_FRONTEND_CALLBACK_URL` | перевизначити адреси, якщо WildcoreDMS опубліковано за нестандартним шляхом |

!!! warning "Не залишайтесь без доступу"
    Перед тим як вимкнути вхід за паролем (`AUTH_METHODS=oidc`), переконайтесь, що вхід через SSO
    працює і хоча б один адміністратор отримує потрібну роль.

## Крок 4. Ролі { #roles }

У веб-панелі: `Користувачі > Ролі` → `Змінити` біля ролі → поле **«Зіставлення груп SSO»** —
перелічіть значення з claim груп, яким належить ця роль (введіть назву і натисніть Enter).

- Якщо поле порожнє, з групами порівнюється **назва ролі**: `Operator Team` → `operator-team`
  (без урахування регістру, пробіли замінюються на `-`).
- Якщо підійшло кілька ролей — обирається роль з найбільшою кількістю дозволів.
- Роль **Owner** призначається лише через явне зіставлення.
- Нічого не підійшло — призначається `OIDC_DEFAULT_ROLE`; якщо він порожній, вхід заборонено.
- `OIDC_SYNC_ROLE=yes` — роль перераховується при кожному вході (ручні зміни перезаписуються),
  `no` — призначається лише при створенні користувача.

**Без груп** (провайдер їх не передає, або ролі зручніше вести у WildcoreDMS):
`OIDC_GROUPS_CLAIM=` (порожньо), `OIDC_DEFAULT_ROLE=<роль>`, `OIDC_SYNC_ROLE=no`.
Нові користувачі отримують роль за замовчуванням, далі адміністратор змінює її у WildcoreDMS
(у веб-панелі або командою `wca user:change-role <login>`).

## Користувачі

- **Перший вхід** — WildcoreDMS шукає наявного користувача за email (`OIDC_MATCH_BY=email`)
  або логіном (`OIDC_MATCH_BY=login`) і прив'язує його до облікового запису провайдера.
  Далі користувач знаходиться за прив'язкою, зміна email/логіна у провайдера на вхід не впливає.
  Щоб наявні користувачі прив'язались автоматично, заздалегідь заповніть їм **Email**
  (`Користувачі > Користувачі` → `Редагувати`, або користувач сам — у `Параметрах аккаунту`).
- **Не знайдено** — створюється новий користувач: логін та ім'я з claims, без пароля та без
  груп пристроїв. Групи пристроїв призначає адміністратор у WildcoreDMS.
- Пароль такому користувачу можна задати пізніше (картка користувача або
  `wca user:reset-password <login>`) — тоді спрацює і вхід за паролем.
  При `OIDC_DENY_LOCAL_LOGIN=yes` такі користувачі входять лише через SSO.
  Наявні користувачі, прив'язані до SSO при першому вході, під заборону не потрапляють.
- Заблокований у WildcoreDMS користувач не увійде і через SSO.

Корисні команди:

```bash
wca user:list
wca user:change-role <login> [role]
wca user:reset-password <login>
```

## Перевірка

1. `wca auth:configure` на кроці адреси провайдера пише `Discovery document is available`.
2. На сторінці входу WildcoreDMS з'явилась кнопка **«Увійти через {OIDC_NAME}»**.
3. Вхід через кнопку повертає у WildcoreDMS з потрібною роллю.

Помилки показуються на сторінці входу та записуються в лог застосунку.

## Типові помилки { #errors }

| Повідомлення | Причина та рішення |
|--------------|--------------------|
| `Request to OIDC provider failed: ... cURL error 6/7/28` | Сервер WildcoreDMS не бачить провайдера: DNS, firewall, проксі. Перевірте `curl` з контейнера (крок 2). |
| `... cURL error 60` | Недовірений сертифікат провайдера — додайте CA у контейнер. |
| `Issuer in discovery document does not match OIDC_ISSUER` | `OIDC_ISSUER` відрізняється від `issuer` у документі (слеш у кінці, шлях, http/https, домен). Скопіюйте значення як є. |
| `ID token validation failed: issuer mismatch` | Провайдер видає різний issuer браузеру та серверу — зафіксуйте його публічну адресу (крок 2). |
| `ID token validation failed: audience mismatch` | `OIDC_CLIENT_ID` не збігається з client id у провайдера. |
| `ID token validation failed: signature is invalid` | Провайдер підписує не RS256, або відбулась ротація ключів — зачекайте 15 хвилин або виконайте `wca cache:flush`. |
| `ID token validation failed: token expired` | Розходиться час на серверах (допуск 2 хвилини) — налаштуйте NTP. |
| Помилка провайдера про `redirect_uri` | Redirect URI клієнта не збігається з `{EXTERNAL_HTTP_ADDRESS}/api/v1/auth/oidc/callback`. Перевірте `EXTERNAL_HTTP_ADDRESS` або задайте `OIDC_REDIRECT_URI`. |
| `Request to OIDC provider failed: ... 401 ... invalid_client` | Невірний secret, або клієнт не конфіденційний / не підтримує `client_secret_basic`. |
| `Could not find a valid email address ...` | Email не прийшов: не заповнений у користувача, не запитано scope `email` або claim називається інакше (`OIDC_EMAIL_CLAIM`). |
| `No role found for user groups (...) and OIDC_DEFAULT_ROLE is not set` | У дужках — групи, отримані від провайдера. Порожньо — групи не прийшли в ID token/userinfo (перевірте mapper та `OIDC_GROUPS_CLAIM`); інакше впишіть потрібне значення у «Зіставлення груп SSO» ролі. |
| `Claim '...' must contain login up to 50 chars` | Немає claim з логіном або він довший за 50 символів — оберіть інший `OIDC_LOGIN_CLAIM`. |
| `User with login ... or email ... already exists, but it is not linked with SSO account` | У WildcoreDMS вже є користувач з таким логіном/email, а зіставлення йде за іншим полем. Вирівняйте email/логін або змініть `OIDC_MATCH_BY`. |
| `User ... is already linked with another SSO account` | Користувач прив'язаний до іншого облікового запису провайдера (наприклад, його перестворили). Зверніться до [підтримки](../contact/contacts.md) для скидання прив'язки. |
| `Userinfo subject does not match ID token` | Userinfo повернув іншого користувача — зазвичай через зайві `OIDC_ADDITIONAL_SCOPES`. Приберіть їх. |
| `Authorization state is invalid or expired` | Сторінка входу провайдера була відкрита довше 10 хвилин — почніть вхід заново. |

## Обмеження

- Вихід з WildcoreDMS не завершує сесію у провайдера: повторний вхід через кнопку пройде
  без введення пароля, поки жива сесія провайдера.
- При `AUTH_METHODS=oidc` та `AUTH_AUTO_INITIATE=yes` сторінка входу одразу переходить до
  провайдера; після виходу та після помилки автопереходу немає.
- Одночасно підтримується один провайдер.

## Інші провайдери { #other }

**Authelia** — клієнт описується у конфігурації Authelia:

```yaml
identity_providers:
  oidc:
    clients:
      - client_id: wildcore
        client_secret: '<хеш секрету>'
        redirect_uris: ['https://dms.example.com/api/v1/auth/oidc/callback']
        scopes: [openid, email, profile, groups]
        token_endpoint_auth_method: client_secret_basic
        require_pkce: true
        pkce_challenge_method: S256
```

Issuer — адреса Authelia (наприклад `https://auth.example.com`). Групи приходять у claim
`groups` лише за scope `groups` (майстер з провайдером `authelia` виставляє це сам).
У `identity_providers.oidc.jwks` має бути RSA-ключ.

**Будь-який інший** (Zitadel, GitLab, Okta, ...): перевірте вимоги, зареєструйте клієнт
(крок 1), подивіться, у яких claims приходять email, логін та групи, і запустіть
`wca auth:configure` з провайдером `other`.
