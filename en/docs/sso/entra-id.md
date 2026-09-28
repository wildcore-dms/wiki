# SSO setup: Microsoft Entra ID (Azure AD)

!!! abstract "Overview"

    Step-by-step setup of WildcoreDMS sign-in through **Microsoft Entra ID** (formerly Azure AD,
    Microsoft 365). General description (how SSO works, roles, common errors) is on the
    [Single Sign-On](./index.md) page.

## What you need to know up front

| Parameter | Value |
|-----------|-------|
| Redirect URI | `https://dms.example.com/api/v1/auth/oidc/callback` |
| Configuration address | `https://login.microsoftonline.com/<tenant-id>/v2.0/.well-known/openid-configuration` |
| Issuer | `https://login.microsoftonline.com/<tenant-id>/v2.0` |
| Groups claim | `roles` (application App roles) |

!!! warning "Specific tenant only"
    Use the address with your **Directory (tenant) ID**. For `common` / `organizations` addresses
    the issuer in the document contains a `{tenantid}` template, and validation fails.

## 1. Register the application

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com/) →
   **Identity** → **Applications** → **App registrations** → **New registration**
   (or in the Azure portal: **Microsoft Entra ID** → **App registrations**).
2. Fill in:
    - Name — `WildcoreDMS`;
    - Supported account types — **Accounts in this organizational directory only (Single tenant)**;
    - Redirect URI — platform **Web**, address `https://dms.example.com/api/v1/auth/oidc/callback`.
3. **Register**.
4. On the **Overview** page copy the **Application (client) ID** and **Directory (tenant) ID**.
   The **Endpoints** button shows the exact **OpenID Connect metadata document** address.

## 2. Client secret

1. **Certificates & secrets** → **Client secrets** tab → **New client secret**.
2. Description — `WildcoreDMS`, Expires — choose a period → **Add**.
3. Copy the value from the **Value** column right away (not *Secret ID*) — it will be hidden later.

!!! warning
    The secret expires. Create a new one in advance and update it in WildcoreDMS
    (`wca auth:configure`), otherwise SSO sign-in stops working.

## 3. Email in the token

1. **Token configuration** → **Add optional claim**.
2. Token type — **ID** → check `email` (optionally `preferred_username`) → **Add**.
3. If prompted *Turn on the Microsoft Graph email permission* — accept.

Check **API permissions**: Microsoft Graph delegated permissions `openid`, `profile`, `email`
(and `User.Read`) must be present. If needed, click **Grant admin consent for ...**.

## 4. App roles

Entra ID groups come in the token as identifiers (GUIDs), not names, so **App roles** are more
convenient for WildcoreDMS roles — they come in the `roles` claim as strings.

1. In the application → **App roles** → **Create app role**.
2. Fill in:
    - Display name — e.g. `WildcoreDMS Administrator`;
    - Allowed member types — **Users/Groups**;
    - **Value** — the name to map to a WildcoreDMS role, e.g. `administrator`
      (this value goes into "SSO groups mapping");
    - Description — any;
    - *Do you want to enable this app role?* — checked → **Apply**.
3. Repeat for each role (`operator`, `installer`, ...).

The `wca auth:configure` wizard can print the list of values to create for the selected
WildcoreDMS roles.

## 5. Assign users

1. **Identity** → **Applications** → **Enterprise applications** → `WildcoreDMS`.
2. **Users and groups** → **Add user/group** → select users (or groups — requires an
   Entra ID P1/P2 license) → **Select a role** → the app role → **Assign**.
3. To allow only assigned users: **Properties** → **Assignment required?** — **Yes** → **Save**.

## 6. Configure WildcoreDMS

```bash
sudo wca auth:configure
```

Choose the `entra` provider, enter the configuration address from step 1, the Application (client) ID
and the secret value. Or manually in `/opt/wildcore-dms/.env`:

```dotenv
AUTH_METHODS=internal,oidc
OIDC_NAME=Microsoft
OIDC_ISSUER=https://login.microsoftonline.com/<tenant-id>/v2.0
OIDC_CLIENT_ID=<Application (client) ID>
OIDC_CLIENT_SECRET=<secret Value>
OIDC_EMAIL_CLAIM=email
OIDC_LOGIN_CLAIM=preferred_username
OIDC_GROUPS_CLAIM=roles
OIDC_MATCH_BY=email
OIDC_SYNC_ROLE=yes
```

and run `sudo wca system:http:reset`.

Notes:

- If users have no mail attribute, use `OIDC_EMAIL_CLAIM=preferred_username`
  (UPN in email format).
- `preferred_username` (UPN) may be longer than 50 characters — then choose another
  `OIDC_LOGIN_CLAIM` or create the user in WildcoreDMS in advance.

In the WildcoreDMS web panel: `Users management > Roles` → `Edit` → **"SSO groups mapping"** —
enter the **Value** of the corresponding App roles. See [Roles](./index.md#roles).
