# Console commands (wca)

!!! abstract "Overview"

    The WildcoreDMS server provides the **`wca`** console utility. It performs actions not
    available in the web interface (password resets, cache flushing, SSO setup, device import),
    diagnoses hardware interaction and manages background processes.

## How to use

Commands run on the server where WildcoreDMS is installed, as root:

```shell
sudo wca                      # list all commands
sudo wca <command> --help     # command arguments and options
```

General rules:

- `<argument>` — required argument, `[argument]` — optional.
- List commands support `-o` / `--output` for the output format: `table` (default), `json`, `yaml`.
- Some commands are **interactive** — they ask questions in the console (e.g. `device:add`).
- Component commands (prefixed with the component name, e.g. `olts:`, `console:`) are available only when the component is enabled — see [Components](../components/index.md).
- `-v`, `-vv`, `-vvv` — more verbose output for diagnostics.

Examples below use placeholder addresses (`192.0.2.10`) and logins (`operator`).

---

## Users

| Command | Description |
|---------|-------------|
| `wca user:list` | List users |
| `wca user:change-role <login> [role]` | Change a user's role. If the role is omitted, you choose it from a list |
| `wca user:reset-password <login> [-p <password>]` | Set a new password and close all user sessions. Without `-p` the password is asked; an empty answer generates a random one |
| `wca user:reset-ip-strict <login>` | Disable IP sign-in restriction for the user |
| `wca user:reset-user <login>` | Reset access: password becomes equal to the login, 2FA and IP restriction are disabled. Use it when a user (including `admin`) can't sign in |
| `wca user:delete <id>` | Delete a user by ID (ID — from `user:list`) |
| `wca user:generate-key <login> [expiration]` | Generate an API key for the user. Expiration: `10m`, `1h`, `30d`, `365d`, etc. |
| `wca user-group:list` | List user roles (with permission count and display flag) |

Examples:

```shell
sudo wca user:reset-user admin
sudo wca user:change-role operator Installer
sudo wca user:generate-key billing 365d
```

## Authentication and security

| Command | Description |
|---------|-------------|
| `wca auth:configure` | Step-by-step wizard for sign-in methods and SSO (OpenID Connect) — see [Single Sign-On](../sso/index.md) |
| `wca security:reset:ipblock [ip]` | Unblock an IP blocked by brute-force protection. Without an argument — unblock all |
| `wca security:enable-encryption [-f]` | Enable encryption of hardware credentials in the DB. **Irreversible** — see [FAQ](../faq.md) |
| `wca security:generate-encrypt-key [-f]` | Generate the encryption key (usually called automatically when enabling encryption) |
| `wca system:recalc-sessions` | Recalculate active user sessions |

## Devices, accesses, models

| Command | Description |
|---------|-------------|
| `wca device:list` | List devices |
| `wca device:add` | Add a device (interactive: name, IP, MAC, serial, description, model, access, group, additional parameters) |
| `wca device:update` | Edit a device (interactive) |
| `wca device:delete <id>` | Delete a device by ID |
| `wca device:delete-in-group <group_id>` | Delete **all devices** of a group |
| `wca device:import <file.csv> [-g <group_id>] [-s <separator>]` | Import devices from CSV — see [Import devices](./import-devices.md) |
| `wca device-access:list` | List [accesses](../management/device-access.md) |
| `wca device-access:add` | Create an access (interactive) |
| `wca device-access:edit <id>` | Edit an access |
| `wca device-access:delete <id>` | Delete an access |
| `wca device-model:list` | List device models |
| `wca device-model:update <id>` | Change a model's name, vendor and [additional parameters](../management/custom-parameters.md) (interactive) |

!!! warning
    `device:delete-in-group` deletes devices with their interfaces and history without extra
    confirmation.

## Hardware and diagnostics

| Command | Description |
|---------|-------------|
| `wca switcher-core:modules <ip>` | Modules (capabilities) supported by the device model |
| `wca switcher-core:call <ip> <module> [arguments...]` | Run a module on a device and print the result. Options: `-s device\|cache\|store` — data source (default `device`), `-t` — show console output, `-m` — show metadata |
| `wca test:switcher-core:call <module> [arguments...] -g <group_id>` | Run a module on all devices of a group (bulk check). Options: `-s` — source, `-c` — console output, `-f` — show only the needed field |
| `wca test:snmpwalk <ip> [oid]` | Run snmpwalk with the device's access parameters |
| `wca console:open <ip or id> [-l]` | Open a device console with auto-login (`-l` — without auto-login). Requires the [Web console](../components/console.md) component |
| `wca live_traffic:view <ip> <interface> [-i 5s]` | Real-time traffic on an interface |
| `wca prometheus_wrapper:last-values <ip> <metrics>` | Last values of device metrics (comma-separated names) |
| `wca switches:counters <ip>` | Traffic statistics by switch ports |
| `wca switches:errors <ip>` | Error statistics by ports |
| `wca switches:rmon <ip>` | RMON statistics by ports |

Examples:

```shell
sudo wca switcher-core:modules 192.0.2.10
sudo wca switcher-core:call 192.0.2.10 pon_onts_status
sudo wca switcher-core:call 192.0.2.10 interface_descriptions interface=gpon0/1:1 -s cache
sudo wca test:snmpwalk 192.0.2.10 1.3.6.1.2.1.1
sudo wca live_traffic:view 192.0.2.10 ge0/1 -i 2s
```

