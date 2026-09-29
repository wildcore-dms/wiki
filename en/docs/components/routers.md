# "Routers" component (routers)

!!! abstract "Overview"

    Working with L3 hardware (routers, L3 switches): ports, device-wide ARP and FDB tables, direct routes, VLANs.

## What it provides

- "Ports", "ARPs", "FDB", "Direct routes", "VLANs" tabs — [L3 hardware](../system/switches.md#l3)
- The L3 device port page

## How it works

Data is retrieved over SNMP: ports, counters, ARP and FDB tables, direct routes. The [poller](../system/poller.md) collects ARP tables in the background — they are also used to find a subscriber by IP ([Search devices](./search_device.md)).

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
