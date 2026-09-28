# SSO setup: Google Workspace

!!! abstract "Overview"

    Step-by-step setup of WildcoreDMS sign-in with **Google Workspace** accounts.
    General description (how SSO works, roles, common errors) is on the [Single Sign-On](./index.md) page.

!!! warning "Groups are not sent"
    Google doesn't send Workspace groups over OpenID Connect. New users therefore get the
    **default** role, and an administrator changes it in WildcoreDMS afterwards.

## What you need to know up front

| Parameter | Value |
|-----------|-------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` (Google accepts **https** only) |
| Configuration address | `https://accounts.google.com/.well-known/openid-configuration` |
| Issuer | `https://accounts.google.com` |
| User login | `email` (Google has no `preferred_username`) |

## 1. Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/) as an administrator of your organization.
2. In the project list (top bar) choose an existing one or **New project** → Name `WildcoreDMS` → **Create**.

## 2. OAuth consent screen

1. Menu ☰ → **APIs & Services** → **OAuth consent screen**
   (in the new UI — **Google Auth Platform** → **Branding** / **Audience**).
2. **User type / Audience — `Internal`**. Only accounts of your organization will be able to sign in.
3. App name — `WildcoreDMS`, User support email, Developer contact email → **Save**.
4. Adding scopes is optional — `openid`, `email`, `profile` are available by default.

## 3. OAuth client

1. **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**
   (in the new UI — **Google Auth Platform** → **Clients** → **Create client**).
2. Application type — **Web application**, Name — `WildcoreDMS`.
3. **Authorized redirect URIs** → **Add URI** → `https://dms.example.com/api/v1/auth/oidc/callback`.
   *Authorized JavaScript origins* are not needed.
4. **Create** → copy the **Client ID** and **Client secret** (or download the JSON).

!!! info
    Redirect URI changes in Google may take a few minutes to apply.

## 4. Configure WildcoreDMS

```bash
sudo wca auth:configure
```

Choose the `google` provider (the issuer is filled in automatically), enter Client ID, Client secret
and the **default role** for new users. Or manually in `/opt/wildcore-dms/.env`:

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
OIDC_DEFAULT_ROLE=<role name for new users>
```

and run `sudo wca system:http:reset`.

## 5. Roles

- Every new user gets the `OIDC_DEFAULT_ROLE` role. For safety, pick a role with minimal
  permissions (view only).
- Then an administrator changes the role in the web panel (`Users management > Users` → `Edit`)
  or with `wca user:change-role <login>`. With `OIDC_SYNC_ROLE=no` manual changes are not
  overwritten on the next sign-in.
- Existing WildcoreDMS users with the same email as in Google are linked automatically and keep their role.

!!! tip "External accounts"
    With User type **External** any Google account could sign in (depending on the app's
    publishing status). Use **Internal** for WildcoreDMS.
