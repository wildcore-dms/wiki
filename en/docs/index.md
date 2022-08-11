# **WildcoreDMS** - monitoring, diagnostics and device management system.
![](./assets/main-logo.png)

### Our goal
Provide the installer / operator with a convenient tool for diagnosing the network, equipment and a specific subscriber,
thereby:

- Increase the speed of response to diagnosing and solving problems with the network;
- Save the engineer from the need to always "sit on the phone" and process requests from employees.


### System features
* Modularity - the ability to connect only the necessary components
* Work in docker
* Easy installation and update - using a special utility, installation and update is done in a few commands
* Easy system setup - after installation, you only need to add devices and users
* Advanced configuration of user roles, access to equipment and functionality - all in order to provide employees with only the necessary functionality
* Logging of user actions, work with equipment, work scheduler.
* Collection of metrics in Prometheus
* API - integrate wildcoreDMS with billing or other systems

### System components
* **autodiscovery** - Search and automatically add supported equipment on the network
* **bdcom_olts** - Work with OLT from BDcom
* **c_data_interfaces** - Working with OLT from C-Data
* **dlink_switches** - Working with switches from Dlink
* **edgecore_switches** - Working with switches from Edge-Core
* **events** - Events. Allows you to view and save the history of equipment/interfaces based on the created promQL rules
* **fdb_history** - stores FDB history and allows display by interface/ONU
* **huawei_olts** - Work with OLT from Huawei
* **huawei_switches** - Working with switches from Huawei
* **huawei_onts_registration** - ONUec registration on Huawei
* **notifications** - Allows you to send notifications via telegram/email on events and actions
* **pinger** - Monitors equipment via ICMP, displays current status in dashboard and device list.
* **prometheus_wrapper** - Works with the prometheus API. Allows you to display graphs in the web interface for traffic, signal levels, temperature, errors
* **router_os** - Work with routers from Mikrotik
* **switches** - a component that implements a standardized API for working with switches
* **vsolution_olts** - Working with OLT from V-Sol
* **zte_olts** - Work with OLT from ZTE
* **zte_unregistered_onts** - Registration of ONUs on ZTE

_All of the above components are provided with the system at the time of beta testing_

### Supported Hardware
* Dlink (switches)
* Edge-Core (switches)
* Huawei (switches, OLTs)
* BDcom (OLTs)
* C-data (OLTs)
* V-Solution (OLTs)
* ZTE (OLTs)
* Mikrotik (routers)

Full list of supported hardware by models - [https://github.com/meklis/switcher-core/blob/master/docs/DEVICES.md](https://github.com/meklis/switcher-core/blob/master /docs/DEVICES.md)
