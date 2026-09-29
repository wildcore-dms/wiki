# "Pinger" component (pinger)

!!! abstract "Overview"

    Constant ICMP availability checks of devices: status, availability percentage, outage log.

## What it provides

- The "Pinger" tab on every device page — [ICMP devices and Pinger](../system/icmp-devices.md#pinger)
- Availability status in the device list, on the map and in the dashboard widget
- ICMP devices — monitoring any host without SNMP

## How it works

Checks are done by a separate service (the `wca-icmp-pinger` container): it gets the list of enabled devices from WildcoreDMS, pings them constantly and sends results back.

WildcoreDMS stores the current status of each device and the **outage log** (when it went down, when it came back, duration), from which availability for 1/7/30 days is calculated.

Statuses are exported to metrics — they drive the "device unavailable" [events](./events.md) and notifications, the status in the device list, on the map and in the dashboard widget.

The ping result is also used before accessing hardware: an unavailable device is marked unavailable immediately, without waiting for an SNMP timeout.

## Permissions

| Permission | What it allows |
|---|---|
| **Show device info** | Viewing status and log |

## Console commands

- `wca pinger:update-exporter-statuses` — refresh statuses (runs automatically)

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control pinger enable
```

## See also

- [Events](./events.md) — unavailability notifications
