# Налаштування SSO: Google Workspace

!!! abstract "Огляд"

    Покрокове налаштування входу у WildcoreDMS через облікові записи **Google Workspace**.
    Загальний опис (як працює SSO, ролі, типові помилки) — на сторінці [Вхід через SSO](./index.md).

!!! warning "Групи не передаються"
    Google не передає групи Workspace в OpenID Connect. Тому роль новим користувачам
    призначається **за замовчуванням**, а далі адміністратор змінює її у WildcoreDMS.

## Що потрібно знати заздалегідь

| Параметр | Значення |
|----------|----------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` (Google приймає лише **https**) |
| Адреса налаштувань | `https://accounts.google.com/.well-known/openid-configuration` |
| Issuer | `https://accounts.google.com` |
| Логін користувача | `email` (у Google немає `preferred_username`) |

## 1. Проєкт у Google Cloud

1. Відкрийте [Google Cloud Console](https://console.cloud.google.com/) під обліковим записом
   адміністратора вашої організації.
2. У списку проєктів (верхня панель) оберіть наявний або **New project** → Name `WildcoreDMS` → **Create**.

## 2. Екран згоди (OAuth consent screen)

1. Меню ☰ → **APIs & Services** → **OAuth consent screen**
   (у новому інтерфейсі — **Google Auth Platform** → **Branding** / **Audience**).
2. **User type / Audience — `Internal`**. Так увійти зможуть лише облікові записи вашої організації.
3. App name — `WildcoreDMS`, User support email, Developer contact email → **Save**.
4. Scopes додавати не обов'язково — `openid`, `email`, `profile` доступні за замовчуванням.

## 3. OAuth-клієнт

1. **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**
   (у новому інтерфейсі — **Google Auth Platform** → **Clients** → **Create client**).
2. Application type — **Web application**, Name — `WildcoreDMS`.
3. **Authorized redirect URIs** → **Add URI** → `https://dms.example.com/api/v1/auth/oidc/callback`.
   *Authorized JavaScript origins* заповнювати не потрібно.
4. **Create** → скопіюйте **Client ID** та **Client secret** (або завантажте JSON).

!!! info
    Зміни redirect URI в Google можуть застосовуватись до кількох хвилин.

## 4. Налаштування WildcoreDMS

```bash
sudo wca auth:configure
```

Оберіть провайдера `google` (issuer підставиться сам), вкажіть Client ID, Client secret та
**роль за замовчуванням** для нових користувачів. Або вручну в `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=Google
OIDC_ISSUER=https://accounts.google.com
OIDC_CLIENT_ID=<Client ID>.apps.googleusercontent.com
OIDC_CLIENT_SECRET=<Client secret>
OIDC_LOGIN_CLAIM=email
OIDC_GROUPS_CLAIM=
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=no
OIDC_DEFAULT_ROLE=<назва ролі для нових користувачів>
```

та виконайте `sudo wca system:http:reset`.

## 5. Ролі

- Кожен новий користувач отримує роль з `OIDC_DEFAULT_ROLE`. Для безпеки оберіть роль з
  мінімальними правами (лише перегляд).
- Далі адміністратор змінює роль у веб-панелі (`Користувачі > Користувачі` → `Редагувати`)
  або командою `wca user:change-role <login>`. Завдяки `OIDC_SYNC_ROLE=no` ручні зміни не
  перезаписуються при наступному вході.
- Наявні користувачі WildcoreDMS, у яких вказано той самий email, що і в Google, прив'яжуться
  автоматично і збережуть свою роль.

!!! tip "Сторонні облікові записи"
    При User type **External** увійти зможе будь-який обліковий запис Google (з урахуванням
    статусу публікації застосунку). Для WildcoreDMS використовуйте **Internal**.
