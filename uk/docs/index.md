# **WildcoreDMS** - система моніторингу, діагностики та управління обладнанням
![](./assets/main-logo.png)

### Наша мета
Надати монтажнику/оператору зручний інструмент для діагностики мережі, обладнання та конкретного абонента,
тим самим:

- Підвищення швидкості реагування на діагностику та вирішення проблем з мережею;
- Позбавте інженера від необхідності постійно «сидіти на телефоні» і обробляти запити співробітників.


### Особливості системи
* Модульність - можливість підключення тільки необхідних компонентів, розширення функцій за допомогою компонентів
* Робота в докері
* Просте встановлення та оновлення - за допомогою спеціальної утиліти встановлення та оновлення виконується кількома командами
* Просте налаштування системи - після встановлення вам потрібно лише додати пристрої та користувачів
* Контроль доступу на основі ролей (RBAC)
* Логування дій користувача, роботи з обладнанням, планувальник роботи
* Колекція метрик у Prometheus
* API - інтеграція wildcoreDMS з білінговими або іншими системами

### Системні компоненти
* **Аналітика** - дозволяє переглядати поточний стан і історію пристроїв, інтерфейсів і ONT
* **Автовиявлення** - Пошук і автоматичне додавання підтримуваного обладнання в мережі
* **Події** - Події. Дозволяє переглядати та зберігати історію обладнання/інтерфейсів на основі створених правил promQL
* **FDB-історія** - зберігає історію FDB і дозволяє відображати інтерфейс/ONU
* **ICMP-пінгер** - Відстежує обладнання через ICMP, відображає поточний стан на інформаційній панелі та в списку пристроїв
* **PON-бокси** - дозволяє керувати PON-скриньками
* **API prometheus** - працює з API prometheus. Дозволяє відображати у веб-інтерфейсі графіки трафіку, рівнів сигналу, температури, помилок
* **RouterOS** - Робота з роутерами від Mikrotik
* **ОЛТи** - компонент, що реалізує стандартизований API для роботи з olts
* **Комутатори** - компонент, який реалізує стандартизований API для роботи з комутаторами
* **Контроль комутаторів** - компонент, який реалізує просте управління ONT (перезавантаження, зміна опису, вимкнення/увімкнення, скидання тощо)
* **Контроль світчів** - компонент, який реалізує просте керування портом комутатора (вимкнення/увімкнення, опис тощо)

_Усі перераховані вище компоненти надаються разом із системою під час бета-тестування_

### Підтримуване обладнання   

| Ключ обладнання             | Ім'я                                | Тип      |
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
 

Повний список підтримуваного обладнання та функціоналу - [тут](https://htmlpreview.github.io/?https://raw.githubusercontent.com/meklis/switcher-core/master/docs/device_info.html)
