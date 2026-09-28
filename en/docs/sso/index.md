# Single Sign-On (OpenID Connect)

!!! abstract "Overview"

    Starting with version **0.31**, WildcoreDMS supports signing in through an external identity
    provider over **OpenID Connect (OIDC)**: Keycloak, Authentik, Google Workspace,
    Microsoft Entra ID (Azure AD), Auth0, Authelia, Zitadel, GitLab and others.

    Users sign in with the **"Sign in with ..."** button on the login page. A WildcoreDMS account
    is created automatically on first sign-in, and the role can be assigned from the user's
    groups/roles in the provider.

This page covers the provider-independent part. Step-by-step guides for specific systems
(what to click and where in their UI):

| Provider | Guide |
|----------|-------|
| Keycloak | [Keycloak setup](./keycloak.md) |
| Authentik | [Authentik setup](./authentik.md) |
| Google Workspace | [Google setup](./google.md) |
| Microsoft Entra ID (Azure AD) | [Entra ID setup](./entra-id.md) |
| Auth0 | [Auth0 setup](./auth0.md) |
| Authelia | [Authelia setup](./authelia.md) |
| Others (Zitadel, GitLab, Okta, ...) | [see below](#other) |

## How it works

```
Browser ──> WildcoreDMS ──> provider login page (login/password, MFA)
Provider ──> WildcoreDMS: /api/v1/auth/oidc/callback?code=...
WildcoreDMS ──(server-to-server)──> provider: code exchange, signature check
WildcoreDMS ──> user lands in the web panel with the proper role
```

- **Authorization Code Flow + PKCE (S256)** with a confidential client
  (Client ID + Client secret).
- WildcoreDMS loads provider endpoints and signing keys from
  `{issuer}/.well-known/openid-configuration` — no need to enter them manually.
- Login/password sign-in can stay enabled alongside SSO.
- Two-factor authentication and IP restrictions configured for a WildcoreDMS user also apply
  to SSO sign-in.

## Provider requirements

| Requirement | Where to check |
|-------------|----------------|
| Publishes `{issuer}/.well-known/openid-configuration` | open the URL in a browser |
| Signs the ID token with **RS256** | `id_token_signing_alg_values_supported` in the document |
| Supports **`client_secret_basic`** client authentication | `token_endpoint_auth_methods_supported` in the document |
| Returns the user's **email** in the ID token or userinfo | see [User data](#claims) |

**Network.** The user's browser must reach the provider's login page, and the WildcoreDMS server
(the `wca` container) must reach the provider (configuration, keys, code exchange). The provider
never connects to WildcoreDMS, so WildcoreDMS may stay in a closed network.

## Step 1. Register a client in the provider { #client }

In any provider you create an OIDC "application"/"client". Field names differ, the meaning is the same:

| Parameter | Value |
|-----------|-------|
| Type | OpenID Connect, web application, **confidential** (with a secret) |
| Grant type / flow | **Authorization Code** (others are not needed) |
| Redirect URI / Callback URL | `https://<WildcoreDMS address>/api/v1/auth/oidc/callback` |
| Scopes | `openid`, `profile`, `email` (+ a groups scope if the provider requires it) |
| Client authentication | client secret (basic) |
| PKCE | may be required, method `S256` |

!!! info "Redirect URI"
    The address is built from `EXTERNAL_HTTP_ADDRESS` in `/opt/wildcore-dms/.env` — the address
    users open WildcoreDMS at. For example, with `EXTERNAL_HTTP_ADDRESS=https://dms.example.com`
    the redirect URI is `https://dms.example.com/api/v1/auth/oidc/callback`.
    The setup wizard (step 3) prints the exact value.
    If WildcoreDMS is published under a non-standard path (behind a proxy), set the redirect URI
    explicitly with `OIDC_REDIRECT_URI`.

Save the **Client ID** and **Client secret** after the client is created.

## Step 2. Issuer

The issuer identifies the provider. WildcoreDMS compares it **character by character** with the
value in `.well-known/openid-configuration` and in the token, so do not build it by hand:

1. Find the provider's `.../.well-known/openid-configuration` address
   (each provider guide says where it is).
2. The setup wizard takes the `"issuer"` field from it. For manual setup, copy it as is —
   **including the trailing slash**, if there is one.

Check that the document opens **from the WildcoreDMS server** and returns the same issuer:

```bash
docker exec wca curl -s https://sso.example.com/realms/main/.well-known/openid-configuration | grep -o '"issuer":"[^"]*"'
```

- If the provider builds the issuer from the request address (Keycloak without a fixed
  hostname does this), the browser and the WildcoreDMS server must reach it at the **same**
  address. Otherwise the issuer in the token will not match.
- The provider's certificate must be trusted by the WildcoreDMS server (public CA, or a corporate
  CA added to the container). Otherwise you get `cURL error 60`.

