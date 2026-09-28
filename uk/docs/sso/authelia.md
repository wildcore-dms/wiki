# Налаштування SSO: Authelia

!!! abstract "Огляд"

    Покрокове налаштування входу у WildcoreDMS через **Authelia**. Загальний опис
    (як працює SSO, ролі, типові помилки) — на сторінці [Вхід через SSO](./index.md).

    У Authelia немає веб-інтерфейсу адміністратора — клієнт OpenID Connect описується у файлі
    конфігурації (`configuration.yml`). Приклади нижче наведені для Authelia **4.38+**.

    Приклади:

    - адреса WildcoreDMS — `https://dms.example.com`;
    - адреса Authelia — `https://auth.example.com`;
    - Client ID — `wildcore`.

## Що потрібно знати заздалегідь

| Параметр | Значення |
|----------|----------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Адреса налаштувань | `https://auth.example.com/.well-known/openid-configuration` |
| Issuer | `https://auth.example.com` (адреса Authelia) |
| Claim груп | `groups` (лише зі scope `groups`) |
| Підпис токенів | **RS256** — потрібен RSA-ключ |

Групи беруться з бекенду користувачів Authelia: файлу `users_database.yml` (поле `groups`)
або LDAP.

## 1. RSA-ключ для підпису токенів

WildcoreDMS перевіряє підпис лише алгоритмом **RS256**, тому в Authelia має бути RSA-ключ.
Якщо OpenID Connect в Authelia вже налаштований з RSA-ключем — пропустіть цей крок.

```bash
# у контейнері Authelia
authelia crypto pair rsa generate --bits 4096 --directory /config/keys
# або звичайним openssl
openssl genrsa -out /config/keys/private.pem 4096
```

## 2. Секрет клієнта

Згенеруйте секрет та його хеш — у конфігурацію Authelia записується **хеш**, а у WildcoreDMS —
**сам секрет**:

```bash
authelia crypto hash generate pbkdf2 --variant sha512 --random --random.length 72 --random.charset rfc3986
```

Команда виведе два значення:

- `Random Password: ...` — секрет, його вкажете у WildcoreDMS як Client secret;
- `Digest: $pbkdf2-sha512$...` — хеш, його вкажете в `client_secret` у конфігурації Authelia.

## 3. Клієнт у конфігурації Authelia

Додайте (або доповніть) розділ `identity_providers.oidc` у `configuration.yml`:

```yaml
identity_providers:
  oidc:
    # секрет для внутрішніх потреб Authelia (довільний випадковий рядок, 64+ символи)
    hmac_secret: '<випадковий рядок>'
    jwks:
      - key_id: 'wildcore-rs256'
        algorithm: 'RS256'
        use: 'sig'
        key: |
          -----BEGIN PRIVATE KEY-----
          ... вміст /config/keys/private.pem ...
          -----END PRIVATE KEY-----
    clients:
      - client_id: 'wildcore'
        client_name: 'WildcoreDMS'
        client_secret: '$pbkdf2-sha512$...'   # Digest з кроку 2
        public: false
        authorization_policy: 'two_factor'    # або one_factor
        consent_mode: 'implicit'              # без екрана згоди
        redirect_uris:
          - 'https://dms.example.com/api/v1/auth/oidc/callback'
        scopes: ['openid', 'profile', 'email', 'groups']
        response_types: ['code']
        grant_types: ['authorization_code']
        token_endpoint_auth_method: 'client_secret_basic'
        id_token_signed_response_alg: 'RS256'
        userinfo_signed_response_alg: 'none'
        require_pkce: true
        pkce_challenge_method: 'S256'
```

Пояснення до ключових полів:

| Поле | Навіщо |
|------|--------|
| `public: false` | конфіденційний клієнт (з секретом) |
| `redirect_uris` | redirect URI WildcoreDMS — має збігатися посимвольно |
| `scopes` | `groups` обов'язковий, якщо ролі призначаються за групами |
| `token_endpoint_auth_method: client_secret_basic` | WildcoreDMS передає секрет через Basic-авторизацію |
| `id_token_signed_response_alg: RS256` | підпис, який приймає WildcoreDMS |
| `authorization_policy` | `two_factor` — вимагати 2FA Authelia при вході у WildcoreDMS |
| `consent_mode: implicit` | не показувати екран згоди при кожному вході |

!!! info "Ключ з файлу замість вставки у YAML"
    Замість вставки ключа можна використати шаблон:
    `key: {{ secret "/config/keys/private.pem" | mindent 10 "|" | msquote }}` —
    для цього Authelia запускається зі змінною оточення `X_AUTHELIA_CONFIG_FILTERS=template`.

!!! note "Authelia 4.37 і старіші"
    У старих версіях замість `jwks` використовується `issuer_private_key`, клієнт задається
    полями `id` / `secret` замість `client_id` / `client_secret`, а `authorization_policy` та
    `consent_mode` мають ту ж назву. Секрет можна задати відкритим текстом.

Перезапустіть Authelia та перевірте журнал на помилки конфігурації:

```bash
docker restart authelia && docker logs --tail 50 authelia
```

## 4. Групи користувачів

При файловому бекенді (`users_database.yml`) групи задаються у полі `groups`:

```yaml
users:
  ivan:
    displayname: 'Іван Петренко'
    email: 'ivan@example.com'
    password: '$argon2id$...'
    groups:
      - 'wildcore-admins'
  olena:
    displayname: 'Олена Коваль'
    email: 'olena@example.com'
    password: '$argon2id$...'
    groups:
      - 'operator'
```

При LDAP групи беруться з каталогу (налаштування `authentication_backend.ldap`).
Обов'язково заповніть **email** користувачів.

!!! tip "Обмеження доступу"
    Щоб увійти у WildcoreDMS могли лише певні групи, створіть власну політику в
    `identity_providers.oidc.authorization_policies` з правилом `subject: 'group:wildcore-admins'`
    і вкажіть її назву в `authorization_policy` клієнта.

## 5. Налаштування WildcoreDMS

```bash
sudo wca auth:configure
```

Оберіть провайдера `authelia` (він сам додає scope `groups`), вкажіть адресу
`https://auth.example.com/.well-known/openid-configuration`, Client ID `wildcore` та секрет
(**Random Password** з кроку 2). Або вручну в `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=Authelia
OIDC_ISSUER=https://auth.example.com
OIDC_CLIENT_ID=wildcore
OIDC_CLIENT_SECRET=<Random Password>
OIDC_ADDITIONAL_SCOPES=groups
OIDC_LOGIN_CLAIM=preferred_username
OIDC_GROUPS_CLAIM=groups
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=yes
```

та виконайте `sudo wca system:http:reset`.

У веб-панелі WildcoreDMS: `Користувачі > Ролі` → `Змінити` → **«Зіставлення груп SSO»** —
впишіть назви груп Authelia (наприклад `wildcore-admins`). Див. [Ролі](./index.md#roles).

## Особливості

- У нових версіях Authelia ID token містить мінімум даних, а email, логін та групи віддаються
  через userinfo. WildcoreDMS запитує userinfo автоматично — додатково нічого налаштовувати не треба.
- Помилка `invalid_client` — у `client_secret` Authelia записано не той хеш або у WildcoreDMS
  вказано хеш замість самого секрету.
- Помилка `signature is invalid` — у `jwks` немає RSA-ключа з алгоритмом `RS256`.
- Помилка `No role found for user groups ()` з порожніми дужками — не запитано scope `groups`
  (перевірте `OIDC_ADDITIONAL_SCOPES=groups` та `scopes` клієнта).
