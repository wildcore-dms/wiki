# Examples


## Search interface by parameters 
Returning as array, may be several results.
Parameters are not exclusive (the more parameters passed, the more matches there can be founded).
Possible query parameters:

* **device_id** - device id in wildcore
* **device_ip** - device IP address
* **interface_name** - name of interface. For example - epon0/1:1, or 1/3
* **interface_bind_key** - a representative unique ID of an interface on a device. built based on interface name and hardware type
* **ont_ident** - serial number or MAC-address of ONU
* **mac_address** - client mac address, received from FDB
* **only_active_mac** - flag (1|0) for searching by parameter mac_address. If setted 1 - will be returned only by active mac_address

Example of request:
```shell
curl --location --request GET "http://${WILDCORE_SERVER}/api/v1/device-interface/search?device_id=${DEVICE_ID}&interface_name=${INTERFACE_NAME}" \
--header "X-Auth-Key: ${AUTH_KEY}" 
```

Example of response: 
```json
{
    "statusCode": 200,
    "meta": null,
    "data": [
        {
            "created_at": "2023-09-20 15:11:08",
            "updated_at": "2023-09-21 15:59:56",
            "device": {
                "ip": "10.1.0.6",
                "location": "Kyiv",
                "name": "sw-ak",
                "description": "",
                "model": {
                    "name": "D-Link DES-1228/ME",
                    "key": "dlink_des_1228_me",
                    "params": [],
                    "vendor": "D-Link",
                    "model": "DES-1228/ME",
                    "type": "SWITCH",
                    "controller": "\\WCC\\Switches\\Controllers\\SwitchesController",
                    "pollers": {
                        "system": 300,
                        "counters": 120,
                        "fdb_table": 600,
                        "sys_resources": 120,
                        "interfaces_list": 1800,
                        "interfaces_status": 120
                    },
                    "icon": "/upload/icons/des-1228-me.jpg",
                    "id": 24
                },
                "access": {
                    "params": {
                        "sw_core_connection": {
                            "snmp_port": 161,
                            "console_port": 22,
                            "snmp_repeats": 3,
                            "snmp_version": "2c",
                            "snmp_timeout_sec": 4,
                            "mikrotik_api_port": 55055,
                            "console_timeout_sec": 300,
                            "console_connection_type": "ssh"
                        }
                    },
                    "name": "",
                    "id": 6
                },
                "params": null,
                "updated_at": "2023-09-22 00:43:07",
                "created_at": "2023-09-20 15:10:49",
                "mac": "FC:75:16:00:00:00",
                "serial": "",
                "group": {
                    "created_at": "2023-05-10 12:17:00",
                    "name": "All",
                    "description": "",
                    "id": 5
                },
                "pollers": null,
                "coordinates": null,
                "enabled": true,
                "id": 495
            },
            "bind_key": "13",
            "name": "1/13",
            "type": "FE",
            "params": {
                "billing": {
                    "nodeny_plus": {
                        "id": 1161,
                        "link": "http://127.0.0.1/cgi-bin/stat.pl/cgi-bin/stat.pl?a=user&uid=1161",
                        "name": "",
                        "state": "on"
                    }
                }
            },
            "billing_link": "http://127.0.0.1/cgi-bin/stat.pl/cgi-bin/stat.pl?a=user&uid=1161",
            "ip": "",
            "agreement": "11619",
            "description": "",
            "status": "Up",
            "poll_enabled": true,
            "parent_bind_key": "",
            "coordinates": null,
            "comment": "",
            "id": 96252
        }
    ]
}
```

## Device diagnostic 
Returning diagnostic information from device 

### Example of request:   
```shell
curl --location --request GET "http://${WILDCORE_SERVER}/api/v1/component/diagnostic/interface/${INTERFACE_ID}/diag?from=${FROM}" \
--header "X-Auth-Key: ${AUTH_KEY}"
```
* **FROM** - Variants: 
    * **device** - Load from device
    * **cache** - Load from cache (If cache not exist or expired - will loading from device)
    * **store** - Load from cache
* **INTERFACE_ID** - ID of interface, returned in _interface.id_

[See detailed objects here](./objects/objects.md)

