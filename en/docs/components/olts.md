# "OLTs" component (olts)

!!! abstract "Overview"

    The base component for working with OLTs: the OLT page, ONU tree, physical and PON ports, the ONU page, DHCP Snooping and the ONU blacklist. It provides **viewing** only — ONU and port actions come with the [OLTs control](./olts_control.md) component.

## What it provides

- The OLT page with the "ONTs tree", "Interfaces/cards", "DHCP Snooping", "ONU blacklist" tabs — [Working with OLTs](../system/olt.md)
- PON port, physical port and [ONU](../system/onu.md) pages
- [DHCP Snooping](../system/dhcp-snooping.md) and the [ONU blacklist](../system/onu-blacklist.md) (read on schedule — `wca olts:get-onts-blacklist`)
- Background ONU polling: statuses, signals, serial numbers, descriptions

## How it works

OLT data is retrieved over **SNMP**, and what's unavailable over SNMP (some ONU data, DHCP Snooping on some models) — via the **console** (Telnet/SSH). Credentials come from the device [access](../management/device-access.md).

In the **background** the [poller](../system/poller.md) collects from every OLT on schedule: system info and resources (CPU/RAM/temperature), interface list and state, ONU identifiers (serials/MACs), signal levels, traffic and error counters, the FDB table, PON port load, ONU vendor data. Intervals are set per model or device.

Collected data goes into the **cache** (pages open fast), the **metric history** (charts, analytics, [events](./events.md)) and the **state history** (uptime table, disconnect reasons).

When an ONU page is opened, part of the data (status, signal, UNI ports, FDB, configuration) is requested from the OLT **directly** or taken from the cache — the source is shown in the "Device calling" block. The "Refresh" button forces an OLT poll.

The `olts:get-onts-blacklist` scheduler task reads ONU blacklists from all OLTs every 10 minutes.

## Permissions

| Permission | What it allows |
|---|---|
| **Info from OLTs** | Viewing OLTs, ports and ONUs |

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control olts enable
```

## See also

- [OLTs control](./olts_control.md)
- [ONT registration](./onts-registration/getting-started.md)
- [ONU signal level history](../system/onu-signal-history.md)
