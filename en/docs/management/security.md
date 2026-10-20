# Security and sign-in

!!! abstract "Overview"

    Sign-in and protection settings are collected on a separate tab
    `Configuration > System configuration` → **"Security"** (requires the
    **"Read/edit system settings"** permission). The same tab shows IP addresses blocked by
    password brute-force protection and lets you unblock them.

## "Security" tab

| Card | What is configured |
|------|--------------------|
| **Blocked IP addresses** | list of blocked addresses and unblocking, see [below](#unblock) |
| **Sign-in** | API key (session) lifetime, sign-in methods (login/password, SSO), [SSO (OIDC)](../sso/index.md) parameters |
| **Security** | brute-force protection, password strength requirements |
| **Proxy** | working behind a [proxy](../web-interface/use-proxy.md) and trusted networks |

Each parameter is described in
[System configuration (.env)](../installation-and-updating/env-configuration.md#security).

After pressing **"Save"** the settings are applied immediately, no restart is needed.
Only the parameters of this tab are saved — parameters of the "System configuration" tab are
not changed.

!!! info "Client secret"
    The SSO provider client secret is not shown in the interface — the field only indicates
    that it is set. If you leave the field empty, the current secret is kept; to replace it,
    enter a new value.

## Brute-force protection { #brute-force }

Protection is enabled by the **"Brute force protection"** parameter and applies to sign-in with
login and password (SSO sign-in is not limited).

- Every failed sign-in attempt is counted for the IP address it was made from. The counter is
  reset if there were no new failures for 10 minutes.
- After **"Incorrect login/password attempts"** failed attempts the IP is blocked for
  **"Blocking by IP timeout"** seconds. While the IP is blocked, signing in from it is not
  possible even with the correct password — the user sees a blocking message.
- WildcoreDMS remembers which logins were tried from this IP. This helps to tell whether a user
  mistyped the password or someone is guessing accounts.
- The block is written to the system action log (an IP block event with the number of attempts,
  logins and unblock time).
- A successful sign-in resets the counter for this IP.

!!! tip "Users behind NAT"
    The IP address is blocked, not the user. If several employees access the internet through
    one address, mistakes of one of them can block sign-in for everyone. In such cases increase
    "Incorrect login/password attempts" or unblock the address manually.

If WildcoreDMS works behind a proxy, enable **"Proxy enabled"**, otherwise all requests look like
requests from the proxy address and a block affects all users —
see [Using a proxy](../web-interface/use-proxy.md).

## Unblocking { #unblock }

### In the web interface

The **"Blocked IP addresses"** card shows, for each address, the logins that were tried, the
number of attempts, the blocking time and the automatic unblock time.

| Action | How |
|--------|-----|
| Unblock one address | **"Unblock"** button in the address row |
| Unblock all addresses a specific login was tried from | enter the login in the **"Login"** field and press **"Unblock by login"**, or click the login in the table |
| Unblock everything | **"Unblock all"** |
| Refresh the list | refresh button on the right |

!!! example "Typical case"
    A user mistyped the password several times and cannot sign in. There is no need to look for
    their IP — enter their login and press **"Unblock by login"**.

### On the server

```bash
sudo wca security:reset:ipblock                  # unblock all addresses
sudo wca security:reset:ipblock 192.0.2.15       # one address
sudo wca security:reset:ipblock --login=admin    # all addresses the login admin was tried from
```

!!! note
    Blocks are stored in the cache. Flushing the cache (`wca cache:memcache:flush`) or restarting
    the containers also removes all blocks.

## Password requirements { #password }

If **"Check password strength"** is enabled, when a user is created or a password is changed in
the web interface (by an administrator in the user card or by the user in the account
settings), WildcoreDMS requires a password:

- at least 8 characters long;
- with uppercase and lowercase letters;
- with a digit;
- with a special character (`!@#$%^&*(),.?":{}|<>`).

The requirement does not apply to already set passwords — it is checked only when they change.
The `wca user:reset-password` command does not check password strength.
