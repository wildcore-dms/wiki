# System configuration (.env)

!!! abstract "Overview"

    Main WildcoreDMS parameters are stored on the server in **`/opt/wildcore-dms/.env`**:
    network ports, database connection, hardware, poller, security, cache, authentication and
    component settings.

    Some parameters can be changed **in the web interface**, the rest **only on the server** by
    editing `.env`. On this page parameters are split into these two groups and, within them,
    by purpose.

## How to change parameters

### In the web interface

Menu `Configuration > System configuration` (requires the **"Read/edit system settings"**
permission). Parameters are grouped into sections ("Web panel", "System", "Security",
"Working with devices", component sections). The default value is shown next to each field.
Saved values are written to the same `.env` file.

!!! note
    Parameters of the "System" section (poller and web server threads, metrics retention)
    are applied after restarting the containers — see below.

### On the server

1. Make a backup: `sudo cp /opt/wildcore-dms/.env /opt/wildcore-dms/.env.bak`
2. Edit the file, e.g.: `sudo nano /opt/wildcore-dms/.env`
3. Apply the changes:

    - application parameters (authentication, security, hardware, cache, etc.):

        ```bash
        sudo wca system:http:reset
        ```

    - Docker, ports, database, poller and thread count parameters — restart the containers:

        ```bash
        cd /opt/wildcore-dms
        sudo docker compose up -d
        ```

!!! warning
    - Line format is `PARAMETER=value`, no spaces around `=`. Quote values with spaces:
      `APP_NAME="My ISP DMS"`.
    - Boolean parameters accept `yes` / `no`.
    - Don't change parameters that are not listed here unless support advised you to.
    - Examples below use **placeholder** values (`dms.example.com`, `<password>`, etc.) —
      substitute your own.

---

## Parameters editable in the web interface { #web }

### Web panel

| Parameter | UI name | Description | Values | Default |
|-----------|---------|-------------|--------|---------|
| `APP_NAME` | Application name | System name in page titles | any text | `Wildcore DMS` |
| `EXTERNAL_HTTP_ADDRESS` | External web address | Address users open WildcoreDMS at. Used for links in notifications, QR codes and [SSO](../sso/index.md) | URL, e.g. `https://dms.example.com` | `http://127.0.0.1:8088` |
| `DEFAULT_LANGUAGE` | Default language | Interface language for new users and the login page | `ua`, `en`, `ru` | `en` |
| `MAP_COORDINATES` | Default map coordinates | Default map center | `latitude,longitude`, e.g. `50.45,30.52` | — |
| `MAP_TILE_LAYER` | Map tile layer | Default map background | `Google (street)`, `Google (hybrid)`, `OpenStreetMap`, `OpenTopoMap`, `Satellite`, `Dark`, `Terrain` | `Google (street)` |
| `LOGS_RETURN_RESULTS_LIMIT` | Limit returning logs | Maximum number of records in log selections | number | `500` |
| `WEB_ZOOM_MAIN` | Zoom web interface | Interface zoom (experimental) | number, e.g. `0.95` = 95% | `1.0` |
| `WEB_ZOOM_IFRAME` | Zoom web interface (iframe) | Zoom when embedded into an iframe (e.g. in billing) | number | `1.0` |
| `SEARCH2_ENABLED` | Extra Search status | Show a second search field in the header | `yes` / `no` | `no` |
| `SEARCH2_FILTER` | Extra Search by | What the second field searches by | `agreement` (contract), `description`, `interface`, `ont_ident` (ONU serial/MAC), `fdb_history`, `device` | `agreement` |

### System

| Parameter | UI name | Description | Values | Default |
|-----------|---------|-------------|--------|---------|
| `LOG_LEVEL` | Log level | Application log verbosity | `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY` | `WARNING` |
| `PROMETHEUS_RETENTION_TIME` | Prometheus retention time | How long metrics are kept (signal, traffic, status history, analytics). Longer — more disk space | duration: `15d`, `30d`, `90d`, `1y` | `30d` |
| `RR_NUM_WORKERS` | Count procs | How many API requests are handled in parallel | number | `50` |
| `POLLER_COUNT_PROCS` | Poller count procs | How many devices are polled simultaneously, see [Poller](../system/poller.md) | number | `10` |
| `POLLER_IGNORE_DOWN` | Poller ignore DOWN hosts | Don't poll unreachable devices | `yes` / `no` | `yes` |
| `POLLER_DO_NOT_CLEAR_INTERFACES` | Do not clear interfaces | Don't delete interfaces no longer present on the hardware (e.g. removed ONUs) | `yes` / `no` | `no` |

