## What are components?
Components are special plug-ins for wildcoreDMS that allow you to expand the basic functionality of the system.
Components can be connected and disconnected to the system, depending on the need (at the time of beta testing, you get access to all components).

## What functionality the components bring
There are components that extend the supported hardware (eg C-Data or BDcom OLTs).
There are also components that implement work with Prometheus, which allows you to build graphs or get current metrics from it.
Or, using the Notifications component, you can configure sending events or user actions to Telegram or Email.
A complete list of components can be viewed on the following tabs.

## Manage components (via console)
**List of supported components - ```wca component:list```**
```shell
$ wca component:list
+--------------------------+---------------------------------------------------------------+---------+-----------+---------------+----------------+
| Key                      | Description                                                   | Enabled | Installed | Has installer | Has controller |
+--------------------------+---------------------------------------------------------------+---------+-----------+---------------+----------------+
| autodiscovery            | Scan networks and automatic add devices                       | Yes     | Yes       | Yes           | Yes            |
| bdcom_olts               | Working with BDcom OLTs                                       | Yes     | Yes       | Yes           | Yes            |
| c_data_interfaces        | Working with C-Data OLTs                                      | Yes     | Yes       | Yes           | Yes            |
| diagnostic               | Rest API interfaces for network diag                          | Yes     | Yes       | Yes           | Yes            |
| dlink_switches           | Working with D-Link switches                                  | Yes     | Yes       | Yes           | Yes            |
| edgecore_switches        | Working with Edge-Core switches                               | Yes     | Yes       | Yes           | No             |
| events                   | Realize events functional                                     | Yes     | Yes       | Yes           | Yes            |
| fdb_history              | Realize API for working with history DFB                      | Yes     | Yes       | Yes           | No             |
| huawei_olts              | Working with Huawei OLTs                                      | Yes     | Yes       | Yes           | Yes            |
| huawei_onts_registration | ONTs registration for Huawei OLTs                             | Yes     | Yes       | Yes           | Yes            |
| huawei_switches          | Working with Huawei switches                                  | Yes     | Yes       | Yes           | No             |
| notifications            | Sending notifications over Telegram/Email                     | Yes     | Yes       | Yes           | Yes            |
| pinger                   | ICMP pinger                                                   | Yes     | Yes       | Yes           | Yes            |
| prometheus_wrapper       | Prometheus integration(Working with Prometheus API)           | Yes     | Yes       | Yes           | Yes            |
| router_os                | Working with routerOS                                         | Yes     | Yes       | Yes           | Yes            |
| search_device            | Rest API interfaces for search devices over IP or MAC-address | Yes     | Yes       | Yes           | Yes            |
| switches                 | Rest API interfaces for working with L2 switches              | Yes     | Yes       | Yes           | Yes            |
| vsolution_olts           | Working with V-Sol OLTs                                       | Yes     | Yes       | Yes           | Yes            |
| zte_olts                 | Working with ZTE OLTs                                         | Yes     | Yes       | Yes           | Yes            |
| zte_unregistered_onts    | ONTs registration on ZTE OLTs                                 | Yes     | Yes       | Yes           | Yes            |
+--------------------------+---------------------------------------------------------------+---------+-----------+---------------+----------------+
```
**Component Management**

* ```wca component:control COMPONENT_NAME install``` - install component
* ```wca component:control COMPONENT_NAME enable``` - enable installed component
* ```wca component:control COMPONENT_NAME disable``` - disable installed component


## Components inside the system can
* Extend Rest API capabilities (add your own endpoints)
* Listen and respond to events in the system (event observers)
* Expand the list of console commands (command `wca`)
* Expand the list of rules for user roles
* Interact both with the system and with other components
* Perform migrations (change the structure of the database)
* Manage commands in the scheduler



