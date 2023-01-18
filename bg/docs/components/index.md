## Какво представляват компонентите?
Компонентите са специални плъгини за wildcoreDMS, които ви позволяват да разширите основната функционалност на системата.
Компонентите могат да се свързват и изключват към системата в зависимост от необходимостта (по време на бета тестване получавате достъп до всички компоненти).

## Каква функционалност носят компонентите
Има компоненти, които разширяват поддържания хардуер (напр. C-Data или BDcom OLT).
Има и компоненти, които реализират работа с Prometheus, което ви позволява да изграждате графики или да получавате текущи показатели от него.
Или, използвайки компонента за известия, можете да конфигурирате изпращане на събития или потребителски действия до Telegram или Email.
Пълният списък на компонентите може да се види в следните раздели.

## Управление на компоненти (чрез конзола)
**Списък на поддържаните компоненти - ```wca component:list```**
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
**Управление на компоненти**

* ```wca component:control COMPONENT_NAME install``` - инсталиране на компонент
* ```wca component:control COMPONENT_NAME enable``` - активира инсталиран компонент
* ```wca component:control COMPONENT_NAME disable``` - деактивиране на инсталиран компонент


## Компонентите вътре в системата могат
* Разширете възможностите на Rest API (добавете свои собствени крайни точки)
* Слушайте и отговаряйте на събития в системата (наблюдатели на събития)
* Разширете списъка с конзолни команди (команда `wca`)
* Разширете списъка с правила за потребителски роли
* Взаимодействайте както със системата, така и с други компоненти
* Извършване на миграции (промяна на структурата на базата данни)
* Управление на команди в планировчика



