# DHCP Snooping

!!! abstract "Overview"

    Starting with version **0.31** WildcoreDMS shows the **DHCP Snooping** binding table from
    switches and OLTs: which IP address was issued to which subscriber MAC address, in which VLAN,
    on which port/ONU and how long the lease remains. This helps quickly find a subscriber by IP or
    check whether their equipment gets an address.

!!! info "Components"
    On OLTs — [OLTs](../components/olts.md) (`olts`), on switches — [Switches](../components/switches.md) (`switches`).

## Where to view

| Place | What is shown |
|-------|---------------|
| Switch page → **DHCP Snooping** tab | All bindings of the device |
| OLT page → **DHCP Snooping** tab | All OLT bindings matched to specific ONUs |
| Switch port page → **DHCP Snooping** card | Bindings on this port |
| ONU page → **DHCP Snooping** card | Bindings behind this ONU |

The tab and cards are shown only for models that support this feature.

![DHCP Snooping on an OLT](../assets/features/olt-snooping.png)

The table contains the **Interface** (port or ONU — linked to its page), **MAC address**, **IP**,
**VLAN ID** and remaining **lease time**. Columns can be filtered and sorted. The refresh button on
the tab requests fresh data from the hardware.

### ONU card

![DHCP Snooping on the ONU page](../assets/features/onu-snooping.png)

On the ONU page data is requested with the **"Get info"** button (or **"Refresh info"** if data is
already there): on some models bindings are matched to ONUs through the FDB table, which may take
a few seconds.

To load the table automatically together with the rest of ONU information, enable the
[`load_snooping_info`](../management/custom-parameters.md#load_snooping_info) parameter for the
device or model.

!!! tip
    You can hide the card for yourself in `Account settings` → **Interface cards visibility**.

## Supported hardware

| Vendor | Models | Notes |
|--------|--------|-------|
| **ZTE** | C600, C610 (FW 1.2), C6xx series | Bindings per ONU |
| **BDcom** | P3310B/C/D, P3608B, P3612-2TE, P3616-2TE, P36xx series, GP3600-04/08/16, GP3600 series | Data over SNMP, console fallback if the firmware doesn't support it. Precise ONU matching |
| **C-Data** | FD1104SN, FD1108S, FD1204SN, FD1208S, FD1216S-R1, FD1601/1604/1608/1616 (incl. FW 3), FD1700S (FW 3) | ONU matching (by ONU number or via FDB) |
| **V-Solution** | V1600D8, V1600D16, V1600 series | |
| **D-Link** | DES-3200 (10/18/28 — A1 and C1; 26/C1; 28F/C1; 52/C1), DES-3026, DES-3028/3028G, DES-1228/ME, DGS-3000-10TC/20L/26TC, DGS-3100-24TG, DGS-3120-24SC/A2, DGS-3420-26SC/28SC | The DHCP relay mode is shown too. DGS-1100/1210 (ME), DES-3526 and DES-3200-26/A1 are not supported |
| **Raisecom** | ISCOM, ISCOM 2600 | |
| **Alcatel** | Alcatel switches | |

## Permissions

Viewing is available to users with hardware information permissions
(**"Info from switches"** / **"Info from OLTs"**) — see [Roles and permissions](../management/roles.md).