### Response (success): 
```shell
{
    "statusCode": 200,
    "meta": null,
    "data": {
        "iface": {
            "created_at": "2023-09-23 10:38:51",
            "updated_at": "2023-09-23 19:40:28",
            "device": {
                "ip": "10.2.0.2",
                "location": "promenada [50.38859049769197, 30.370818125614132]",
                "name": "EasyPath Series PON Switch Access",
                "description": "",
                "model": {
                    "name": "C-Data FD1204SN",
                    "key": "c_data_fd1204sn",
                    "params": {
                        "show_optical_info_from_history": true
                    },
                    "vendor": "C-Data",
                    "model": "FD1204SN",
                    "type": "OLT",
                    "controller": "\\WCC\\Olts\\Controllers\\Controller",
                    "pollers": {
                        "system": 300,
                        "counters": 180,
                        "fdb_table": 900,
                        "ont_ident": 600,
                        "sys_resources": 180,
                        "interfaces_list": 300,
                        "optical_strength": 1800,
                        "pon_port_loading": 300,
                        "interfaces_status": 180
                    },
                    "icon": "/upload/icons/fd1204sn.jpeg",
                    "id": 14
                },
                "access": {
                    "params": {
                        "sw_core_connection": {
                            "snmp_port": 161,
                            "console_port": 23,
                            "snmp_repeats": 3,
                            "snmp_timeout_sec": 4,
                            "mikrotik_api_port": 55055,
                            "console_timeout_sec": 300,
                            "console_connection_type": "telnet"
                        }
                    },
                    "name": "Golden",
                    "id": 2
                },
                "params": {
                    "oxidized": {
                        "model": "cdatafd12",
                        "enable": true,
                        "timeout": 300,
                        "remove_secret": false
                    },
                    "oxidized_enabled": true
                },
                "updated_at": "2023-09-22 00:44:16",
                "created_at": "2023-09-18 23:44:38",
                "mac": "E0:67:B3:7B:03:36",
                "serial": "AF2704-2206000077",
                "group": {
                    "created_at": "2023-05-10 12:17:00",
                    "name": "Giga",
                    "description": "",
                    "id": 5
                },
                "pollers": null,
                "coordinates": null,
                "enabled": true,
                "id": 494
            },
            "bind_key": "16779524",
            "name": "pon0/0/3:4",
            "type": "ONU",
            "params": [],
            "billing_link": "",
            "ip": "",
            "agreement": "",
            "description": "",
            "status": "Down",
            "poll_enabled": true,
            "parent_bind_key": "16779520",
            "coordinates": null,
            "comment": "",
            "id": 96295
        },
        "diagnostic": {
            "data": {
                "interface": {
                    "name": "pon0/0/3:4",
                    "parent": 16779520,
                    "id": 16779524,
                    "xid": 9,
                    "type": "ONU",
                    "onu_num": 4,
                    "uni": null
                },
                "vendor": {
                    "model": null,
                    "vendor": null,
                    "ver_hardware": null,
                    "ver_software": null,
                    "versions": null,
                    "omcc_version": null,
                    "model_id": null
                },
                "status": {
                    "_onu_disabled": null,
                    "online": "Offline",
                    "bind": null,
                    "admin": "Enabled",
                    "_conf_status": null
                },
                "uni": [],
                "description": null,
                "name": null,
                "fdb": [],
                "ident": {
                    "value": "80:F7:A6:1C:E8:21",
                    "type": "MAC"
                },
                "reasons": {
                    "history_table": null,
                    "last_reg": null,
                    "last_reg_since": null,
                    "last_dereg": null,
                    "last_change": null,
                    "last_dereg_since": null,
                    "last_down_reason": null
                },
                "counters": {
                    "in_errors": null,
                    "out_errors": null,
                    "in_discards": null,
                    "out_discards": null,
                    "in_octets": null,
                    "out_octets": null,
                    "in_multicast_pkts": null,
                    "out_multicast_pkts": null,
                    "in_broadcast_pkts": null,
                    "out_broadcast_pkts": null
                },
                "optical": {
                    "olt_rx": null,
                    "olt_tx": null,
                    "rx": null,
                    "tx": null,
                    "voltage": null,
                    "temp": null,
                    "distance": 0
                },
                "configuration": null,
                "profiles": null
            },
            "meta": {
                "system": {
                    "time": "2023-09-26 00:48:22",
                    "source": "cache",
                    "from_cache": true,
                    "hash": "494:system:SUCCESS:97d170e1550eee4afc0af065b78cda302a97674c",
                    "error": null,
                    "device_ip": "10.2.0.2"
                },
                "pon_onts_status": {
                    "time": "2023-09-26 00:47:18",
                    "source": "cache",
                    "from_cache": true,
                    "hash": "494:pon_onts_status:SUCCESS:0dbe81371bb0248e0f8d1becb8ae368377aa8e13",
                    "error": null,
                    "device_ip": "10.2.0.2"
                },
                "fdb": {
                    "time": "2023-09-26 00:47:18",
                    "source": "cache",
                    "from_cache": true,
                    "hash": "494:fdb:SUCCESS:0dbe81371bb0248e0f8d1becb8ae368377aa8e13",
                    "error": null,
                    "device_ip": "10.2.0.2"
                },
                "pon_onts_optical": {
                    "time": "2023-09-26 00:47:18",
                    "source": "cache",
                    "from_cache": true,
                    "hash": "494:pon_onts_optical:SUCCESS:0dbe81371bb0248e0f8d1becb8ae368377aa8e13",
                    "error": null,
                    "device_ip": "10.2.0.2"
                },
                "pon_onts_mac_addr": {
                    "time": "2023-09-26 00:47:18",
                    "source": "cache",
                    "from_cache": true,
                    "hash": "494:pon_onts_mac_addr:SUCCESS:0dbe81371bb0248e0f8d1becb8ae368377aa8e13",
                    "error": null,
                    "device_ip": "10.2.0.2"
                }
            }
        },
        "device_status": {
            "data": {
                "descr": "EasyPath Ethernet-PON",
                "uptime": "24d 13h 33min 3sec",
                "uptime_sec": "2122383",
                "contact": "asusgrin@gmail.com",
                "name": "EasyPath Series PON Switch Access",
                "location": "promenada [50.38859049769197, 30.370818125614132]",
                "mac_addr": "E0:67:B3:7B:03:36",
                "vendor_name": "C-Data",
                "serial_num": "AF2704-2206000077",
                "board_software_ver": "V1.6.0_230223",
                "board_hardware_ver": "V1.0",
                "meta": {
                    "key": "c_data_fd1204sn",
                    "name": "C-Data FD1204SN",
                    "detect": {
                        "description": "EasyPath Ethernet-PON",
                        "objid": "^.1.3.6.1.4.1.17409$",
                        "ifacesCount": 10
                    },
                    "ports": 0,
                    "extra": {
                        "pon_port_size": 64,
                        "console_conn_type": "cdata",
                        "console_commands_after_connect": [
                            "enable",
                            "config",
                            "vty output show-all"
                        ],
                        "interfaces": [
                            {
                                "name": "ge0/0/1",
                                "id": 16777472,
                                "xid": 1,
                                "type": "1G-SFP"
                            },
                            {
                                "name": "ge0/0/2",
                                "id": 16777728,
                                "xid": 2,
                                "type": "1G-SFP"
                            },
                            {
                                "name": "ge0/0/3",
                                "id": 16777984,
                                "xid": 3,
                                "type": "1G-SFP"
                            },
                            {
                                "name": "ge0/0/4",
                                "id": 16778240,
                                "xid": 4,
                                "type": "1G-SFP"
                            },
                            {
                                "name": "xge0/0/1",
                                "id": 16778240,
                                "xid": 5,
                                "type": "10G-SFP"
                            },
                            {
                                "name": "xge0/0/2",
                                "id": 16778752,
                                "xid": 6,
                                "type": "10G-SFP"
                            },
                            {
                                "name": "pon0/0/1",
                                "id": 16779008,
                                "xid": 7,
                                "type": "PON",
                                "pontype": "epon"
                            },
                            {
                                "name": "pon0/0/2",
                                "id": 16779264,
                                "xid": 8,
                                "type": "PON",
                                "pontype": "epon"
                            },
                            {
                                "name": "pon0/0/3",
                                "id": 16779520,
                                "xid": 9,
                                "type": "PON",
                                "pontype": "epon"
                            },
                            {
                                "name": "pon0/0/4",
                                "id": 16779776,
                                "xid": 10,
                                "type": "PON",
                                "pontype": "epon"
                            }
                        ]
                    },
                    "modules": [
                        "system",
                        "pon_ports_list",
                        "pon_count_registered_onts",
                        "pon_onts_status",
                        "pon_onts_mac_addr",
                        "pon_onts_optical",
                        "pon_onts_reasons",
                        "pon_onts_vendor",
                        "uni_interfaces_status",
                        "fdb",
                        "interface_counters",
                        "save_config",
                        "ctrl_ont_reboot",
                        "ctrl_ont_reset",
                        "ctrl_ont_delete",
                        "ctrl_ont_clear_counters",
                        "parse_interface",
                        "sys_resources",
                        "interface_descriptions"
                    ]
                }
            },
            "error": null
        }
    }
}
```

## Get information from Switches 
Please, go to postman for search more information - **Private/Components/Switches**   

