## Что такое компоненты? 
Компоненты - это специальные плагины к wildcoreDMS, которые позволяют расширить базовый функционал системы.    
Компоненты можно подключать и отключать к системе, в зависимости от необходимости(на момент бета-тестирования вы получаете доступ ко всем компонентам).      

## Какой функционал привносят компоненты
Есть компоненты, которые расширяют поддерживаемое оборудование(например ОЛТы C-Data или BDcom).       
Так же есть компоненты, которые реализовывают работу с Prometheus, что позволяет строить графики или получить текущие метрики с него.      
Или же, с помощью компонента Notifications - можно настроить отправку событий или действий пользователя в Telegram или Email.    
Полный список компонентов можно посмотреть на следующих вкладках.    

## Управление компонентами (через консоль)
**Список поддерживаемых компонентов - ```wca component:list```**
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
**Управление компонентами**

* ```wca component:control COMPONENT_NAME install``` - установить компонент
* ```wca component:control COMPONENT_NAME enable``` - включить установленный компонент
* ```wca component:control COMPONENT_NAME disable``` - отключить установленный компонент


## Компоненты, внутри системы могут  
* Расширять возможности Rest API (добавлять свои endpoint)
* Cлушать и реагировать на события в системе (event observers)   
* Расширять список консольных команд (команда `wca`)
* Расширять список правил для ролей пользователей  
* Взаимодействовать как с системой, так и с другими компонентами   
* Выполнять миграции (изменять структуру БД)   
* Управлять командами в планировщике   


