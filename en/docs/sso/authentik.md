# SSO setup: Authentik

!!! abstract "Overview"

    Step-by-step setup of WildcoreDMS sign-in through **Authentik**. General description
    (how SSO works, roles, common errors) is on the [Single Sign-On](./index.md) page.

    Examples below use:

    - WildcoreDMS address — `https://dms.example.com`;
    - Authentik address — `https://auth.example.com`;
    - application slug — `wildcore`.

## What you need to know up front

| Parameter | Value |
|-----------|-------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Configuration address | `https://auth.example.com/application/o/wildcore/.well-known/openid-configuration` |
| Issuer | `https://auth.example.com/application/o/wildcore/` (**with the trailing slash**) |
| Groups claim | `groups` (comes with the `profile` scope) |

## 1. Create the provider and the application

In recent Authentik versions the easiest way is the wizard:
`Applications` → `Applications` → **Create with Provider** (in older versions create the provider
first, then the application — see below).

**Application:**

- Name — `WildcoreDMS`;
- Slug — `wildcore` (the issuer is built from it);
- Launch URL — `https://dms.example.com` (optional, for the user portal).

**Provider type:** **OAuth2/OpenID Provider**.

**Provider settings:**

- Name — `WildcoreDMS`;
- Authorization flow — `default-provider-authorization-implicit-consent`
  (no extra consent screen) or `...-explicit-consent`;
- **Client type — `Confidential`**;
- Client ID — generated (copy it);
- Client Secret — generated (copy it);
- **Redirect URIs/Origins** — `https://dms.example.com/api/v1/auth/oidc/callback`
  (*Strict* mode, if there is a choice);
- **Signing Key** — any RSA certificate, e.g. `authentik Self-signed Certificate`.
  Without a key tokens are signed with HS256, while WildcoreDMS accepts **RS256** only.

Under **Advanced protocol settings** check:

- Scopes — `openid`, `email`, `profile` selected (authentik default mappings);
- Subject mode — may stay default;
- **Include claims in id_token** — enabled (recommended).

Finish the wizard (**Submit**).

??? note "Older Authentik versions (no wizard)"
    1. `Applications` → `Providers` → **Create** → **OAuth2/OpenID Provider** → fill in the fields
       as described above → **Finish**.
    2. `Applications` → `Applications` → **Create**: Name, Slug `wildcore`, Provider — the one you
       created → **Create**.

## 2. Configuration address and issuer

Open `Applications` → `Providers` → the WildcoreDMS provider. The provider page shows the
**OpenID Configuration URL** and **OpenID Configuration Issuer** — use exactly these when
configuring WildcoreDMS.

## 3. Groups for WildcoreDMS roles

1. `Directory` → `Groups` → **Create**: Name — the name to map to a WildcoreDMS role, e.g.
   `wildcore-admins`, `operator` → **Create**.
2. Open the group → **Users** tab → **Add existing user** → select users.
3. Make sure users have an **Email** (`Directory` → `Users` → user → **Edit**).

User groups are sent in the `groups` claim with the `profile` scope — nothing else to configure.

!!! tip "Restrict access to the application"
    To let only certain users into WildcoreDMS: `Applications` → `Applications` → `WildcoreDMS` →
    **Policy / Group / User Bindings** tab → **Bind existing policy/group/user** → select a group.
    Other users are rejected by Authentik itself.

## 4. Check the token

`Applications` → `Providers` → the WildcoreDMS provider → **Preview** tab → select a user.
The result must contain `email`, `preferred_username` and `groups`.

## 5. Configure WildcoreDMS

```bash
sudo wca auth:configure
```

Choose the `authentik` provider, enter the **OpenID Configuration URL**, Client ID and Client Secret.
Or manually in `/opt/wildcore-dms/.env`:

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

and run `sudo wca system:http:reset`.

In the WildcoreDMS web panel: `Users management > Roles` → `Edit` → **"SSO groups mapping"** —
enter Authentik group names (e.g. `wildcore-admins`). See [Roles](./index.md#roles).
