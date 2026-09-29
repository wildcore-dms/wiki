# "Live traffic" component (live_traffic)

!!! abstract "Overview"

    Shows port or ONU traffic in real time — the chart updates every few seconds. Handy to check whether a subscriber has traffic right now or what the uplink load is.

## What it provides

- The **live chart** icon next to traffic on port, PON port, [ONU](../system/onu.md) pages and in the [OLT](../system/olt.md) "Interfaces/cards" tab

## How it works

While the chart is open, WildcoreDMS reads interface counters directly from the hardware (SNMP) every few seconds and calculates in/out traffic rate. Data is not stored — use [Charts](./prometheus_wrapper.md) for history.

For an ONU the traffic towards the subscriber and from it (towards the OLT) is shown.

## Permissions

| Permission | What it allows |
|---|---|
| **See live traffic info** | Viewing real-time traffic |

## Console commands

- `wca live_traffic:view <ip> <interface> [-i 5s]` — traffic in the console

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control live_traffic enable
```

## See also

- [Charts](./prometheus_wrapper.md) — traffic history
