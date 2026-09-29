# Mikrotik RouterOS

!!! abstract "Overview"

    For Mikrotik routers running RouterOS WildcoreDMS works through the **RouterOS API** and shows a
    dedicated page with interfaces, address lists, ARP, DHCP, queues and BGP sessions. Mikrotik
    CRS/SwOS switches work as [regular switches](./switches.md).

!!! info "Component"
    [Mikrotik RouterOS](../components/router_os.md) (`router_os`).

## Connection { #connection }

- RouterOS API access is required: the `api` service is enabled on the router and allowed from the
  WildcoreDMS server address.
- Login and password are taken from the device [access](../management/device-access.md).
- The default API port is `8728`. To change it: for the whole system — `SWC_MIKROTIK_API_PORT` in
  [System configuration](../installation-and-updating/env-configuration.md#swc), for a model or a
  device — the `mikrotik_api_port` key in [additional parameters](../management/custom-parameters.md#sw_core_connection).

## Tabs

| Tab | What it shows |
|-----|---------------|
| **Interfaces** | Name, type, status (up/down/disabled), last link-up time, link-down count, traffic and counters |
| **Address list** | Firewall address lists: list name, address, dynamic/disabled flag, creation time |
| **ARPs** | IP, MAC, interface (VLAN), status, comment |
| **Leases** | DHCP leases: IP, MAC, hostname, DHCP server, status, lease time and expiration, last seen |
| **DHCP servers** | Servers: name, interface, address pool, lease time |
| **Simple queues** | Simple queues: name, target (IP), limit-at, max-limit, type, dynamic/disabled |
| **BGP sessions** | Name, local and remote address, remote AS, status, uptime |

Data is refreshed with the tab's refresh button. Interface traffic history is collected by the
[poller](./poller.md).

!!! info "Permissions"
    Viewing requires the **"Get router OS info"** permission.
