# Core Functions


### Real-time Equipment Operation
This method of obtaining information is best suited for accurate and fast equipment diagnostics.

#### Displaying Equipment Information and Status
With the system, you can obtain real-time information about the equipment.

- For OLT
    - Availability via SNMP and ICMP
    - CPU/RAM/Temperature
    - Port list
    - MAC/SN of ONUs
    - ONU status
    - FDB table
    - Signal levels
    - List and status of Ethernet ports on ONUs
    - Causes of downtime
    - Traffic
    - Errors
- For Switch
    - Availability via SNMP and ICMP
    - CPU/RAM/Temperature
    - Port status
    - Errors
    - Traffic
    - FDB table
    - Cable diagnostics (DDM SFP module)


#### Equipment Management
For OLT, functions such as ONU reboot, ONU removal, ONU reset, ONU shutdown, and more are available.   
For some switch models, port management is also available.

_* Functionality may vary depending on the type of equipment, manufacturer, and model_

### Adapted for Mobile Devices and Tablets
The web interface of the system is built on the basis of [SPA](https://en.wikipedia.org/wiki/Single-page_application).    
The interface operates without page reload, representing a full-fledged web application.    
Thus, even with "slow" internet speed, the user can use the system.

### Works in Docker
We use [Docker](https://en.wikipedia.org/wiki/Docker).     
Thanks to Docker, you no longer have to install software of specific versions, deal with dependencies, and install necessary libraries.    
All you need to install the system is to download and run the [wca-tool](../wca-tool/index.md) utility.    
The utility will install Docker and other necessary software for running.

### Background Information Collection from Equipment
Background pollers collect information about FDB, port/ONU status, errors, traffic, and more.    
This data is used to obtain interface history, build graphs, and generate notifications.

### Flexible Access Rights Configuration for Users
Thanks to advanced access rights and roles configuration, you have the ability to restrict certain functionality for users.   
For example, you can prohibit a technician from mounting or managing PON ports or restarting equipment.    
Additionally, equipment is divided into groups, and there is an option to limit visibility of groups and equipment for a specific user.

### Events and Notifications
The use of [Prometheus](https://prometheus.io/) and [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) queries gives the flexibility to configure event generation. Out of the box, event generation is configured for device or interface failure, error growth, and poor signal.

Notifications can be configured via Email or Telegram. The system's notification feature ensures that a specific user receives only the notifications they need. For example, in case of equipment failure, notifications are received only by users with access to that equipment.

### Equipment Configuration Collection
The system uses a tool called [Oxidized](https://github.com/ytti/oxidized) for configuration collection.     
You can view the current equipment configuration without accessing it directly and also see the history of changes.    
      
If desired, you can store the configuration in Git.

### Registration of ONU for ZTE and Huawei
The system includes a component for ONU registration, allowing registration by filling out a simple form.      
Unregistered (new) ONUs are displayed in a widget on the main page and in the device dashboard.

Learn more about [ONU registration](../components/zte_unregistered_onts.md)



