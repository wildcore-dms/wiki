# Working with hardware

!!! abstract "Overview"

    How WildcoreDMS connects to hardware, where connection parameters come from, how response
    caching works and how to get "live" data.

## Access methods

WildcoreDMS works with hardware via:

- **SNMP v1/v2c** — the main data source: port and ONU state, counters, FDB, signal levels;
- **console (Telnet/SSH)** — data unavailable over SNMP, ONU registration, [macros](../components/macros/getting-started.md), [web console](../components/console.md);
- **API** — for Mikrotik RouterOS;
- **ICMP** — checking device availability before accessing it (can be disabled with `SWC_CHECK_ICMP_PING`).

What can be retrieved from a specific model depends on its set of modules. The modules of a
device are shown by:

```shell
wca switcher-core:modules <device IP>
```

Full list of models and capabilities — [Supported hardware](../supported-hardware.md).

## Connection parameters: where they come from { #connection-levels }

Credentials and connection parameters are set on several levels. Each next level overrides the
previous one:

```
system (.env / web) → access → model → device
```

| Level | Where | What can be set |
|-------|-------|-----------------|
| **System** | `Configuration > System configuration` → "Working with devices", or `.env` — see [System configuration (.env)](../installation-and-updating/env-configuration.md#swc) | Defaults for all devices |
| **Access** | [`Device management > Accesses`](../management/device-access.md) | Communities, login/password, console type, ports, timeouts, SNMP version |
| **Model** | [Model additional parameters](../management/custom-parameters.md#sw_core_connection) | Credentials (`access`) and connection parameters (`sw_core_connection`) |
| **Device** | [Device additional parameters](../management/custom-parameters.md#sw_core_connection) | Same as for the model — for a single device |

Not every parameter is available on every level:

| Parameter | System (web / `.env`) | Access (web) | Model / device (JSON) |
|-----------|:---------------------:|:------------:|:---------------------:|
| Console type (Telnet/SSH) | ✓ | ✓ | ✓ |
| Console port | ✓ | ✓ | ✓ |
| Console timeout | ✓ | ✓ | ✓ |
| Console data wait | ✓ | — | ✓ |
| SNMP version | ✓ | ✓ | ✓ |
| SNMP port | ✓ | ✓ | ✓ |
| SNMP timeout and retries | ✓ | ✓ | ✓ |
| Mikrotik API port | ✓ | — | ✓ |
| Communities, login, password | — | ✓ | ✓ |
| Simultaneous requests to hardware | `.env` only | — | — |
| Response cache lifetime | `.env` only | — | — |

## Cache and "live" data

WildcoreDMS aims to show up-to-date hardware data, but to keep pages fast, hardware responses
are **cached**. Cached data is considered fresh for the time set by
`SWC_CACHE_ACTUALIZE_TIMEOUT_SEC`; after that it is requested from the hardware again.

On a device, port or ONU page the **"Device calling"** block shows where each kind of data came from:

- **from cache (time)** — cached data and when it was received;
- **Online** — data just received from the hardware.

To get fresh data click **"Refresh"** on the page — the request to the hardware may take 15–30
seconds, and longer for large OLTs.

!!! info
    Some data (charts, signal level history, analytics) comes from polling history rather than
    directly from the hardware, so the "Refresh" button doesn't change it. History is updated by
    the [poller](./poller.md) on schedule.

## Tuning a specific model or device

Behavior for specific hardware is changed with model or device **additional parameters**:
local PON port descriptions, the data set for the ONU list and card, Huawei serial number
format, automatic cable diagnostics, etc. — see
[Model and device custom parameters](../management/custom-parameters.md).

## Features and components { #components }

Hardware features are provided by [components](../components/index.md). If a component is disabled,
its pages, tabs and buttons are not shown.

| Feature | Component |
|---------|-----------|
| OLT page, ONU tree, ONU page, DHCP Snooping and blacklist on OLTs | [OLTs](../components/olts.md) `olts` |
| ONU and OLT port actions | [OLTs control](../components/olts_control.md) `olts_control` |
| ONU registration | [ONT registration](../components/onts-registration/getting-started.md) `onts_registration` |
| Switch and port page, cable/SFP diagnostics, DHCP Snooping on switches | [Switches](../components/switches.md) `switches` |
| Switch and port actions | [Switches control](../components/switches_control.md) `switches_control` |
| ARP, FDB, direct routes of L3 hardware | [Routers](../components/routers.md) `routers` |
| Mikrotik RouterOS | [Mikrotik RouterOS](../components/router_os.md) `router_os` |
| ICMP availability, ICMP devices | [Pinger](../components/pinger.md) `pinger` |
| Traffic, error, signal, resource charts | [Charts](../components/prometheus_wrapper.md) `prometheus_wrapper` |
| Live traffic | [Live traffic](../components/live_traffic.md) `live_traffic` |
| MAC address history | [FDB history](../components/fdb_history.md) `fdb_history` |
| Web console | [Web console](../components/console.md) `console` |
| Macros | [Macros](../components/macros/getting-started.md) `macros` |
| Config backups | [Config backups](../components/oxidized.md) `oxidized` |
| Instant reaction to SNMP traps | SNMP traps `trapservice` |
| Sensors | [Sensors](../components/sensors.md) `sensor_devices` |
| Subscriber diagnostics and search API for billing | [Diagnostic](../components/diagnostic.md) `diagnostic`, [Search devices](../components/search_device.md) `search_device` |

## Sections

| Page | What is described |
|------|-------------------|
| [Device list and device page](./device-page.md) | Finding devices, the left panel, common tabs and port/ONU cards |
| [Working with OLTs](./olt.md) | ONTs tree, physical interfaces, unregistered ONUs, PON port page |
| [ONU page](./onu.md) | Status, signal, UNI ports, FDB, counters, ONU actions |
| [Switches and L3 hardware](./switches.md) | Ports, VLANs, ARP/FDB/routes, port page, cable and SFP diagnostics |
| [Mikrotik RouterOS](./routeros.md) | Interfaces, DHCP, ARP, queues, BGP |
| [ICMP devices and Pinger](./icmp-devices.md) | Availability monitoring of any host |
| [DHCP Snooping](./dhcp-snooping.md) | MAC/IP/VLAN bindings on switches and OLTs |
| [ONU blacklist](./onu-blacklist.md) | Blocked ONUs on OLTs |
| [ONU signal level history](./onu-signal-history.md) | Signal min/max, resetting limits |
| [Hardware Poller](./poller.md) | Background data collection and intervals |
| [Sensors](../components/sensors.md) | Monitoring devices (temperature, power, etc.) |
