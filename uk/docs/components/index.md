## Що таке компоненти?
Компоненти — це спеціальні плагіни для wildcoreDMS, які дозволяють розширити базовий функціонал системи.
Компоненти можна підключати та відключати до системи залежно від потреби (на момент бета-тестування ви отримуєте доступ до всіх компонентів).

## Яку функціональність надають компоненти
Є компоненти, які розширюють підтримуване обладнання (наприклад, C-Data або BDcom OLT).
Також є компоненти, які реалізують роботу з Prometheus, що дозволяє будувати графіки або отримувати з нього поточні метрики.
Або за допомогою компонента «Сповіщення» ви можете налаштувати надсилання подій або дій користувача в Telegram або Email.
Повний список компонентів можна переглянути на наступних вкладках.

## Керування компонентами (через консоль)
**Список підтримуваних компонентів - `wca component:list`**
```{ .shell .no-copy}
$ wca component:list     
+--------------------------+------------------------------------------------------------------+---------+-----------+---------------+----------------+     
| Key                      | Description                                                      | Enabled | Installed | Has installer | Has controller |     
+--------------------------+------------------------------------------------------------------+---------+-----------+---------------+----------------+     
| all_ok_billing           | Integration with AllOkBilling system                             | No      | Yes       | Yes           | Yes            |     
| analytics                | View live and historical device data                             | Yes     | Yes       | Yes           | Yes            |     
| autodiscovery            | Scan networks and automatic add devices                          | Yes     | Yes       | Yes           | Yes            |     
| diagnostic               | Rest API interfaces for network diag                             | Yes     | Yes       | Yes           | Yes            |     
| events                   | Realize events functional                                        | Yes     | Yes       | Yes           | Yes            |     
| fdb_history              | Realize API for working with history DFB                         | Yes     | Yes       | Yes           | No             |     
| huawei_onts_registration | ONTs registration for Huawei OLTs                                | Yes     | Yes       | Yes           | Yes            |     
| links                    | Allow to build dependecies tree                                  | Yes     | Yes       | Yes           | Yes            |     
| live_traffic             | Rest API interfaces for search devices over IP or MAC-address    | Yes     | Yes       | Yes           | Yes            |     
| notifications            | Sending notifications over Telegram/Email                        | Yes     | Yes       | Yes           | Yes            |     
| olts                     | Working with OLTs                                                | Yes     | Yes       | Yes           | Yes            |     
| olts_control             | ONU management component (change description, overwrite, delete) | Yes     | Yes       | Yes           | Yes            |     
| pinger                   | ICMP pinger                                                      | Yes     | Yes       | Yes           | Yes            |     
| pon_boxes                | Allow to create pon maps                                         | Yes     | Yes       | Yes           | Yes            |     
| prometheus_wrapper       | Prometheus integration(Working with Prometheus API)              | Yes     | Yes       | Yes           | Yes            |     
| router_os                | Working with routerOS                                            | Yes     | Yes       | Yes           | Yes            |     
| search_device            | Rest API interfaces for search devices over IP or MAC-address    | Yes     | Yes       | Yes           | Yes            |     
| switches                 | Component for get info from L2 switches                          | Yes     | Yes       | Yes           | Yes            |     
| switches_control         | Component for management ports on L2 switches                    | Yes     | Yes       | Yes           | Yes            |     
| zte_unregistered_onts    | ONTs registration on ZTE OLTs                                    | Yes     | Yes       | Yes           | Yes            |     
+--------------------------+------------------------------------------------------------------+---------+-----------+---------------+----------------+     
```     
**Керування компонентами**

* `wca component:control COMPONENT_NAME install` - встановити компонент
* `wca component:control COMPONENT_NAME enable` - увімкнути встановлений компонент
* `wca component:control COMPONENT_NAME disable` - відключити встановлений компонент


## Компоненти всередині системи можуть
* Розширте можливості Rest API (додайте власні кінцеві точки)
* Слухати та реагувати на події в системі (спостерігачі подій)
* Розгорнути список консольних команд (команда `wca`)
* Розширте список правил для ролей користувачів
* Взаємодія як з системою, так і з іншими компонентами
* Виконувати міграції (змінювати структуру бази даних)
* Керуйте командами в планувальнику




