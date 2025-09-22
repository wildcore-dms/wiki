???+ note "0.29"
    **🚀New components**

    - **📸[QR Code Generator](./components/qr-code-generator.md)** - generate and print a QR label for your devices/interfaces with a direct link to it's dashboard;

??? note "0.28"

    **🚀New components** 
    
    - **📸[Attachments](./components/attachments.md)** - upload media associated with a device in it's management panel.

    **📄Documentation**

    - Revised [proxy configuration](./web-interface/use-proxy.md#proxy-settings) to facilitate compatibility with the new components.

??? note "0.27 (08.2025)"

    **Key changes** 🔑

    - Added support for a web console to work with equipment – [description](./components/console.md);
    - Refactored switch interface cards – separated FDB and signal levels;
    - Added display of ARP and Direct Routes for L3-type devices.

    [More...](./changelogs/0.27.md)

??? note "0.26 (08.2025)"
**Key Changes** 🔑

    ⚙️ **Hardware Handling**

    - 🛠️ Extended diagnostics: Introduced SFP module diagnostics and system temperature monitoring for more devices.

    💻 **Backend & API**

    - 🚀 New functionality: Added device import from CSV and integration with Userside.

    🖥️ **Frontend (Web Panel)**

     - ✨ Added SFP information display, improved filters, enhanced stability, and more user-friendly event names instead of technical keys.
     - 🎨 Usability: Improved table and filter display for more comfortable work

    [More...](./changelogs/0.26.md)

??? note "0.25 (01.2025)"
**Key Changes** 🔑

    1. 🌐 **Autotopology:** Automatically determines and records connections between devices using LLDP and FDB.
    2. 📈 **Interface Speed Collection:** Adds real-time data for link/port utilization analysis.
    3. 🛡️ **Access Encryption:** Introduced encryption for device access (includes instructions).
    4. 🗺️ **New "Topology" Page:** Visualize network connections as a tree structure.
    5. 🖼️ **Dashboard Improvements:** Updated grid (12 → 24 columns) and added dynamic resizing for widgets.

    [More...](./changelogs/0.25.md)

??? note "0.24 (07.2024)" - 📜 Added history of interface status changes - 🔄 Implemented trap capture (currently only collects link/status changes of ONU across all switches and BDcom GP36xx) - 📊 Added export to Excel for selections from analytics and interfaces - 📅 Added date of last link status change - 🚫 Removed support for old ONU registration components (huawei_onts_registration/zte_onts_registration)

    [More...](./changelogs/0.24.md)

??? note "0.23 (05.2024)"
**New Features**

    - Added support for two-factor authentication via Google Authenticator. Detailed instructions are available [here](https://wiki.wildcore.tools/en/web-interface/user-settings-overview/).
    - Now you can set equipment/ONT coordinates using user geolocation.
    - Analytics now displays error growth on ports.
    - Added daily growth statistics on the interface card with graphical representation.
    - Added protection against brute force attacks, which will be enabled by default. Also created an action named `security:auth_attempts` for configuring notification sending.
    - Added a new component `onts_registration` for universal ONT registration (ZTE, Huawei, C-Data, BDcom).
    - Now you can filter values in the list in macro parameters.

    [More...](./changelogs/0.23.md)

??? note "0.22 (03.2024)"
**New features**

    - Added new device types - ICMP device. You can use them to set a ping (for example, a subscriber, or power control), without working with it
    - Added the "Pinger" tab in switches, which displays crash logs and current status information
    - Added pon-port signatures in the ONU tree
    - Added EPON support to Huawei MA56xx/MA58xx
    - Added display of ONU firmware version on C-Data FD16xx
    - Added new map sources - Google Streets and Google Hybrid
    - Mikbill sync users, added detect and update ONT coordinates
    - Added an option in the settings to select the source of maps (by default - Google streets)
    - Added the ability to disable FDB collection for a specific interface/ONU (in this case, the FDB history will be cleared)

    [More...](./changelogs/0.22.md)

??? note "0.21 (02.2024)"
**Added components**

    - [macros](./components/macros/getting-started.md) - allow extend functionally of system (beta-test, will be a paid feature in future)

    **New fearures**

    - Integrated PWA support
    - Added page for PON-port
    - Optimized loading speed ONU/interface
    - Allow to see and change physical port description on OLTs
    - Added OLT RX signal on C-Data FD16xx
    - Added detailed ONU status in system and prometheus (-2 - LOS/-1 - PowerOff/0 - Offline/1 - Online)

    **Changes**

    - Optimized UI for mobile

    [More...](./changelogs/0.21.md)

??? note "0.20 (12.2023)"
**New Features**

    - New Prometheus Metrics
    - Ability to Receive Internal System Events - see examples in `/opt/wildcore-dms/examples`
    - For ZTE EPON, added the ability to choose a description from the $$ block - parameter `"epon_description_block_index": 1`, allowing you to change the block for display between '$$' (options - 1 or 2)
    - Analytics: Duplicate MAC Addresses
    - Analytics: Duplicate ONUs
    - Analytics: ONU Signal Levels + Widget
    - Ability to Separate Interface Statistics in terms of Physical Port/ONU, a new parameter appeared in user settings
    - System settings now include a table with detailed statistics by interface type in the system
    - Map: added ONU display
    - Map: added link display with the ability to edit link paths
    - Clearing counters and switch reboot (Huawei/Edgecore)
    - Changing the description of ONUs on C-Data FD12xx/FD16xx
    - Added a block with information about equipment access issues
    - Display of traffic and errors on physical ports (C-Data/ZTE/BDcom)

    [More...](./changelogs/0.20.md)

??? note "0.19 (11.2023)"
**Added Components**

    - [sensors](./components/sensors.md) - Device configuration backup
    - [mikbill_integration](./components/mikbill_integration.md) - Integration with MikBill billing

    **New Features**

    - New device type - SENSORS
    - Added support for devices:
        - Huawei MA58xx OLT (GPON only)
        - ZTE C6xx OLT (GPON only, works correctly with firmware versions - 1.2.2+)
        - Mikrotik CRS switches (RouterOS firmware)
        - Raisecom ISCOM switches
        - Ping3
    - In the ONU registration component, the ability to divide the template into blocks has been added, more details here - [ONT Registration](./components/onts-registration/getting-started.md)
    - Integration with MikBill billing
    - Before accessing the equipment, it checks if the device is reachable via ICMP (can be disabled in settings)

      **Changes**

      - Components related to integrations with others are now disabled by default
      - The wca-tool utility now restarts containers with API and scheduler after installation/update
      - Updated road runner to version 2023.3.0

      **Fixed Bugs**

      - Reloading the tab on devices when accessed with the ?from=device parameter
      - Updating the page for a new device when searching for ONUs on the same device
      - Displaying a list of all devices in the system on the logs page and more
      - Background collection of FDB from C-Data FD12xx devices

    [More...](./changelogs/0.19.md)

??? note "0.18 (10.2023)" \* **Added Components** - [oxidized](./components/oxidized.md) - Configuration backup for the device - [nodeny_plus](./components/nodeny_plus.md) - Integration with Nodeny Plus billing

    * **New Features**
        - Selected (favorite) interfaces (events are also created for selected interfaces)
        - Tagged interfaces
        - [Description of API methods](./api/examples.md) for integration into your systems
        - Ability to restrict login from specific IPs for a user
        - Physical ports on OLTs (ZTE/Huawei/C-Data)
        - Map with devices and their software state via ICMP
        - System information in the configuration
        - Saving physical ports (OLTs) in Prometheus (for notifications)
        - Ability to reset the administrator password with the command `wca user:reset-admin-password` to the default - admin
        - Ability to reset IP restrictions for a user with `wca user:reset-ip-strict <LOGIN>`
        - Added the ability to change the port description on Huawei, Edgecore, Alcatel, Eltex switches (works through snmpset, ifAlias)


    [More...](./changelogs/0.18.md)

??? note "0.17 (05.2023)" - Integrated new switcher-core (version 3.0) - New system configuration page - Added changing device title in breadcrumbs(ip or name) in user configuration - Adding components olts/olts_control

    [More...](./changelogs/0.17.md)
