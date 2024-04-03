!!! abstract "Overview"
    This page provides various error cases and a solution for them for the Huawei OLT devices.

    Feel free to use the right side menu to jump to the section, that you're interested in.

## Huawei (MA56xx/MA58xx), GPON
| Problem | Description | Solution |
| ------- | ----------- | -------- |
| Serial numbers are in HEX. | This is by default. | Add `"sn_as_ascii": true` in Device Management - Models - Your_Device_Model - Additional parameters. Change the Tree display option to Code to be able to manually type this option. |