# "OLTs control" component (olts_control)

!!! abstract "Overview"

    Adds **ONU and OLT port actions**: reboot, disable, delete, reset ONU, change description, UNI port and physical port control. Works together with the [OLTs](./olts.md) component.

## What it provides

- Action buttons on the [ONU page](../system/onu.md#actions): "Reboot ONT", "Delete", "Reset", "Disable/Enable ONT"
- ONU and PON port description editing
- ONU UNI port admin state switch
- "Configure port" and "Reset port" in the [OLT](../system/olt.md) "Interfaces/cards" tab

## How it works

Each action is executed as a command on the OLT — over SNMP or via the console, depending on the model. If the model doesn't support an action, the button isn't shown.

Dangerous actions (reboot, delete, reset, disable) ask for confirmation.

After execution the ONU/port data is refreshed from the hardware, and the action is written to the **action log** (who, when, what) — `Logs > Actions`.

Buttons and switches are visible only to users with the corresponding permission — e.g. an installer can be allowed to reboot ONUs but not delete them.

## Permissions

| Permission | What it allows |
|---|---|
| **Allow dereg ONT** | Deleting ONUs |
| **Allow reboot ONT** | Reboot |
| **Allow clear ONT counters** | Clearing counters |
| **Allow reset ONT** | Resetting ONUs |
| **Allow disable/enable ONT** | Disabling/enabling ONUs |
| **Allow change ONT description** | Changing descriptions |
| **Allow control PON/physical ports** | Configuring and resetting physical/PON ports |
| **Control UNI ports on ONU** | Enabling/disabling ONU ports |

!!! note
    Component permissions are **not granted** by default — give them to the required [roles](../management/roles.md).

## Enabling

The component is enabled in `Configuration > System configuration` → "Components" tab or with:

```shell
sudo wca component:control olts_control enable
```

## See also

- [ONU page](../system/onu.md)
- [Macros](./macros/getting-started.md) — for actions not covered by the component