!!! info
    Parameters of this section are applied after `sudo docker compose up -d` in `/opt/wildcore-dms`.

### Security and proxy

| Parameter | UI name | Description | Values | Default |
|-----------|---------|-------------|--------|---------|
| `API_KEY_EXPIRATION` | API key expiration | User session lifetime after sign-in, seconds | number, e.g. `864000` (10 days) | `864000` |
| `RATE_LIMITER_ENABLED` | Brute force protection | Block an IP after failed sign-in attempts | `yes` / `no` | `yes` |
| `RATE_LIMITER_ATTEMPTS` | Incorrect login/password attempts | Number of failed attempts (within 10 minutes) after which the IP is blocked | number | `3` |
| `RATE_LIMITER_TIME` | Blocking by IP timeout | How long an IP is blocked, seconds. Unblock manually: `wca security:reset:ipblock <IP>` | number | `3600` |
| `SECURE_CHECK_PASSWORD_STRENGTH` | Check password strength | Require passwords of 8+ characters with upper/lowercase letters, a digit and a special character | `yes` / `no` | `yes` |
| `TRUSTED_HOST_NETWORK_LIST` | Trusted networks list | Addresses/networks allowed to call the API **without a key** (for integrations, e.g. billing). List only trusted servers. Empty — disabled | comma separated, e.g. `192.0.2.10,192.0.2.0/28` | empty |
| `PROXY_ENABLED` | Proxy enabled | Take the client IP from the proxy header. Enable only if WildcoreDMS runs behind a [proxy](../web-interface/use-proxy.md) | `yes` / `no` | `no` |
| `PROXY_REAL_IP_HEADER` | Real IP header | Header the proxy passes the real IP in | header name | `X-Forwarded-For` |

### Working with devices { #swc }

