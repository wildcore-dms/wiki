## Що таке компоненти?
Компоненти - це спеціальні плагіни до wildcoreDMS, які дозволяють розширити базовий функціонал системи.
Компоненти можна підключати та відключати до системи, залежно від необхідності (на момент бета-тестування ви отримуєте доступ до всіх компонентів).

## Який функціонал привносять компоненти
Є компоненти, які розширюють обладнання, що підтримується (наприклад ОЛТ C-Data або BDcom).
Також є компоненти, які реалізовують роботу з Prometheus, що дозволяє будувати графіки або отримати поточні метрики з нього.
Або, за допомогою компонента Notifications - можна налаштувати відправку подій або дій користувача в Telegram або Email.
Повний список компонентів можна переглянути на наступних вкладках.

## Управління компонентами (через консоль)
**Список підтримуваних компонентів - ```wca component:list```**
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
**Управління компонентами**

* ```wca component:control COMPONENT_NAME install``` - встановити компонент
* ```wca component:control COMPONENT_NAME enable``` - увімкнути встановлений компонент
* ```wca component:control COMPONENT_NAME disable``` - вимкнути встановлений компонент


## Компоненти, які всередині системи можуть
* Розширювати можливості Rest API (додавати свої endpoint)
* Слухати та реагувати на події в системі (event observers)
* Розширювати список консольних команд (`wca`)
* Розширювати список правил для ролей користувачів
* Взаємодіяти як із системою, так і з іншими компонентами
* Виконувати міграції (змінювати структуру БД)
* Управляти командами у планувальнику



