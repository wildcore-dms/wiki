
# Component "Console"

!!! info "Available since version 0.27"

## Purpose
- Connect to equipment console (Telnet/SSH) from Wildcore.
- Automatic login/password input using stored credentials in the system.
- Access via web interface (based on ttyd) and from CLI.
- Saving logs (communication with equipment).
---

## Configuration
### Enabling the component

* In the admin panel enable the "Console" component (disabled by default).
* Refresh the page, open Settings → Console and enable the "Enable web" option.
* Wait about ~1 minute until the web service is started.
* Configure role permissions (see below).

### Permissions (RBAC)
Three permissions are available:

* Allow access to console — access to Telnet/SSH without auto-login.
* Allow access to console with automatic authorization — authorization via login/password stored in the system.
* Allow viewing equipment session logs.

!!! note "Telnet/SSH is chosen automatically based on device configuration"

### Nginx Configuration (WebSocket/Upgrade)
If you are proxying wildcore through nginx (for example, to add a certificate) — you also need to configure your external nginx to work with the socket.  
Add this configuration:

```title="location {} block in nginx"
set $connection_header "";
set $upgrade_header "";
if ($http_upgrade) {
    set $upgrade_header $http_upgrade;
    set $connection_header "upgrade";
}
proxy_set_header Upgrade $upgrade_header;
proxy_set_header Connection $connection_header;
```

## Usage
### Via WEB
**Two links will appear in the device card:**

* Console — without automatic login
* Console (autologin) — opens the console and automatically logs in with stored system credentials

Role permissions allow controlling which button is available.

### Via CLI
Autologin connection:
```shell
wca console:open <device_ip>
```

Manual login/password entry:
```shell
wca console:open <device_ip> -l
```
