# Model and device custom parameters

!!! abstract "Overview"

    The **"Additional parameters"** block in the [model](./device-models.md) and
    [device](./devices.md) card is a JSON with parameters that change WildcoreDMS behavior for
    specific hardware: credentials and connection parameters, which data to load, serial number
    format, configuration backups, etc.

## Where they are set and what takes precedence

- **Model** (`Device management > Device models` → model → "Additional parameters") — parameters
  apply to all devices of the model. Some models already have default parameters.
- **Device** (`Device management > Devices` → device → "Additional parameters") — parameters
  apply to this device only and **take precedence** over the model's.

For connection parameters the order is (each level overrides the previous one):

```
system-wide settings → access → model → device
```

!!! info "How to edit"
    The JSON editor has two modes: **Tree** and **Code**. To enter parameters manually switch to
    **Code** in the editor toolbar, paste the JSON and save the card. Several parameters go into
    one object:

    ```json
    {
      "load_snooping_info": true,
      "enable_auto_cable_diag": true
    }
    ```

    Don't remove parameters that are not described here: some are filled in by the system
    (e.g. poller and integration settings).

## Parameter list

| Parameter | Where | Hardware | Purpose |
|-----------|-------|----------|---------|
| [`access`](#access) | model, device | all | Own credentials instead of the access |
| [`sw_core_connection`](#sw_core_connection) | model, device | all | Ports, console protocol, timeouts, SNMP version |
| [`disable_save_description_on_physical_ifaces`](#disable_save_description_on_physical_ifaces) | model, device | OLT | Local PON port descriptions |
| [`load_snooping_info`](#load_snooping_info) | model, device | OLT | Load DHCP Snooping in ONU information |
| [`modules_loading`](#modules_loading) | model, device | OLT | Which data to load in the ONU list and ONU card |
| [`show_optical_info_from_history`](#show_optical_info_from_history) | model | OLT | Signal levels in the ONU list from history instead of the hardware |
| [`optical_load_only`](#optical_load_only) | model | OLT | Which optical values to request for the ONU list |
| [`sn_as_ascii`](#sn_as_ascii) | model, device | Huawei OLT | ONU serial number format |
| [`epon_description_block_index`](#epon_description_block_index) | model, device | ZTE OLT (EPON) | Which part of an EPON ONU description to show |
| [`enable_auto_cable_diag`](#enable_auto_cable_diag) | model, device | switches | Automatic cable diagnostics when opening a port |
| [`oxidized`](#oxidized) | model, device | all | Configuration backup settings |
| [`disabled_modules`](#disabled_modules) | device | monitoring devices | Disable individual sensors/modules |

---

## Credentials and connection

### `access` { #access }

Credentials overriding the values of the [access](./device-access.md). Handy when a single model
or device has a different password and you don't want a separate access.

```json
{
  "access": {
    "login": "admin",
    "password": "secret",
    "public_community": "public",
    "private_community": "private"
  }
}
```

Only the needed fields can be set — the rest come from the access.

### `sw_core_connection` { #sw_core_connection }

Hardware connection parameters. The same values can be set for an
[access](./device-access.md#connection) in the UI, and here — for a model or a single device.

```json
{
  "sw_core_connection": {
    "console_connection_type": "ssh",
    "console_port": 2222,
    "console_timeout_sec": 120,
    "console_wait_byte_sec": 10,
    "snmp_version": "2c",
    "snmp_port": 161,
    "snmp_timeout_sec": 5,
    "snmp_repeats": 3,
    "mikrotik_api_port": 8728
  }
}
```

| Key | Description |
|-----|-------------|
| `console_connection_type` | `telnet` or `ssh` |
| `console_port` | Console port |
| `console_timeout_sec` | Maximum execution time of a console command, sec |
| `console_wait_byte_sec` | How long to wait for more console output before treating it as complete, sec (10 by default). Increase for hardware that "pauses" in the middle of output |
| `snmp_version` | `1` or `2c` |
| `snmp_port` | SNMP port |
| `snmp_timeout_sec` | Timeout of a single SNMP request, sec |
| `snmp_repeats` | Number of SNMP request retries |
| `mikrotik_api_port` | API port for Mikrotik RouterOS |

Set only the keys you need to change.

---

## OLT

### `disable_save_description_on_physical_ifaces` { #disable_save_description_on_physical_ifaces }

Disables saving and syncing **PON port** descriptions from the hardware — port descriptions can
be kept locally in WildcoreDMS. ONU descriptions are still synced.

```json
{ "disable_save_description_on_physical_ifaces": true }
```

### `load_snooping_info` { #load_snooping_info }

Enables loading the **DHCP Snooping** table in ONU information. Disabled by default: on some
models bindings are matched to ONUs through the FDB table, which can noticeably slow down
opening the ONU card.

```json
{ "load_snooping_info": true }
```

### `modules_loading` { #modules_loading }

Limits the data loaded for the **ONU list** (`ont_list`) and the **ONU card** (`ont_info`).
Helps speed up work with large or slow OLTs: only the listed data is loaded, the rest is skipped.

```json
{
  "modules_loading": {
    "ont_list": ["pon_onts_status", "pon_onts_serial", "interface_descriptions"],
    "ont_info": ["pon_onts_status", "pon_onts_optical", "pon_onts_vendor", "fdb"]
  }
}
```

You can set only one of the sections — the other works as usual (all data supported by the
model is loaded).

| Value | `ont_list` | `ont_info` | What is loaded |
|-------|:----------:|:----------:|----------------|
| `pon_onts_status` | ✓ | ✓ | ONU status |
| `pon_onts_serial` | ✓ | ✓ | Serial number (GPON) |
| `pon_onts_mac_addr` | ✓ | ✓ | MAC address (EPON) |
| `interface_descriptions` | ✓ | ✓ | Description |
| `pon_onts_optical` | ✓ | ✓ | Signal levels |
| `sfp_optical` | ✓ | | PON port SFP optics |
| `pon_onts_vendor` | | ✓ | ONU vendor, model, versions |
| `pon_onts_reasons` | | ✓ | Disconnect reasons |
| `pon_onts_down_history` | | ✓ | Disconnect history |
| `pon_onts_configuration` | | ✓ | ONU configuration |
| `interface_counters` | | ✓ | Traffic/error counters |
| `fdb` | | ✓ | MAC table behind the ONU |
| `onu_ip_host` | | ✓ | ONU IP address |
| `uni_interfaces_status` | | ✓ | ONU Ethernet port state |
| `uni_interfaces_vlans` | | ✓ | VLANs on ONU ports |
| `snooping_info` | | ✓ | DHCP Snooping (also requires [`load_snooping_info`](#load_snooping_info)) |

!!! warning
    The value must be an object with lists. A format error (e.g. a string instead of a list)
    causes an error when loading the ONU list/card.

### `show_optical_info_from_history` { #show_optical_info_from_history }

Set **on the model**. When enabled, signal levels in the ONU list are taken from polling history
instead of being requested from the hardware every time — the list opens faster.
Enabled by default for most OLT models.

```json
{ "show_optical_info_from_history": false }
```

### `optical_load_only` { #optical_load_only }

Set **on the model** and works only when `show_optical_info_from_history` is disabled.
Comma-separated list of optical values requested from the hardware for the ONU list.
Default — `rx,temp,distance`.

```json
{ "optical_load_only": "rx,olt_rx,temp,distance" }
```

Available values: `rx`, `tx`, `olt_rx`, `temp`, `voltage`, `distance` (depends on the model).

### `sn_as_ascii` { #sn_as_ascii }

**Huawei OLT.** Show ONU serial numbers (in the ONU list and among unregistered ONUs) as text
`HWTC1234ABCD` instead of hex `48575443...`.

```json
{ "sn_as_ascii": true }
```

### `epon_description_block_index` { #epon_description_block_index }

**ZTE OLT, EPON ONU.** If an ONU description consists of several parts separated by `$$`
(e.g. `contract$$address$$phone`), this parameter sets the number of the part to show
(numbering starts from `0`). By default the last part is shown.

```json
{ "epon_description_block_index": 1 }
```

---

## Switches

### `enable_auto_cable_diag` { #enable_auto_cable_diag }

Automatically run cable diagnostics when opening port information (for models that support it).
Disabled by default: diagnostics take extra time and on some hardware may briefly drop the link
on the port.

```json
{ "enable_auto_cable_diag": true }
```

---

## Configuration backups

### `oxidized` { #oxidized }

Requires the [Config backups](../components/oxidized.md) component. Supported models already have
settings defined by the system; this parameter overrides them or configures backups for a model
that isn't in the list.

```json
{
  "oxidized": {
    "model": "ios",
    "enable": false,
    "remove_secret": false
  }
}
```

| Key | Description |
|-----|-------------|
| `model` | Oxidized model name (`ios`, `nxos`, `routeros`, `junos`, `bdcom`, ...) — see the [Oxidized model list](https://github.com/ytti/oxidized/blob/master/docs/Supported-OS-Types.md) |
| `enable` | Enter privileged mode (`enable`) before fetching the configuration |
| `remove_secret` | Strip passwords and keys from the configuration |

Backups for a device are turned on with the **"Enable oxidized backups"** switch in the device card.

---

## Monitoring devices

### `disabled_modules` { #disabled_modules }

List of [monitoring device](../components/sensors.md) modules that should not be polled — e.g.
when a sensor isn't connected and the device returns an error.

```json
{ "disabled_modules": ["<module name>"] }
```

Module names of a specific device are shown by `wca switcher-core:modules <device IP>`.

---

## Service parameters

These parameters are filled in by the system through the UI or integrations — no need to edit
them manually:

| Parameter | Managed by |
|-----------|------------|
| `poller_config` | The "Poller configuration" block in the model/device card |
| `oxidized_enabled` | The "Enable oxidized backups" switch |
| `sensors` | Sensor settings on the monitoring device page |
| `userside` | Userside integration |
