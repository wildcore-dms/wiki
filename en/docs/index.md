# **WildcoreDMS** - monitoring, diagnostics and device management system.
![](./assets/main-logo.png)


!!! warning "We are not working with Russian Federation and Belarus"



### Our goal
Provide the installer / operator with a convenient tool for diagnosing the network, equipment and a specific subscriber,
thereby:

- Increase the speed of response to diagnosing and solving problems with the network;
- Save the engineer from the need to always "sit on the phone" and process requests from employees.


### System features
* Modularity - the ability to connect only the necessary components
* Work in docker
* Easy installation and updating - using a special utility, installation and updating is done in a few commands
* Easy system setup - after installation, you only need to add devices and users
* Role-Based Access Control (RBAC)
* Logging of user actions, work with equipment, work scheduler
* Collection of metrics in Prometheus
* API - integrate wildcoreDMS with billing or other systems

### System components
* **analytics** - Allow see current status and history of device, interfaces and ONTs
* **autodiscovery** - Search and automatically add supported equipment on the network
* **events** - Events. Allows you to view and save the history of equipment/interfaces based on the created promQL rules
* **fdb_history** - stores FDB history and allows display by interface/ONU
* **notifications** - Allows you to send notifications via telegram/email on events and actions
* **pinger** - Monitors equipment via ICMP, displays current status in dashboard and device list
* **pon_boxes** - Allows you to manage PON boxes
* **prometheus_wrapper** - Works with the prometheus API. Allows you to display graphs in the web interface for traffic, signal levels, temperature, errors
* **router_os** - Work with routers from Mikrotik
* **olts** - a component that implements a standardized API for working with olts
* **switches** - a component that implements a standardized API for working with switches 
* **olts_control** - a component realize simple ONT management(reboot, change description, disable/enable, reset, etc)
* **switches_control** - a component realize simple switch port management(disable/enable, description, etc)
* **zte_unregistered_onts** - Registration of ONUs on ZTE
* **huawei_onts_registration** - ONUec registration on Huawei
 
