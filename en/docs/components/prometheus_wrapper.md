# "Charts" component (prometheus_wrapper)

!!! abstract "Overview"

    Builds charts from metric history: port and ONU traffic and errors, optical signal levels, optics temperature and voltage, CPU/RAM load, device temperature.

## What it provides

- Chart icons next to traffic, errors, signal, CPU/RAM on device, port and [ONU](../system/onu.md) pages
- Choosing the chart period and interval

## How it works

The [poller](../system/poller.md) writes values (traffic, errors, signal, resources) to the Prometheus metric storage bundled with WildcoreDMS.

When a chart is opened, the component requests data for the chosen period and interval and draws the chart. For traffic the rate (bit/s) per interval is calculated.

The same metrics are used for [analytics](../features/main.md#analytics) and [event](./events.md) rules.

## Permissions

| Permission | What it allows |
|---|---|
| **Charts** | Viewing charts |

!!! note
    History depth is set by `PROMETHEUS_RETENTION_TIME` (30 days by default) — [System configuration](../installation-and-updating/env-configuration.md). If a chart looks "torn", increase the interval.

## Console commands

- `wca prometheus_wrapper:last-values <ip> <metrics>` — last metric values in the console

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control prometheus_wrapper enable
```

## See also

- [Poller](../system/poller.md)
- [Live traffic](./live_traffic.md)
