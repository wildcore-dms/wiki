# About components

!!! abstract "Overview"

    WildcoreDMS functionality is made of **components** — modules that can be enabled and disabled
    as needed. A component adds pages and buttons to the web interface, role permissions, background
    tasks, console commands and API methods. If a component is disabled, its pages, tabs and buttons
    are not shown.

## Which component provides which functionality

### Working with hardware

| Component | Key | What it provides |
|-----------|-----|------------------|
| [OLTs](./olts.md) | `olts` | OLT page: ONU tree, physical and PON ports, ONU page, DHCP Snooping, ONU blacklist, background OLT polling |
| [OLTs control](./olts_control.md) | `olts_control` | ONU actions (reboot, disable, delete, reset, description), UNI and physical port control |
| [Switches](./switches.md) | `switches` | Switch page: ports, VLANs, errors, FDB, cable and SFP diagnostics, port page |
| [Switches control](./switches_control.md) | `switches_control` | Reboot, save configuration, clear counters, port state/speed/description, VLANs on ports |
| [Routers](./routers.md) | `routers` | L3 hardware: ARP, FDB, direct routes |
| [Mikrotik RouterOS](./router_os.md) | `router_os` | Mikrotik routers via API: interfaces, DHCP, ARP, queues, BGP |
| [Sensors](./sensors.md) | `sensor_devices` | Monitoring devices (sensors) and their mode control |
| [Pinger](./pinger.md) | `pinger` | ICMP availability monitoring, ICMP devices, availability percentage, outage log |
| [Charts](./prometheus_wrapper.md) | `prometheus_wrapper` | Traffic, error, signal, CPU/RAM charts from history |
| [Live traffic](./live_traffic.md) | `live_traffic` | Real-time port/ONU traffic chart |
| [FDB history](./fdb_history.md) | `fdb_history` | MAC address history on ports and ONUs |
| [Web console](./console.md) | `console` | Browser terminal to hardware with auto-login and session log |
| [Macros](./macros/getting-started.md) | `macros` | Custom console command scenarios with parameters |
| [ONT registration](./onts-registration/getting-started.md) | `onts_registration` | Unregistered ONUs and template-based registration |
| [Config backups](./oxidized.md) | `oxidized` | Hardware configuration backups with change history |
| SNMP traps | `trapservice` | Receiving SNMP traps — instant reaction to port/ONU state changes |

### Network and topology

| Component | Key | What it provides |
|-----------|-----|------------------|
| [Links](./links/describe.md) | `links` | Links between devices, topology (tree, graph), routes on the map |
| [Autotopology](./links/autotopology.md) | `auto_topology` | Automatic link building via LLDP/FDB |
| [Autodiscovery](./autodiscovery.md) | `autodiscovery` | Finding new devices in the network and adding them automatically |

### Events, analytics, notifications

| Component | Key | What it provides |
|-----------|-----|------------------|
| [Events](./events.md) | `events` | Rule-based events (device/port down, errors, signal) |
| [Notifications](./notifications.md) | `notifications` | Sending events and actions to Telegram and Email |
| Analytics | `analytics` | Network reports: statuses, signals, duplicate MACs/ONUs, growing errors — see [Features](../features/main.md#analytics) |

### Integrations and API

| Component | Key | What it provides |
|-----------|-----|------------------|
| [MikBill](./mikbill_integration.md) | `mikbill_integration` | Subscriber sync, billing data on the port/ONU page |
| [NoDeny Plus](./nodeny_plus.md) | `nodeny_plus` | NoDeny Plus billing integration |
| [Userside](./us_integration.md) | `userside_integration` | Device and coordinate sync with Userside |
| [Diagnostic](./diagnostic.md) | `diagnostic` | Subscriber diagnostics API for billing (JSON/HTML card), ARP ping |
| [Search devices](./search_device.md) | `search_device` | API to find a subscriber by MAC/IP (FDB, ARP) |

### Tools

| Component | Key | What it provides |
|-----------|-----|------------------|
| [Attachments](./attachments.md) | `attachments` | Photos and documents for devices, ports, ONUs |
| [QR code Generator](./qr-code-generator.md) | `qr-generator` | QR labels linking to the object page |

!!! info "Dependencies"
    Control components (`olts_control`, `switches_control`) work only together with the base ones
    (`olts`, `switches`). Dependency list — `wca component:dependencies`.

## Managing components

### In the web interface

`Configuration > System configuration` → **"Components"** tab: the component list with state,
install, enable and disable buttons. Component settings are there too
(see [System configuration](../installation-and-updating/env-configuration.md#web)).

### In the console

```shell
sudo wca component:list                               # components and their state
sudo wca component:control <key> install              # install
sudo wca component:control <key> enable               # enable
sudo wca component:control <key> disable              # disable
sudo wca component:dependencies                       # dependencies
```

!!! note
    Third-party integration components are disabled by default — enable the ones you need after
    configuring connection parameters.

## What a component can do

- add pages, tabs, cards and buttons to the web interface;
- add [role](../management/roles.md) permissions;
- add [API](../api/index.md) methods;
- add [console commands](../cli/index.md) (prefixed with the component key, e.g. `olts:`);
- add scheduler tasks and system event handlers;
- have its own parameters in [System configuration](../installation-and-updating/env-configuration.md).
