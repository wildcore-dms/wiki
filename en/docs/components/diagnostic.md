# "Diagnostic" component (diagnostic)

!!! abstract "Overview"

    API for diagnostics from external systems (billing, CRM): subscriber port/ONU diagnostics, ARP ping, ICMP ping, traceroute. Used by [billing integrations](./mikbill_integration.md) so an operator sees the subscriber state without opening WildcoreDMS.

## How it works

An external system (billing) calls the API with a WildcoreDMS user's [API key](../web-interface/api-key-generation.md) and passes the subscriber's interface ID (usually stored in the billing after synchronization).

WildcoreDMS detects the hardware type and runs the relevant queries: for a switch port — link state, errors, MAC addresses, cable diagnostics; for an ONU — status, signal, disconnect reason, MAC addresses, etc.

The result is returned as JSON or as a ready **HTML card** the billing embeds into the subscriber card. Links to the interface page in WildcoreDMS are also available.

## API methods

| Method | Description |
|---|---|
| `GET /api/v1/component/diagnostic/interface/{id}/diag` | Interface diagnostics (JSON): state, signal, errors, MAC — depending on the hardware type |
| `GET /api/v1/component/diagnostic/interface/{id}/diag/html` | The same as an HTML card for embedding into billing |
| `GET /api/v1/component/diagnostic/interface/{id}/links` | Links to the interface pages in the WildcoreDMS web interface |
| `GET /api/v1/component/diagnostic/arp-ping` | ARP ping of an IP address from a router |

## Permissions

| Permission | What it allows |
|---|---|
| **ARP ping** | ARP ping |
| **ICMP ping** | ICMP ping |
| **Traceroute** | Traceroute |
| **Interface diagnostic for billings** | Interface diagnostics |

!!! note
    For billing access create a separate user with the required role and an [API key](../web-interface/api-key-generation.md). Full method reference — [API](../api/index.md).

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control diagnostic enable
```

## See also

- [MikBill](./mikbill_integration.md)
- [NoDeny Plus](./nodeny_plus.md)
