# SSO setup: Authelia

!!! abstract "Overview"

    Step-by-step setup of WildcoreDMS sign-in through **Authelia**. General description
    (how SSO works, roles, common errors) is on the [Single Sign-On](./index.md) page.

    Authelia has no admin web UI — the OpenID Connect client is described in the configuration
    file (`configuration.yml`). Examples below are for Authelia **4.38+**.

    Examples use:

    - WildcoreDMS address — `https://dms.example.com`;
    - Authelia address — `https://auth.example.com`;
    - Client ID — `wildcore`.

## What you need to know up front

| Parameter | Value |
|-----------|-------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Configuration address | `https://auth.example.com/.well-known/openid-configuration` |
| Issuer | `https://auth.example.com` (Authelia address) |
| Groups claim | `groups` (only with the `groups` scope) |
| Token signing | **RS256** — an RSA key is required |

Groups come from the Authelia user backend: the `users_database.yml` file (`groups` field) or LDAP.

## 1. RSA key for token signing

WildcoreDMS verifies signatures with **RS256** only, so Authelia needs an RSA key.
If OpenID Connect in Authelia is already configured with an RSA key, skip this step.

```bash
# inside the Authelia container
authelia crypto pair rsa generate --bits 4096 --directory /config/keys
# or with plain openssl
openssl genrsa -out /config/keys/private.pem 4096
```

## 2. Client secret

Generate a secret and its hash — the **hash** goes into the Authelia configuration, the
**secret itself** goes into WildcoreDMS:

```bash
authelia crypto hash generate pbkdf2 --variant sha512 --random --random.length 72 --random.charset rfc3986
```

The command prints two values:

- `Random Password: ...` — the secret, enter it in WildcoreDMS as the Client secret;
- `Digest: $pbkdf2-sha512$...` — the hash, put it into `client_secret` in the Authelia configuration.

## 3. Client in the Authelia configuration

Add (or extend) the `identity_providers.oidc` section in `configuration.yml`:

```yaml
identity_providers:
  oidc:
    # internal Authelia secret (any random string, 64+ characters)
    hmac_secret: '<random string>'
    jwks:
      - key_id: 'wildcore-rs256'
        algorithm: 'RS256'
        use: 'sig'
        key: |
          -----BEGIN PRIVATE KEY-----
          ... contents of /config/keys/private.pem ...
          -----END PRIVATE KEY-----
    clients:
      - client_id: 'wildcore'
        client_name: 'WildcoreDMS'
        client_secret: '$pbkdf2-sha512$...'   # Digest from step 2
        public: false
        authorization_policy: 'two_factor'    # or one_factor
        consent_mode: 'implicit'              # no consent screen
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

Key fields:

| Field | Why |
|-------|-----|
| `public: false` | confidential client (with a secret) |
| `redirect_uris` | WildcoreDMS redirect URI — must match character by character |
| `scopes` | `groups` is required if roles are assigned by groups |
| `token_endpoint_auth_method: client_secret_basic` | WildcoreDMS sends the secret using Basic authentication |
| `id_token_signed_response_alg: RS256` | the signature WildcoreDMS accepts |
| `authorization_policy` | `two_factor` — require Authelia 2FA when signing in to WildcoreDMS |
| `consent_mode: implicit` | don't show a consent screen on every sign-in |

!!! info "Key from a file instead of inline YAML"
    Instead of pasting the key you can use a template:
    `key: {{ secret "/config/keys/private.pem" | mindent 10 "|" | msquote }}` —
    Authelia must be started with the `X_AUTHELIA_CONFIG_FILTERS=template` environment variable.

!!! note "Authelia 4.37 and older"
    Older versions use `issuer_private_key` instead of `jwks`, and the client is defined with
    `id` / `secret` instead of `client_id` / `client_secret`; `authorization_policy` and
    `consent_mode` keep their names. The secret may be given in plain text.

Restart Authelia and check the log for configuration errors:

```bash
docker restart authelia && docker logs --tail 50 authelia
```

## 4. User groups

With the file backend (`users_database.yml`) groups are set in the `groups` field:

```yaml
users:
  john:
    displayname: 'John Smith'
    email: 'john@example.com'
    password: '$argon2id$...'
    groups:
      - 'wildcore-admins'
  jane:
    displayname: 'Jane Doe'
    email: 'jane@example.com'
    password: '$argon2id$...'
    groups:
      - 'operator'
```

With LDAP groups come from the directory (`authentication_backend.ldap` settings).
Make sure users have an **email**.

!!! tip "Restricting access"
    To let only certain groups into WildcoreDMS, create a custom policy in
    `identity_providers.oidc.authorization_policies` with a `subject: 'group:wildcore-admins'` rule
    and put its name into the client's `authorization_policy`.

## 5. Configure WildcoreDMS

```bash
sudo wca auth:configure
```

Choose the `authelia` provider (it adds the `groups` scope itself), enter
`https://auth.example.com/.well-known/openid-configuration`, Client ID `wildcore` and the secret
(**Random Password** from step 2). Or manually in `/opt/wildcore-dms/.env`:

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

and run `sudo wca system:http:reset`.

In the WildcoreDMS web panel: `Users management > Roles` → `Edit` → **"SSO groups mapping"** —
enter Authelia group names (e.g. `wildcore-admins`). See [Roles](./index.md#roles).

## Notes

- In recent Authelia versions the ID token carries minimal data, while email, login and groups are
  returned via userinfo. WildcoreDMS requests userinfo automatically — nothing extra to configure.
- `invalid_client` error — the wrong hash is in Authelia's `client_secret`, or the hash was entered
  in WildcoreDMS instead of the secret itself.
- `signature is invalid` error — `jwks` has no RSA key with the `RS256` algorithm.
- `No role found for user groups ()` with empty brackets — the `groups` scope isn't requested
  (check `OIDC_ADDITIONAL_SCOPES=groups` and the client's `scopes`).
