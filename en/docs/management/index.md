# Management: overview

!!! abstract "Overview"

    The **Device management** and **Users management** menu sections are where an administrator
    describes the network for WildcoreDMS (how to connect to hardware, which devices to poll,
    how to group them) and who can do what in the system.

| Menu | Page | Purpose |
|------|------|---------|
| Device management → **Accesses** | [Device accesses](./device-access.md) | SNMP communities, console login/password, ports and timeouts |
| Device management → **Devices** | [Devices](./devices.md) | adding, editing and disabling hardware |
| Device management → **Groups** | [Device groups](./device-groups.md) | grouping devices and limiting what users see |
| Device management → **Device models** | [Device models](./device-models.md) | pollers and additional parameters for all devices of a model |
| Users management → **Users** | [Users](./users.md) | accounts, role, device groups, status |
| Users management → **Roles** | [Roles and permissions](./roles.md) | permission sets assigned to users |

## Initial setup order

1. Create an **access** with the SNMP communities and console credentials of your hardware.
2. Create device **groups** (e.g. by district or hardware type).
3. Add **devices**: IP, access, group — WildcoreDMS detects the model itself.
4. Create **roles** (e.g. "Operator", "Installer") with the required permissions.
5. Create **users**, assign them a role and device groups.

!!! info "Who sees these sections"
    Menu items are shown only to users with the corresponding permissions: "Device management",
    "Device access control", "Device groups management" and "All Users management".
    See [Roles and permissions](./roles.md).