## Poller

| Command | Description |
|---------|-------------|
| `wca poller:poll <device_id> [-p <poller>] [-d]` | Poll a device manually: all pollers or one (`-p`, e.g. `optical_strength`). `-d` — skip availability and interval checks |
| `wca poller:last:counters` | Statistics of the last polls |

More on pollers — [Hardware Poller](../system/poller.md).

## Cache

| Command | Description |
|---------|-------------|
| `wca cache:flush` | Refresh all caches. Use after changing settings or when data looks wrong |
| `wca cache:redis:flush-all` | Flush the Redis cache |
| `wca cache:memcache:flush` | Flush the hardware response cache |
| `wca cache:objects:flush` | Flush the service object cache |
| `wca cache:memcache:keys [mask]` | Cache keys by mask |
| `wca cache:memcache:key-value <key>` | Value of a cache key |

## System and background processes

| Command | Description |
|---------|-------------|
| `wca system:http:reset` | Restart web request handlers — apply changes in [`.env`](../installation-and-updating/env-configuration.md) |
| `wca system:http:stat` | Web request handler state |
| `wca system:configuration` | Print the current system configuration |
| `wca system:subscription` | Agent subscription information. Helps find the reason if the agent is disabled |
| `wca system:reload-external-apps` | Reload external app configuration (Grafana, Prometheus, etc.) |
| `wca supervisor:processes-list` | Background processes and their state |
| `wca supervisor:control <process> <restart\|stop\|start>` | Control a background process, e.g. restart the Telegram bot after changing settings |
| `wca supervisor:restart` | Restart all background processes |
| `wca schedule:list` | Scheduler tasks |

## Components

| Command | Description |
|---------|-------------|
| `wca component:list [-o json]` | Components and their state |
| `wca component:control <component> <install\|uninstall\|enable\|disable>` | Install, uninstall, enable or disable a component |
| `wca component:dependencies` | Dependencies between components |

More — [About components](../components/index.md).

## Logs and data cleanup

| Command | Description |
|---------|-------------|
| `wca logs:clear <type> [days]` | Clear logs older than N days. Types: `switcher-core` (hardware calls), `collector` (poller), `actions` (user actions), `crontab-reports` (scheduler reports) |
| `wca events:retention <days>` | Delete resolved events older than N days |
| `wca trapservice:clear-old-logs [days]` | Clear old SNMP trap records |
| `wca attachments:clear-not-existed` | Remove attachment records whose files are missing |
| `wca auto_topology:clear-not-actual-links [-d 3]` | Remove automatically found links not confirmed for N days |

## Component commands

Available when the corresponding component is enabled. Most of them are run by the scheduler
automatically — run them manually to skip waiting for the schedule or for diagnostics.

| Command | Component | Description |
|---------|-----------|-------------|
| `wca autodiscovery:scan [cidr] [-a <access_id>] [-g <group_id>]` | [Autodiscovery](../components/autodiscovery.md) | Find new devices in the network |
| `wca auto_topology:scan` | [Autotopology](../components/links/autotopology.md) | Build links between devices via LLDP/FDB |
| `wca links:calc-link-utilization` | [Link utilization](../components/links/utilization.md) | Recalculate link utilization |
| `wca olts:get-onts-blacklist [ip]` | OLTs | Read the [ONU blacklist](../system/onu-blacklist.md) from all OLTs or one |
| `wca onts_registration:get-unregistered-onts [ip]` | [ONU registration](../components/onts-registration/getting-started.md) | Refresh the unregistered ONU list |
| `wca analytics:duplicated-mac-addresses` | Analytics | Find duplicate MAC addresses |
| `wca analytics:duplicated-ont-idents` | Analytics | Find duplicate ONUs |
| `wca events:apply-rules` | [Events](../components/events.md) | Apply event rules after changing the configuration |
| `wca events:sync-active-alerts [--dry-run]` | Events | Close "stuck" events after an Alertmanager restart (`--dry-run` — report only) |
| `wca notifications:send-notify <id>` | [Notifications](../components/notifications.md) | Resend a notification by ID |
| `wca pinger:update-exporter-statuses` | Pinger | Refresh statuses for ICMP monitoring |
| `wca mikbill_integration:sync-clients` | [MikBill](../components/mikbill_integration.md) | Sync subscribers with MikBill |
| `wca nodeny_plus:sync-clients` | [NoDeny Plus](../components/nodeny_plus.md) | Sync subscribers with NoDeny |
| `wca userside_integration:sync [types...]` | [Userside](../components/us_integration.md) | Sync data from Userside |

## Service commands

These commands are run by the system automatically (background services, scheduler, migrations
during updates). **Don't run them manually** unless support advised you to:

`schedule:executor`, `schedule:exec-once`, `poller:poll-service`, `migration:migrate`,
`migration:components-migrate`, `migration:list`, `cache:compile`, `openapi:generate`,
`system:internal-event-listener`, `system:prom-metrics-exporter`, `system:events:listeners`,
`events:subscribe`, `notifications:service`, `notifications:telegram-bot`, `trapservice:handler`,
`console:open-for-web`, `console:run-ttyd-server`, `server:run`, `api:routes-list`, `api:rules-list`.
