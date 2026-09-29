# "FDB history" component (fdb_history)

!!! abstract "Overview"

    Stores the history of MAC tables (FDB): on which port or ONU and when each MAC address was seen. Helps find where a subscriber was connected before or track equipment moves.

## What it provides

- The **"FDB history"** card on port and [ONU](../system/onu.md) pages — [Port or ONU page](../system/device-page.md#interface)
- MAC search in history (global search, API)
- The **"Save FDB to history"** setting per interface ("Storage info" card)

## How it works

The [poller](../system/poller.md) periodically reads FDB tables from switches and OLTs (the `fdb_table` polling interval is set per model/device).

For each MAC address the interface, VLAN, first and last seen time are stored. While the MAC is present on the port the record is marked "active now"; when it disappears, the last seen time is recorded.

Saving can be disabled per interface ("Storage info" card → "Save FDB to history") — the history of this interface is cleared.

## Permissions

| Permission | What it allows |
|---|---|
| **Show history by interface** | Viewing history on a port/ONU |
| **Search in FDB history** | MAC search across the whole history |

!!! note
    Turn off FDB saving for uplinks and trunk ports — they carry thousands of MAC addresses that give no useful information.

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control fdb_history enable
```

## See also

- [Search devices](./search_device.md)
- [Poller](../system/poller.md) — FDB polling interval