## User data (claims) { #claims }

WildcoreDMS reads user data from the ID token. If email or groups are missing there, it also
requests userinfo.

| Data | Parameter | Default | Required |
|------|-----------|---------|----------|
| Email | `OIDC_EMAIL_CLAIM` | `email` | yes, when matching users by email |
| Login of a new user (up to 50 chars) | `OIDC_LOGIN_CLAIM` | `preferred_username` | yes, when creating a user |
| Name | `OIDC_NAME_CLAIM` | `name` | no (login is used otherwise) |
| Groups/roles | `OIDC_GROUPS_CLAIM` | `groups` | no |
| Account identifier | — | always `sub` | yes |

- Nested claims use dots: `realm_access.roles`, `resource_access.wildcore.roles`.
- If the provider has no `preferred_username`, use `email` as the login.
- Groups must come **in the ID token or userinfo** (not only in the access token) as a list of strings.
- To see what is actually sent, use the provider's tools (Evaluate in Keycloak, Preview in
  Authentik) or decode the ID token at [jwt.io](https://jwt.io).

## Step 3. Configure WildcoreDMS { #configure }

### Using the wizard (recommended)

On the WildcoreDMS server run:

```bash
sudo wca auth:configure
```

The wizard asks for:

1. **Sign-in methods** — `internal` (login/password), `oidc` (SSO) or both.
2. **Provider** — `keycloak`, `entra`, `authentik`, `authelia`, `auth0`, `google` or `other`.
   This sets typical claim values and prints hints for configuring the provider.
3. **Button name** — the text of the "Sign in with ..." button.
4. **`.../.well-known/openid-configuration` address** — the wizard checks it and takes the issuer
   (`Discovery document is available, issuer: ...`).
5. **Client ID / Client secret**.
6. Email, login, name and groups **claims**.
7. **Role sync mode** and **default role**.

Then the wizard prints the redirect URI to register in the provider, offers to map WildcoreDMS
roles to provider groups (for Keycloak it generates an import JSON), saves the settings and
restarts the request handlers.

### Manually in `.env`

The parameters live in `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=SSO
OIDC_ISSUER=<issuer from .well-known/openid-configuration>
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

Apply changes after editing: `sudo wca system:http:reset`.

| Parameter | Purpose |
|-----------|---------|
| `AUTH_METHODS` | `internal`, `oidc` or both, comma separated |
| `AUTH_AUTO_INITIATE` | `yes` — if `oidc` is the only method, the login page goes straight to the provider |
| `OIDC_NAME` | text of the "Sign in with ..." button |
| `OIDC_ADDITIONAL_SCOPES` | extra scopes, comma separated (e.g. `groups`); `openid, profile, email` are always requested |
| `OIDC_MATCH_BY` | how to find an existing user on first sign-in: `email` or `login` |
| `OIDC_SYNC_ROLE` | `yes` — role is recalculated on every sign-in, `no` — only on creation |
| `OIDC_DEFAULT_ROLE` | role name if no group matched; empty — sign-in is denied |
| `OIDC_DENY_LOCAL_LOGIN` | `yes` — users created via SSO can't sign in with a password |
| `OIDC_REDIRECT_URI`, `OIDC_FRONTEND_CALLBACK_URL` | override addresses if WildcoreDMS is published under a non-standard path |

!!! warning "Don't lock yourself out"
    Before disabling password sign-in (`AUTH_METHODS=oidc`), make sure SSO sign-in works and at
    least one administrator gets the proper role.

## Step 4. Roles { #roles }

In the web panel: `Users management > Roles` → `Edit` a role → the **"SSO groups mapping"** field —
list the values from the groups claim that should get this role (type a name and press Enter).

- If the field is empty, the **role name** is compared with groups: `Operator Team` → `operator-team`
  (case-insensitive, spaces replaced with `-`).
- If several roles match, the one with the most permissions wins.
- The **Owner** role is assigned only by an explicit mapping.
- Nothing matched — `OIDC_DEFAULT_ROLE` is used; if it's empty, sign-in is denied.
- `OIDC_SYNC_ROLE=yes` — role is recalculated on every sign-in (manual changes are overwritten),
  `no` — assigned only when the user is created.

**Without groups** (the provider doesn't send them, or you prefer managing roles in WildcoreDMS):
`OIDC_GROUPS_CLAIM=` (empty), `OIDC_DEFAULT_ROLE=<role>`, `OIDC_SYNC_ROLE=no`.
New users get the default role, then an administrator changes it in WildcoreDMS
(in the web panel or with `wca user:change-role <login>`).

## Users

- **First sign-in** — WildcoreDMS looks up an existing user by email (`OIDC_MATCH_BY=email`)
  or login (`OIDC_MATCH_BY=login`) and links it to the provider account. After that the user is
  found by the link; changing email/login in the provider doesn't affect sign-in.
  To have existing users linked automatically, fill in their **Email** beforehand
  (`Users management > Users` → `Edit`, or by the user in `Account settings`).
- **Not found** — a new user is created: login and name from claims, no password and no
  device groups. Device groups are assigned by an administrator in WildcoreDMS.
- A password can be set later (user card or `wca user:reset-password <login>`) — then password
  sign-in works too. With `OIDC_DENY_LOCAL_LOGIN=yes` such users sign in via SSO only.
  Existing users linked to SSO on first sign-in are not affected by this restriction.
- A user disabled in WildcoreDMS can't sign in via SSO either.

Useful commands:

```bash
wca user:list
wca user:change-role <login> [role]
wca user:reset-password <login>
```

## Verification

1. `wca auth:configure` prints `Discovery document is available` at the provider address step.
2. The login page shows the **"Sign in with {OIDC_NAME}"** button.
3. Signing in through the button brings you back to WildcoreDMS with the expected role.

Errors are shown on the login page and written to the application log.

## Common errors { #errors }

| Message | Cause and fix |
|---------|---------------|
| `Request to OIDC provider failed: ... cURL error 6/7/28` | The WildcoreDMS server can't reach the provider: DNS, firewall, proxy. Check with `curl` from the container (step 2). |
| `... cURL error 60` | Untrusted provider certificate — add the CA to the container. |
| `Issuer in discovery document does not match OIDC_ISSUER` | `OIDC_ISSUER` differs from `issuer` in the document (trailing slash, path, http/https, domain). Copy the value as is. |
| `ID token validation failed: issuer mismatch` | The provider gives different issuers to the browser and the server — fix its public address (step 2). |
| `ID token validation failed: audience mismatch` | `OIDC_CLIENT_ID` doesn't match the provider's client id. |
| `ID token validation failed: signature is invalid` | The provider doesn't sign with RS256, or keys were rotated — wait 15 minutes or run `wca cache:flush`. |
| `ID token validation failed: token expired` | Server clocks drift (2 minute tolerance) — configure NTP. |
| Provider error about `redirect_uri` | The client's redirect URI doesn't match `{EXTERNAL_HTTP_ADDRESS}/api/v1/auth/oidc/callback`. Check `EXTERNAL_HTTP_ADDRESS` or set `OIDC_REDIRECT_URI`. |
| `Request to OIDC provider failed: ... 401 ... invalid_client` | Wrong secret, or the client isn't confidential / doesn't support `client_secret_basic`. |
| `Could not find a valid email address ...` | Email wasn't sent: not set for the user, `email` scope not requested, or the claim has another name (`OIDC_EMAIL_CLAIM`). |
| `No role found for user groups (...) and OIDC_DEFAULT_ROLE is not set` | Groups received from the provider are in brackets. Empty — groups didn't come in the ID token/userinfo (check the mapper and `OIDC_GROUPS_CLAIM`); otherwise add the value to the role's "SSO groups mapping". |
| `Claim '...' must contain login up to 50 chars` | No login claim, or it's longer than 50 characters — choose another `OIDC_LOGIN_CLAIM`. |
| `User with login ... or email ... already exists, but it is not linked with SSO account` | A WildcoreDMS user with this login/email exists, but matching uses another field. Align email/login or change `OIDC_MATCH_BY`. |
| `User ... is already linked with another SSO account` | The user is linked to a different provider account (e.g. it was recreated). Contact [support](../contact/contacts.md) to reset the link. |
| `Userinfo subject does not match ID token` | Userinfo returned another user — usually due to extra `OIDC_ADDITIONAL_SCOPES`. Remove them. |
| `Authorization state is invalid or expired` | The provider login page was open for more than 10 minutes — start again. |

## Limitations

- Signing out of WildcoreDMS doesn't end the provider session: signing in again via the button
  won't ask for a password while the provider session is alive.
- With `AUTH_METHODS=oidc` and `AUTH_AUTO_INITIATE=yes` the login page redirects to the provider
  immediately; there is no auto-redirect after sign-out or after an error.
- One provider at a time is supported.

## Other providers { #other }

**Authelia** — see the separate [Authelia setup](./authelia.md) guide.

**Any other** (Zitadel, GitLab, Okta, ...): check the requirements, register a client (step 1),
see which claims carry email, login and groups, and run `wca auth:configure` with the `other` provider.
