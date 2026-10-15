# "Routers" component (routers)

!!! abstract "Overview"

    Working with L3 hardware (routers, L3 switches): ports, device-wide ARP and FDB tables, direct routes, VLANs, BGP sessions.

## What it provides

- "Ports", "ARPs", "FDB", "Direct routes", "VLANs" tabs — [L3 hardware](../system/switches.md#l3)
- "BGP sessions" tab and background BGP session monitoring (Juniper, Extreme) — [BGP sessions](../system/switches.md#bgp)
- The L3 device port page

## How it works

Data is retrieved over SNMP: ports, counters, ARP and FDB tables, direct routes, BGP peers. The [poller](../system/poller.md) collects ARP tables and BGP session state in the background — they are also used to find a subscriber by IP ([Search devices](./search_device.md)).

## Permissions

| Permission | What it allows |
|---|---|
| **Router info** | Viewing L3 hardware |

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control routers enable
```

## See also

- [Switches control](./switches_control.md) — port actions
- [Mikrotik RouterOS](./router_os.md)
