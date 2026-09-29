# Import and export devices

!!! abstract "Overview"

    The `wca device:import` and `wca device:export` commands add devices in bulk from CSV and
    export the device list into the same format. Useful for initial population, moving devices
    between installations and backing up the hardware list.

## CSV format

One line — one device, fields separated by a comma (or another separator, see the `-s` option):

```
<IP>,<Login>,<Password>,<Public community>,<Private community>,<Name>,<Model key>
```

| Field | Required | Description |
|-------|:--------:|-------------|
| **IP** | yes | Device IP address |
| **Login** | yes* | Console login (Telnet/SSH) |
| **Password** | yes* | Console password |
| **Public community** | yes* | SNMP read community |
| **Private community** | yes* | SNMP write community |
| **Name** | no | Device name. Empty — the IP is used |
| **Model key** | no | WildcoreDMS model key (the "Key" column in `Device management > Device models` or `wca device-model:list`) |

\* The field must be present in the line but may be empty (e.g. when console access isn't needed):
`192.0.2.20,,,public,,Switch-20`.

Example file (placeholder data):

```csv
192.0.2.10,admin,<password>,public,private,OLT-Central,
192.0.2.11,admin,<password>,public,private,,
192.0.2.20,,,public,,Switch-20,dlink_des_3200_28_a1
```

!!! warning "Format limitations"
    - **No header line** — the first line is treated as a device too.
    - Escaping and quotes are not supported: values can't contain the separator. If passwords or
      names contain commas, use another separator, e.g. `;` or `|` (the `-s` option).
    - Empty lines are skipped.

---

## Import: `wca device:import`

```shell
wca device:import [<file>] [-g <group_id>] [-s <separator>] [-v]
```

| Argument / option | Description | Default |
|-------------------|-------------|---------|
| `<file>` | CSV path **inside the container**. Omitted or `-` — read from standard input (`|`) | `-` |
| `-g`, `--group-id` | ID of the [group](../management/device-groups.md) to add new devices to | `-1` |
| `-s`, `--separator` | Field separator | `,` |
| `-v` | Show import progress | — |

### How import works

1. **Accesses.** For each unique login/password/community combination an existing
   [access](../management/device-access.md) with the same data is looked up. If there is none, a
   new one named `<public community> (sync from import - xxxxxx)` is created.
2. **Existing devices are skipped.** If a device with this IP already exists (including disabled
   ones), the line is ignored. Import **doesn't update** existing devices.
3. **Model.**
    - if the model key is set, the device is added with this model **without** contacting the hardware;
    - otherwise WildcoreDMS polls the device over SNMP, detects the model and fills in MAC and
      serial number. Unreachable and unsupported devices are **not added** (with an error message).
4. The device is added to the group from the `-g` option.

### Option 1. Via standard input (`|`) — recommended

No need to copy the file into the container — the CSV is passed to the command directly:

```shell
cat devices.csv | sudo docker exec -i wca wca device:import -g 3 -v
# or
sudo docker exec -i wca wca device:import -g 3 -v < devices.csv
```

You can also pass the output of another command or script, e.g. a selection from billing:

```shell
./export-from-billing.sh | sudo docker exec -i wca wca device:import -g 3 -s ';' -v
```

!!! warning "Use `docker exec -i`"
    The regular `wca` command runs with a terminal (`docker exec -it`) and doesn't accept data via
    `|` — you get `the input device is not a TTY`. To pass data use
    `sudo docker exec -i wca wca ...` or the `/opt/wildcore-dms/bin/wca-no-pty.sh` script.

### Option 2. From a file

The `/opt/wildcore-dms` directory on the server is available in the container as `/www`. Put the
file into `/opt/wildcore-dms/var/tmp/` and pass the path inside the container:

```shell
sudo cp devices.csv /opt/wildcore-dms/var/tmp/
sudo wca device:import /www/var/tmp/devices.csv -g 3 -v
```

!!! tip
    After the import check the result in `Device management > Devices` and delete the file with
    passwords: `sudo rm /opt/wildcore-dms/var/tmp/devices.csv`.

---

## Export: `wca device:export` { #export }

Exports devices into CSV of **the same format** as import — the file can be imported into another
installation right away.

```shell
wca device:export [-f <file name>] [-g <group_id>] [-s <separator>] [--include-disabled]
```

| Option | Description | Default |
|--------|-------------|---------|
| `-f`, `--file` | Save to `/opt/wildcore-dms/var/tmp/<name>` (name only, no path). Omitted — print to standard output | — |
| `-g`, `--group-id` | Export only devices of the group | all |
| `-s`, `--separator` | Field separator | `,` |
| `--include-disabled` | Export disabled devices too | disabled are not exported |

Each line contains the IP, the device's access credentials, the name and the model key. If a value
contains the separator or a line break, it's replaced with a space (with a warning) so the file
imports correctly.

### Examples

Save to a file on the server:

```shell
sudo wca device:export -f devices.csv
# file: /opt/wildcore-dms/var/tmp/devices.csv
```

Print to standard output and redirect to a file (use `docker exec -i` so that service messages
don't end up in the CSV):

```shell
sudo docker exec -i wca wca device:export -g 3 > olts.csv
```

Move devices from one installation to another in one line:

```shell
ssh old-server "sudo docker exec -i wca wca device:export" | sudo docker exec -i wca wca device:import -v
```

!!! danger "The file contains passwords"
    The export contains logins, passwords and SNMP communities **in plain text** (even if credential
    encryption is enabled). Keep the file in a safe place and delete it after use.

## Permissions

Commands run on the server as root and don't depend on web interface user roles.
