# "Switches" component (switches)

!!! abstract "Overview"

    The base component for L2 switches: the switch page with the port table, VLANs, FDB, errors, cable and SFP diagnostics, the port page, DHCP Snooping. It provides **viewing** only — port actions come with [Switches control](./switches_control.md).

## What it provides

- The switch page — "Ports", "DHCP Snooping" tabs — [Switches](../system/switches.md)
- The port page: link info, cable diagnostics, SFP, LACP, FDB
- Background polling: port state, counters, errors, FDB, resources

## How it works

Switch data is retrieved over **SNMP** (for some models and modules — via the console).

In the **background** the [poller](../system/poller.md) collects: system info and resources, port list and state, traffic and error counters, the FDB table, SFP optics. Charts, port state history, [FDB history](./fdb_history.md) and [events](./events.md) (port down, growing errors) are built on this.

The port table on the switch page comes from the cache, the "Refresh" button queries the hardware. Cable diagnostics run only with the "Check" button (or automatically if [`enable_auto_cable_diag`](../management/custom-parameters.md#enable_auto_cable_diag) is enabled).

If the device supports SNMP traps and sends them to WildcoreDMS, a port state change is registered immediately, without waiting for the next poll.

## Permissions

| Permission | What it allows |
|---|---|
| **Info from switches** | Viewing switches and ports |

## Console commands

- `wca switches:counters <ip>`, `wca switches:errors <ip>`, `wca switches:rmon <ip>` — port statistics in the console

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control switches enable
```

## See also

- [Switches control](./switches_control.md)
- [FDB history](./fdb_history.md)
