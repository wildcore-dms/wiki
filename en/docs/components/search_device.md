# "Search devices" component (search_device)

!!! abstract "Overview"

    API to find where a subscriber is in the network: by MAC address (in hardware FDB tables and history) or by IP (via router ARP with switch port lookup by FDB). Used by billing and external systems.

## How it works

**MAC search**: the MAC is looked up in hardware FDB tables (real-time query) and/or [FDB history](./fdb_history.md) — sources are set by `SEARCH_DEVICE_SOURCES`. Trunk ports can be ignored to get the actual subscriber port.

**IP search**: the IP is looked up in router ARP tables; the `search-ip-with-fdb` variant also finds the MAC in switch FDB and returns the port the subscriber is connected to.

The search can be limited to a list of devices; otherwise all devices are queried in parallel (`SEARCH_DEVICE_REQUEST_CONCURRENCY`).

## API methods

| Method | Description |
|---|---|
| `GET /api/v1/component/search_device/search-mac` | MAC search in device FDB and/or FDB history |
| `GET /api/v1/component/search_device/search-ip` | IP search in router ARP tables |
| `GET /api/v1/component/search_device/search-ip-with-fdb` | IP search via ARP with switch port lookup by FDB |

## Settings

Sources, concurrency, ignoring trunk ports — the `SEARCH_DEVICE_*` parameters in [System configuration](../installation-and-updating/env-configuration.md#web).

## Permissions

| Permission | What it allows |
|---|---|
| **Search by MAC** | search-mac |
| **Search by IP** | search-ip |
| **ARP search via FDB (port search)** | search-ip-with-fdb |

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control search_device enable
```

## See also

- [FDB history](./fdb_history.md)
- [API](../api/index.md)
