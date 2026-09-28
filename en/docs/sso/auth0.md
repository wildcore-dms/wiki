# SSO setup: Auth0

!!! abstract "Overview"

    Step-by-step setup of WildcoreDMS sign-in through **Auth0** (Okta Customer Identity).
    General description (how SSO works, roles, common errors) is on the [Single Sign-On](./index.md) page.

## What you need to know up front

| Parameter | Value |
|-----------|-------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Configuration address | `https://<tenant>.<region>.auth0.com/.well-known/openid-configuration` (or your custom domain) |
| Issuer | `https://<tenant>.<region>.auth0.com/` (**with the trailing slash**) |
| User login | `nickname` (Auth0 has no `preferred_username`) |
| Groups claim | `roles` (added with an Action, see step 4) |

## 1. Create the application

1. [Auth0 Dashboard](https://manage.auth0.com/) → **Applications** → **Applications** →
   **Create Application**.
2. Name — `WildcoreDMS`, type — **Regular Web Applications** → **Create**.
   (The technology selection screen can be skipped.)

## 2. Application settings

**Settings** tab:

- **Domain**, **Client ID**, **Client Secret** — copy them for WildcoreDMS;
- **Allowed Callback URLs** — `https://dms.example.com/api/v1/auth/oidc/callback`;
- Allowed Logout URLs / Allowed Web Origins — may stay empty;
- **Advanced Settings** at the bottom:
    - **OAuth** tab — JSON Web Token (JWT) Signature Algorithm — **RS256**;
    - **Grant Types** tab — **Authorization Code** checked (others may be unchecked);
- **Save Changes**.

**Credentials** tab: **Authentication Method** — **Client Secret (Basic)** → **Save**.
WildcoreDMS sends the secret using Basic authentication.

**Connections** tab: keep enabled only the user sources (Database, Google, Enterprise) your staff
should sign in with.

## 3. Roles

1. **User Management** → **Roles** → **Create Role**: Name — the name to map to a WildcoreDMS role
   (e.g. `administrator`, `operator`), Description → **Create**.
2. Assign: **User Management** → **Users** → user → **Roles** tab → **Assign Roles** →
   select a role → **Assign**.
3. Make sure the user has an email.

## 4. Roles in the token (Action)

By default Auth0 roles don't get into the token — an Action adds them:

1. **Actions** → **Library** → **Create Action** → **Build from scratch**
   (in older versions — **Build Custom**).
2. Name — `Add roles to ID token`, Trigger — **Login / Post Login**, Runtime — recommended → **Create**.
3. Replace the code with:

    ```js
    exports.onExecutePostLogin = async (event, api) => {
      api.idToken.setCustomClaim('roles', event.authorization?.roles || []);
    };
    ```

4. **Deploy**.
5. **Actions** → **Triggers** (in older versions — **Flows**) → **post-login** → drag
   `Add roles to ID token` from the right panel (*Custom*) between **Start** and **Complete** → **Apply**.

The claim may be namespaced (e.g. `https://dms.example.com/roles`) — then put the full name into
`OIDC_GROUPS_CLAIM`.

## 5. Configure WildcoreDMS

```bash
sudo wca auth:configure
```

Choose the `auth0` provider, enter `https://<Domain>/.well-known/openid-configuration`,
Client ID and Client Secret. Or manually in `/opt/wildcore-dms/.env`:

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

and run `sudo wca system:http:reset`.

In the WildcoreDMS web panel: `Users management > Roles` → `Edit` → **"SSO groups mapping"** —
enter Auth0 role names. See [Roles](./index.md#roles).

!!! tip "Checking the token"
    If no role is assigned, look at the error on the WildcoreDMS login page: groups received from
    the provider are listed in brackets. Empty — the Action wasn't added to the post-login trigger,
    or **Deploy** / **Apply** wasn't clicked.
