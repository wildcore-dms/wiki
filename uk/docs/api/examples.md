# Приклади


## Пошук інтерфейсу за параметрами
Повертається у вигляді масиву, може бути декілька результатів.
Параметри не є взаємовиключними (чим більше параметрів передається, тим більше може бути знайдених відповідностей).
Можливі параметри запиту:

* **device_id** - ідентифікатор пристрою в WildCore
* **device_ip** - IP-адреса пристрою
* **interface_name** - назва інтерфейсу. Наприклад - epon0/1:1, або 1/3
* **interface_bind_key** - унікальний ідентифікатор представника інтерфейсу на пристрої. Побудований на основі назви інтерфейсу та типу обладнання
* **ont_ident** - серійний номер або MAC-адрес ONU
* **mac_address** - MAC-адрес клієнта, отриманий з FDB
* **only_active_mac** - прапор (1|0) для пошуку за параметром mac_address. Якщо встановлено 1 - буде повернуто лише активні mac_address

Приклад запиту:
```shell linenums="1"
curl --location --request GET "http://${WILDCORE_SERVER}/api/v1/device-interface/search?device_id=${DEVICE_ID}&interface_name=${INTERFACE_NAME}" \     
--header "X-Auth-Key: ${AUTH_KEY}"      
```     

Приклад відповіді:
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

## Діагностика пристрою
Повернення діагностичної інформації з пристрою

### Приклад запиту:

```shell linenums="1"
curl --location --request GET "http://${WILDCORE_SERVER}/api/v1/component/diagnostic/interface/${INTERFACE_ID}/diag?from=${FROM}" \     
--header "X-Auth-Key: ${AUTH_KEY}"     
```     
* **FROM** Варіанти:
    * **device** - Завантажити з пристрою
    * **cache** - Завантажити з кешу (Якщо кеш не існує або вичерпаний - буде завантажено з пристрою)
    * **store** - Завантажити з кешу
* **INTERFACE_ID** - Ідентифікатор інтерфейсу, повернений в _interface.id_


[Докладні об’єкти відповідей див. тут](./objects/objects.md)