### Supported Hardware 
| Model key                   | Name                                | Type     |
|-----------------------------|-------------------------------------|----------|
| alcatel_general_switch      | Alcatel Switch                      | SWITCH   |
| applynet_sw812              | ApplyNet AN-SW812                   | SWITCH   |
| arista_default              | Arista                              | SWITCH   |
| ati_switch_8000             | Allied Telesis 8000 series switches | SWITCH   |
| bdcom_gp3600_series         | BDCOM GP3600 series                 | OLT      |
| bdcom_p3310                 | BDCOM P3310 series                  | OLT      |
| bdcom_p36xx_series          | BDCOM P36xx series                  | OLT      |
| c_data_fd1104sn             | C-Data FD1104SN                     | OLT      |
| c_data_fd1108s              | C-Data FD1108S                      | OLT      |
| c_data_fd1204sn             | C-Data FD1204SN                     | OLT      |
| c_data_fd1208s              | C-Data FD1208S                      | OLT      |
| c_data_fd1216s_r1           | C-Data FD1216S-R1                   | OLT      |
| c_data_fd1601               | C-Data FD1601                       | OLT      |
| c_data_fd1601_fw3           | C-Data FD1601 (FW 3)                | OLT      |
| c_data_fd1604               | C-Data FD1604                       | OLT      |
| c_data_fd1604_fw3           | C-Data FD1604 (FW 3)                | OLT      |
| c_data_fd1608               | C-Data FD1608                       | OLT      |
| c_data_fd1608_fw3           | C-Data FD1608 (FW 3)                | OLT      |
| c_data_fd1616               | C-Data FD1616                       | OLT      |
| c_data_fd1616_fw3           | C-Data FD1616 (FW 3)                | OLT      |
| c_data_fd5008_fd5016        | C-Data FD5008-FD5016                | ONU      |
| cisco_general_switch        | Cisco Switch (NX-OS)                | SWITCH   |
| cisco_general_switch_sg     | Cisco Switch                        | SWITCH   |
| dcn_default                 | DCN                                 | SWITCH   |
| dell_emc_networking_os      | Dell EMC Networking OS10            | ROUTER   |
| dell_general_switch         | Dell Powerconnect Switch            | SWITCH   |
| dell_networking_os          | Dell Networking OS                  | SWITCH   |
| dlink_general_switch        | D-link Switch                       | SWITCH   |
| edgecore_general_switch     | Edge-core General switch            | SWITCH   |
| eltex_general_switch        | Eltex switch                        | SWITCH   |
| equicom_ping3               | Ping3                               | SENSORS  |
| extreme_xos                 | ExtremeXOS                          | ROUTER   |
| gcom_el5610_series          | GCOM EPON series                    | OLT      |
| gcom_el5610_series_old      | GCOM EPON series (OLD)              | OLT      |
| hp_arubaos_switch           | HP Switch (ArubaOS)                 | SWITCH   |
| hp_general_switch           | HP Switch                           | SWITCH   |
| hp_j9626a_48                | HP J9626A 2620-48 Switch            | SWITCH   |
| hp_j9850a                   | HP J9850A Switch                    | SWITCH   |
| hp_procurve_j9021a_24       | HP ProCurve J9021A Switch 2810-24G  | SWITCH   |
| hp_procurve_j9079           | HP PROCURVE J9079A                  | SWITCH   |
| hp_procurve_j9085a_24       | HP ProCurve J9085A Switch 2610-24   | SWITCH   |
| hp_procurve_j9090a_48       | HP ProCurve J9020A Switch 2510-48   | SWITCH   |
| hpe_anw_jl675a              | HPE ANW JL675A 6100                 | SWITCH   |
| hpe_switch                  | HPE Switch                          | SWITCH   |
| huawei_general_switch       | Huawei general switch               | SWITCH   |
| huawei_quidway_S9300_series | Huawei Quidway S9300 series         | SWITCH   |
| huawei_s2320_28tp_ei        | Huawei S2320-28TP-EI                | SWITCH   |
| huawei_s2326tp_ei           | Huawei S2326TP-EI                   | SWITCH   |
| huawei_s2350_28tp           | Huawei S2350-28TP-EI-AC             | SWITCH   |
| huawei_smart_ax             | Huawei MA56xx/MA58xx series         | OLT      |
| juniper_jnp204_series       | Juniper JNP204 series               | ROUTER   |
| juniper_qfx51xx_series      | Juniper QFX5100 series              | SWITCH   |
| mikrotik_crs                | Mikrotik CRS                        | SWITCH   |
| mikrotik_router_os          | Mikrotik RouterOS                   | ROUTEROS |
| raisecom_default            | Raisecom Default                    | SWITCH   |
| raisecom_iscom              | Raisecom ISCOM                      | SWITCH   |
| raisecom_iscom_2600         | Raisecom ISCOM 2600                 | SWITCH   |
| raisecom_rax721             | Raisecom RAX721                     | SWITCH   |
| swos_default                | SwOS                                | SWITCH   |
| tplink_general_switch       | TP-Link Switch                      | SWITCH   |
| tplink_jetstream_switch     | TP-Link JetStream Switch            | SWITCH   |
| tplink_smart_switch         | TP-Link Smart Switch                | SWITCH   |
| ubnt_edge_switch            | UBNT EdgeSwitch                     | SWITCH   |
| v_solution_v1600            | V-Solution OLT V1600 series         | OLT      |
| zte_c300                    | ZTE C300 (FW 2.1)                   | OLT      |
| zte_c300_fw_1_2             | ZTE C300 (FW 1.2)                   | OLT      |
| zte_c320                    | ZTE C320 (FW 2.1)                   | OLT      |
| zte_c320_fw_1_2             | ZTE C320 (FW 1.2)                   | OLT      |
| zte_c600_fw_12              | ZTE 600 (FW 1.2)                    | OLT      |
| zte_c610_fw_12              | ZTE 610 (FW 1.2)                    | OLT      |
| zte_zxpon_olt_series        | ZTE C600 series                     | OLT      |


!!! tip
    [Here](https://htmlpreview.github.io/?https://raw.githubusercontent.com/meklis/switcher-core/master/docs/device_info.html) you can find the full list of supported hardware by models.
