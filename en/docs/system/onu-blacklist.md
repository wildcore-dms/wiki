# ONU blacklist

!!! abstract "Overview"

    Starting with version **0.31** WildcoreDMS shows the **ONU blacklist** of an OLT — ONUs blocked
    by serial number or MAC address that can't register on the OLT. This helps understand why a new
    ONU "isn't visible" or doesn't register.

!!! info "Component"
    [OLTs](../components/olts.md) (`olts`).

## Where to view

### Tab on the OLT page

OLT page → **"ONU blacklist"** tab (the number of entries is shown on the tab).

Above the table you can see whether the **blacklist function is enabled** on the OLT. The table has:

| Column | Description |
|--------|-------------|
| **Ident** | Serial number (GPON) or MAC address (EPON) of the blocked ONU |
| **Mask** | Mask, if a range of addresses is blocked (depends on the model) |
| **Interfaces** | PON ports the block applies to; if the ONU is already registered — a link to it |

The table can be filtered and sorted.

### Dashboard widget

The **"ONU blacklist"** widget shows blacklist entries from all OLTs with a link to the hardware.
Add it to the [dashboard](../web-interface/dashboard-overview.md) by editing the dashboard.

## Data updates

The blacklist is read from OLTs **every 10 minutes on schedule** (scheduler task
`wca olts:get-onts-blacklist`, the interval can be changed in `Configuration > System configuration`
→ "Schedule" tab). The widget shows data of the last read; the tab on the OLT page can request
current data from the hardware.

## Supported hardware

| Vendor | Models | Identifier |
|--------|--------|------------|
| **C-Data** (EPON) | FD1204SN, FD1208S, FD1216S-R1 | MAC address |
| **C-Data** (GPON) | FD1601, FD1604, FD1608, FD1616 (FW 3) | Serial number |

## Permissions

Viewing requires the **"Info from OLTs"** permission.
