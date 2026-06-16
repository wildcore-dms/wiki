# API groups & sections

API methods are grouped by area (these are **tags** in Swagger). Below is an overview
map of the sections so you can quickly find the method you need.

!!! abstract "Full list — in Swagger"
    This is an overview. **Exact paths, parameters and response schemas** are always
    in the interactive Swagger of your server:
    `https://<your-server>/swagger/` (demo: [demo.wildcore.tools/swagger](https://demo.wildcore.tools/swagger/)).
    `curl` examples by group are on the [Request examples](./examples.md) page.

## Equipment & reference data

| Group | Purpose |
| --- | --- |
| **device** | Devices: list and card (`GET/POST/PUT/DELETE /device`), model detection by IP (`/device-detect`), DB-vs-hardware model comparison, list for selectors (`/device/options`). |
| **device-model** | Equipment model catalog: CRUD, model icon. |
| **device-group** | Device groups: CRUD. |
| **device-access** | Equipment access profiles (connection parameters): CRUD, defaults (`/device-access-defaults`). |
| **device-interface** | Device interfaces: list and card, history, types (`/device-interface/types`), stats by type, ONU list with filters (`/device-interface/ont-list`), **search by parameters** (`/device-interface/search`). |
| **interface-marks** | Interface marks: favorites and tags, paginated lists. |

## Working with equipment live

Methods that poll/control real equipment in real time.

| Group | Purpose |
| --- | --- |
| **switcher-core** | Generic equipment-module invocation: list available modules for a device and execute a module (GET/POST). |
| **switches** | Switches: interface and resource info, VLANs, cable and SFP diagnostics, clear counters, reboot, save configuration, change port settings. |
| **routers** | Routers (L3): ARP, direct routes, FDB, interfaces, VLANs, resources. |
| **router-os** | Mikrotik RouterOS: address-list, ARP, BGP sessions, DHCP servers/leases, simple queues, interfaces and VLANs, resources. |
| **olts** | OLT: variables/data for working with ONUs and ports. |
| **olts_control** | OLT control: change port description and other control actions. |
| **macros** / **macros-control** | Run macros on equipment (`/component/macros/execute`), list (`/component/macros/list`), variables; macro administration (CRUD, preview). |
| **onts-registration** / **onts-registration-control** | ONU registration: run the registration macro, find an ONU, list unregistered ones (`/component/onts_registration/unregistered`); registration template administration (CRUD, preview). |

## Links & topology

| Group | Purpose |
| --- | --- |
| **links** | Links between devices/interfaces: CRUD, tree and list with utilization, topology graph, configuration options, high-utilization widget. |

## Monitoring & analytics

| Group | Purpose |
| --- | --- |
| **analytics** | Analytical tables, charts and widgets: device and ONU statuses, signal levels, increasing errors, duplicate MAC/ONU, ONUs with bad signal, etc. |
| **prometheus-wrapper** | Time series for charts: traffic, errors, CPU/memory/disk, temperature, optical levels (RX), voltage. |
| **pinger** | Device reachability: statuses, down-logs, chart data. |
| **events** | Events/alerts: query by filters, stats by name and severity, Alertmanager rules (view/update/validate), bulk-resolve events. |
| **fdb-history** | FDB (MAC table) history by filter, device or interface. |

## Portal, search, attachments

| Group | Purpose |
| --- | --- |
| **portal** | Global search across the system (`/portal/search`) and nearest-objects search by coordinates (`/portal/nearest-elements`). |
| **attachments** | Object attachments (devices/ONUs/interfaces): upload, list, metadata, thumbnail, delete. |
| **qr-generator** | Generate an object QR code (base64). |

## Users & access

| Group | Purpose |
| --- | --- |
| **auth** | Authentication: sign in (`POST /auth`), sign out (`DELETE /logout`), **cross-authentication** as another user (`POST /system/cross-auth`). Access from trusted networks runs as the `sys` user (see [Authentication](./index.md)). |
| **user** | Users: list and card, create/edit/delete, key generation (`generate-auth-key`), close sessions, manage **2FA** (enable/disable, QR data). |
| **user-role** | User roles: CRUD and the list of available permissions (`/user-role-permissions`). |

## System, logs, maintenance

| Group | Purpose |
| --- | --- |
| **system** | System configuration (`GET/PUT /system/configuration`), server info (`/system/info`), frontend properties (`/system/settings`), usage stats, Alertmanager webhook, Prometheus metrics (`/metrics`), new-version check, translations. |
| **system-components** | List of system components and managing their state/configuration. |
| **system-schedule** | Scheduler: task list, keys, execution reports, schedule update. |
| **system-logs** | Action log: record, filter, list of supported action types. |
| **system-pollers** | Equipment poller logs: filter, list of pollers. |
| **system-switcher-core** | Equipment-action logs: available modules, filter. |
| **oxidized** | Configuration backups: device list, device config/status/links, model-support check. |
