# "Switches control" component (switches_control)

!!! abstract "Overview"

    Adds **switch and L3 hardware actions**: reboot, save configuration, clear counters, change port description, state and speed, VLAN control on ports.

## What it provides

- "Reboot device", "Clear counters", "Save config on device" buttons — [Switches](../system/switches.md#device-actions)
- "Edit port" (admin state, speed) and description editing on the port page
- The "VLANs" tab with VLAN control on ports

## How it works

Commands are executed on the hardware over SNMP (writing with the RW community from the [access](../management/device-access.md)) or via the console — depending on the model. For SNMP actions the access must have an **RW community**.

Reboot and port state changes ask for confirmation; after an action the port data is refreshed from the hardware.

All actions are written to the **action log** — `Logs > Actions`.

Changes are not saved to the switch configuration automatically — use the "Save config on device" button.

## Permissions

| Permission | What it allows |
|---|---|
| **Allow reboot device** | Reboot |
| **Allow save config** | Writing configuration |
| **Allow clear counters** | Clearing counters |
| **Allow set description** | Port description |
| **Allow set admin state** | Enabling/disabling a port |
| **Allow set admin speed** | Speed/duplex |
| **VLAN control** | The "VLANs" tab |

!!! note
    Component permissions are **not granted** by default — give them to the required [roles](../management/roles.md).

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control switches_control enable
```

## See also

- [Switches](./switches.md)
- [Macros](./macros/getting-started.md)