System-wide connection parameters. They can be overridden in an
[access](../management/device-access.md#connection), a [model or a device](../management/custom-parameters.md#sw_core_connection).

| Parameter | UI name | Description | Values | Default |
|-----------|---------|-------------|--------|---------|
| `SWC_CONSOLE_CONN_TYPE` | Connection type | Console protocol | `telnet`, `ssh` | `telnet` |
| `SWC_CONSOLE_PORT` | Console port | Telnet/SSH port | number | `23` |
| `SWC_CONSOLE_TIMEOUT_SEC` | Console timeout | Maximum console session/command time, seconds | number | `300` |
| `SWC_CONSOLE_WAIT_BYTE_SEC` | Wait stream data timeout | How long to wait for more console output, seconds | number | `5` |
| `SWC_SNMP_VERSION` | SNMP version | SNMP version | `1`, `2c` | `2c` |
| `SWC_SNMP_PORT` | SNMP port | SNMP port | number | `161` |
| `SWC_SNMP_TIMEOUT_SEC` | SNMP timeout sec | Timeout of a single SNMP request, seconds | number | `4` |
| `SWC_SNMP_REPEATS` | SNMP repeats | Number of SNMP request retries | number | `3` |
| `SWC_MIKROTIK_API_PORT` | Mikrotik API port | Mikrotik RouterOS API port | number | `8728` |
| `SWC_CHECK_ICMP_PING` | Check ICMP status | Ping a device before accessing it (a fast "unreachable" answer instead of waiting for a timeout) | `yes` / `no` | `yes` |
| `SWC_ENABLE_SPLITTING` | Split response by interface | Whole-device responses (ONU list, statuses) are cached per interface — port/ONU pages open faster | `yes` / `no` | `yes` |
| `SWC_CACHE_ACTUALIZE_TIMEOUT_SEC` | Actualize timeout | After how many seconds cached data is considered stale and requested from the hardware again | number | `3600` |

### Component parameters

Shown in the UI if the component is installed.

| Component | Parameters |
|-----------|------------|
| [Web console](../components/console.md) | `CONSOLE_ENABLE_WEB` — enable the web console (`yes`/`no`, `no`); `CONSOLE_OPEN_AT` — open in a tab or a window (`tab`/`window`, `tab`); `CONSOLE_FONT_SIZE` — font size, px (`14`) |
| SNMP traps | `TRAP_SERVICE_ENABLED` — receive traps (`yes`); `TRAP_SERVICE_SNMP_PORT` — UDP port (`162`, change requires restarting containers); `TRAP_SERVICE_COUNT_HANDLERS` — number of handlers (`10`); `TRAP_SERVICE_IGNORE_UNKNOWN_TRAPS` — ignore traps from unknown devices; `TRAP_SERVICE_CHECK_COMMUNITY` — check trap community (`no`) |
| [Config backups](../components/oxidized.md) | `OXIDIZED_THREADS` — threads (`30`, recommended = CPU count); `OXIDIZED_INTERVAL` — backup interval, sec (`86400`); `OXIDIZED_TIMEOUT` — timeout, sec (`300`); `OXIDIZED_URL` — don't change for the built-in Oxidized |
| [Autotopology](../components/links/autotopology.md) | `AUTO_TOPOLOGY_SCHEDULE_ENABLED` — run on schedule (`yes`); `AUTO_TOPOLOGY_THREADS` — threads (`10`) |
| [Link utilization](../components/links/utilization.md) | `LINKS_UTILIZATION_CALCULATE_PERIOD` — calculation period (`10m`, `15m`, `30m`, `1h`, `3h`, `6h`; `15m`); `LINKS_UTILIZATION_MAX_PRC_FOR_ALERT` — load % that creates an event (`85`) |
| [Notifications](../components/notifications.md) | `NOTIFICATIONS_CHECK_PREVIOUS_MESSAGE` — don't send "resolved" if no problem notification was sent (`no`) |
| [QR code Generator](../components/qr-code-generator.md) | `QRGENERATOR_SHOW_DATA` — caption under the QR code (`ip`/`name`, `name`) |
| Analytics | `ANALYTICS_MIN_RX_SIGNAL` / `ANALYTICS_MAX_RX_SIGNAL` — normal ONU RX range, dBm (`-28` / `-10`); `ANALYTICS_MIN_OLT_RX_SIGNAL` / `ANALYTICS_MAX_OLT_RX_SIGNAL` — same for OLT RX; `ANALYTICS_MIN_SFP_RX_SIGNAL` / `ANALYTICS_MAX_SFP_RX_SIGNAL` — for SFP (`-15` / `5`); `ANALYTICS_IGNORE_IFACES_WITH_MORE_THAN` — when looking for duplicate MACs, ignore ports with more than N MACs (uplinks, `10`); `ANALYTICS_SHOW_ACTIVE_MORE_THAN` — count MACs active longer than N seconds (`1800`) |
| Search devices | `SEARCH_DEVICE_SOURCES` — sources (`history,device`); `SEARCH_DEVICE_CHECK_ALL_SOURCES` — check all sources (`no`); `SEARCH_DEVICE_HISTORY_ONLY_ACTIVE` — only active history records (`yes`); `SEARCH_DEVICE_IGNORE_TAG_PORTS` — ignore trunk ports (`yes`); `SEARCH_DEVICE_REQUEST_CONCURRENCY` — parallel requests (`50`) |
| [MikBill](../components/mikbill_integration.md) | `MIKBILL_API_ADDR` — billing address (`https://billing.example.com`); `MIKBILL_AUTH_KEY` — API key (same as in the MikBill integration settings); `MIKBILL_GLOBAL_SEARCH_FIELD` — search field (`agreement`/`uid`/`login`); `MIKBILL_SET_ONT_COORDINATES` — take ONU coordinates from billing (`no`) |
| [NoDeny Plus](../components/nodeny_plus.md) | `NODENY_URL` — NoDeny address; `NODENY_DATABASE_DSN`, `NODENY_DATABASE_USERNAME`, `NODENY_DATABASE_PASSWORD` — NoDeny DB connection; `NODENY_COMPARISON_DESCRIPTION_REQUIRED` — require interface description to match the name (`no`) |
| [Userside](../components/us_integration.md) | `USERSIDE_WEB_ADDRESS` — Userside address; `USERSIDE_API_KEY` — API key; `USERSIDE_SYNC_DATA` — what to sync (`devices`); `USERSIDE_ADD_NEW_DEVICES_TO_GROUP_ID` — group ID for new devices (`-1`); `USERSIDE_DELETE_NOT_EXISTED_DEVICES` — delete devices removed in Userside (`no`); `USERSIDE_UPDATE_DEVICES_FIELDS` — fields to update (`coordinates`, `name`, `location`, `comment`) |

---

## Parameters changeable only on the server { #server-only }

### Network and Docker

!!! warning
    After a change run `cd /opt/wildcore-dms && sudo docker compose up -d`.

| Parameter | Description | Values | Default |
|-----------|-------------|--------|---------|
| `NGINX_EXPOSE` | Web interface address and port | `IP:port` | `0.0.0.0:8088` |
| `PROMETHEUS_EXPOSE` | Prometheus address and port (for external access, e.g. Grafana) | `IP:port` | `127.0.0.1:9090` |
| `MYSQL_EXPOSE` | MySQL address and port on the host | `IP:port` | `127.0.0.1:33306` |
| `LOCAL_SUBNET` | Internal Docker container network. Change only if it overlaps with your networks | CIDR | `10.255.255.128/25` |

!!! danger
    Don't expose `MYSQL_EXPOSE` and `PROMETHEUS_EXPOSE` to the outside (`0.0.0.0`) without a firewall.

### Database

| Parameter | Description | Default |
|-----------|-------------|---------|
| `DATABASE_URL` | DB connection string | `mysql:host=wca-db;dbname=wildcore_agent;charset=utf8` |
| `DATABASE_NAME` | DB name | `wildcore_agent` |
| `DATABASE_USER` / `DATABASE_PASSWD` | DB user and password. Set during installation, no need to change | — |
| `MYSQL_INNODB_BUFFER_POOL_SIZE` | Memory for the MySQL data cache. Increase for large networks (e.g. `4G`), but no more than ~50% of server RAM | `1G` |
| `MYSQL_KEY_BUFFER_SIZE` | MySQL index buffer | `256M` |
| `MYSQL_TABLE_OPEN_CACHE` | Number of simultaneously open tables | `500` |

See also [Optimization](../troubleshooting/optimization.md).

### Authentication and API

| Parameter | Description | Values | Default |
|-----------|-------------|--------|---------|
| `AUTH_METHODS` | Sign-in methods | `internal`, `oidc` or both, comma separated | `internal` |
| `AUTH_AUTO_INITIATE` | Go straight to the SSO provider | `yes` / `no` | `no` |
| `OIDC_*` | SSO sign-in parameters | see [Single Sign-On](../sso/index.md#configure) | — |
| `API_STRICT_RULES` | Deny API calls that have no permissions defined | `yes` / `no` | `yes` |
| `SECURE_ENCRYPT_ACCESSES` | Encryption of hardware credentials in the DB. Enable with `sudo wca security:enable-encryption`, not manually — see [FAQ](../faq.md) | `yes` / `no` | `no` |

### Poller and performance

| Parameter | Description | Values | Default |
|-----------|-------------|--------|---------|
| `SWC_CALL_CONCURRENCY` | Maximum number of simultaneous requests to the hardware | number | `1` |
| `SWC_CACHE_TIMEOUT_SEC` | How long the hardware response cache is kept, seconds | number | `86400` |
| `RR_MAX_WORKER_MEMORY` | Memory limit per web server thread, MB | number | `160` |
| `DEVICES_LIST_DISABLE_IFACE_STAT` | Don't calculate interface statistics in the device list — if the list loads very slowly | `yes` / `no` | `no` |
| `MEMCACHE_CACHING_QUERY_TIMEOUT_SEC` | DB query cache lifetime, seconds | number | `30` |

### Other

| Parameter | Description | Values | Default |
|-----------|-------------|--------|---------|
| `LOG_FILES_PATH` | Log directory inside the container | path | `/log` |
| `WS_ENABLED` | WebSocket server for real-time updates | `yes` / `no` | `no` |
| `ENVIRONMENT` | Operating mode. Must be `PRODUCTION` | `PRODUCTION` | `PRODUCTION` |

### Service parameters

These parameters describe internal service addresses in Docker and are filled in during
installation. **Don't change them** unless support advised you to: `API_BASE_PATH`,
`IMAGE_BASE_URL`, `MEMCACHE_ENABLED`, `MEMCACHE_SERVER`, `MEMCACHE_PORT`, `REDIS_ENABLED`,
`REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `PROMETHEUS_URL`, `ALERTMANAGER_URL`,
`SWC_URL_PATH`, `SWC_CACHE_SYSTEM`.

## Example

A `.env` fragment with placeholder values:

```dotenv
APP_NAME="Example ISP DMS"
EXTERNAL_HTTP_ADDRESS=https://dms.example.com
DEFAULT_LANGUAGE=en
MAP_COORDINATES=50.45,30.52

NGINX_EXPOSE=0.0.0.0:8088

POLLER_COUNT_PROCS=20
PROMETHEUS_RETENTION_TIME=90d

SWC_CONSOLE_CONN_TYPE=ssh
SWC_CONSOLE_PORT=22
SWC_SNMP_TIMEOUT_SEC=5

PROXY_ENABLED=yes
```
