# Import Devices from a CSV File

## Description

The `wca device:import` command allows you to import devices into Wildcore from a CSV file.  
It is a convenient tool for quickly adding a large number of devices.

During the import, each device is checked for availability. Its model is also identified based on the **`model_key`** in Wildcore.
!!! warning "Devices that are unsupported or currently unavailable will be ignored"

!!! warning "If `model_key` is specified in the CSV file, the device will be added without attempting to automatically determine the model or check availability"
Access credentials may be automatically created for devices during the import if they are not already found in the Wildcore system.

## CSV File Format

The file must contain data in the following format:
```
<IP>,<Login>,<Password>,<Public community>,<Private community>,<Name|can be empty>,<wildcore model key (not required)>
```   


* **IP** - The IP address of the device.
* **Login** - Login for access.
* **Password** - Password for access.
* **Public community** - SNMP `public community` value.
* **Private community** - SNMP `private community` value.
* **Name** - Device name (can be empty).
* **wildcore model key** - Wildcore device model key (optional).

## Console Command `device:import`

**Description:**  
Imports devices from a CSV file.

**Usage:**  
`wca device:import [options] [--] <path>`

**Arguments:**

* **`<path>`** - Path to the file.

**Options:**

* ` -g, --group-id[=GROUP-ID]` - ID of the group to add new devices to. Default: `"-1"`.
* ` -s, --separator[=SEPARATOR]` - Field separator in the CSV file. Default: `","`.
* ` -h, --help` - Display help for the command.
* ` -q, --quiet` - Do not output any messages.
* ` -V, --version` - Display the application version.
* ` -n, --no-interaction` - Do not ask interactive questions.
* ` -v|vv|vvv, --verbose` - Increase verbosity of messages.

---

## Step-by-Step Instructions

!!! warning "Due to the system running in Docker, you must first copy the prepared file into the container before executing the import command"

1. Prepare the `devices.csv` file according to the format described above.

2. Copy the file into the Docker container:
    ```bash
    sudo docker cp ./devices.csv wca:/tmp/devices.csv
    ```

3. Run the import command:
    ```bash
    wca -v device:import -g-1 /tmp/devices.csv
    ```
    * **`-v`**: Enables verbose output to see progress.
    * **`-g-1`**: Specifies the group ID where the devices will be added. The value `-1` means the devices will be added to the group with ID -1 (this group exists by default). You can replace it with the ID of the desired group.
    * **`/tmp/devices.csv`**: Path to the file inside the container.
