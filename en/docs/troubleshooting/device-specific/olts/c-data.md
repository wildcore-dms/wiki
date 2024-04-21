!!! abstract "Overview"
    This page provides various error cases and a solution for them for the C-Data OLT devices.

    Feel free to use the right side menu to jump to the section, that you're interested in.

## C-Data FD16xx
| Problem | Description | Solution |
| ------- | ----------- | -------- |
| Unable to create backup using telnet. | This model has a pagination related bug. | Use SSH instead of telnet. |

| Known Quirks | Description | Solution |
| ------------ | ----------- | -------- |
| Unable to create duplicate ONU names. | It is impossible and a `genError` will be thrown. | N/A |
| Device doesn't return some system data (serial number, firmware version, MAC-address etc.) | A known firmware quirk in version 3. | N/A |