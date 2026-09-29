# "Mikrotik RouterOS" component (router_os)

!!! abstract "Overview"

    Working with Mikrotik routers via the RouterOS API: interfaces, address lists, ARP, DHCP servers and leases, simple queues, BGP sessions.

## What it provides

- A dedicated RouterOS device page — [Mikrotik RouterOS](../system/routeros.md)
- Polling of interface traffic and BGP sessions

## How it works

Data is retrieved via the **RouterOS API** (port 8728 by default) with the login and password from the device access. Tabs query the router when opened; interface traffic and BGP sessions are collected by the [poller](../system/poller.md) in the background for charts and events.

## Permissions

| Permission | What it allows |
|---|---|
| **Get router OS info** | Viewing RouterOS data |

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control router_os enable
```

## See also

- [API port setup](../system/routeros.md#connection)
