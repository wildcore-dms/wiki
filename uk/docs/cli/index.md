# Консольні команди (wca)

!!! abstract "Огляд"

    На сервері WildcoreDMS доступна консольна утиліта **`wca`**. Вона дозволяє виконувати дії,
    яких немає у веб-інтерфейсі (скидання паролів, очищення кешу, налаштування SSO, імпорт
    пристроїв), діагностувати роботу з обладнанням та керувати фоновими процесами.

## Як користуватися

Команди виконуються на сервері, де встановлено WildcoreDMS, з правами root:

```shell
sudo wca                      # список усіх команд
sudo wca <команда> --help     # аргументи та опції команди
```

Загальні правила:

- `<аргумент>` — обов'язковий аргумент, `[аргумент]` — необов'язковий.
- Команди зі списками підтримують опцію `-o` / `--output` для формату виводу: `table` (за замовчуванням), `json`, `yaml`.
- Частина команд **інтерактивні** — ставлять запитання в консолі (наприклад, `device:add`).
- Команди компонентів (з префіксом назви компонента, напр. `olts:`, `console:`) доступні, лише коли компонент увімкнено — див. [Компоненти](../components/index.md).
- `-v`, `-vv`, `-vvv` — детальніший вивід для діагностики.

У прикладах нижче використовуються умовні адреси (`192.0.2.10`) та логіни (`operator`).

---

## Користувачі

| Команда | Опис |
|---------|------|
| `wca user:list` | Список користувачів |
| `wca user:change-role <login> [role]` | Змінити роль користувача. Якщо роль не вказано — буде запропоновано вибрати зі списку |
| `wca user:reset-password <login> [-p <пароль>]` | Задати новий пароль і закрити всі сесії користувача. Без `-p` пароль буде запитано; порожня відповідь — згенерувати випадковий |
| `wca user:reset-ip-strict <login>` | Вимкнути для користувача обмеження входу за IP |
| `wca user:reset-user <login>` | Скинути доступ: пароль стає рівним логіну, вимикаються 2FA та обмеження за IP. Використовуйте, якщо користувач (зокрема `admin`) не може увійти |
| `wca user:delete <id>` | Видалити користувача за ID (ID — з `user:list`) |
| `wca user:generate-key <login> [термін]` | Згенерувати API-ключ для користувача. Термін: `10m`, `1h`, `30d`, `365d` тощо |
| `wca user-group:list` | Список ролей користувачів (з кількістю прав та ознакою відображення) |

Приклади:

```shell
sudo wca user:reset-user admin
sudo wca user:change-role operator Installer
sudo wca user:generate-key billing 365d
```

## Авторизація та безпека

| Команда | Опис |
|---------|------|
| `wca auth:configure` | Покроковий майстер налаштування способів входу та SSO (OpenID Connect) — див. [Вхід через SSO](../sso/index.md) |
| `wca security:reset:ipblock [ip]` | Розблокувати IP, заблокований захистом від перебору паролів. Без аргументу — розблокувати всі |
| `wca security:enable-encryption [-f]` | Увімкнути шифрування облікових даних обладнання в БД. **Незворотна операція** — див. [FAQ](../faq.md) |
| `wca security:generate-encrypt-key [-f]` | Згенерувати ключ шифрування (зазвичай викликається автоматично при увімкненні шифрування) |
| `wca system:recalc-sessions` | Перерахувати активні сесії користувачів |

## Пристрої, доступи, моделі

| Команда | Опис |
|---------|------|
| `wca device:list` | Список пристроїв |
| `wca device:add` | Додати пристрій (інтерактивно: ім'я, IP, MAC, серійний номер, опис, модель, доступ, група, додаткові параметри) |
| `wca device:update` | Змінити пристрій (інтерактивно) |
| `wca device:delete <id>` | Видалити пристрій за ID |
| `wca device:delete-in-group <group_id>` | Видалити **всі пристрої** групи |
| `wca device:import [файл] [-g <group_id>] [-s <роздільник>]` | Імпорт пристроїв з CSV-файлу або стандартного вводу (`|`) — див. [Імпорт та експорт](./import-devices.md) |
| `wca device:export [-f <файл>] [-g <group_id>] [--include-disabled]` | Експорт пристроїв у CSV того ж формату — див. [Імпорт та експорт](./import-devices.md#export) |
| `wca device-access:list` | Список [доступів](../management/device-access.md) |
| `wca device-access:add` | Створити доступ (інтерактивно) |
| `wca device-access:edit <id>` | Змінити доступ |
| `wca device-access:delete <id>` | Видалити доступ |
| `wca device-model:list` | Список моделей обладнання |
| `wca device-model:update <id>` | Змінити назву, виробника та [додаткові параметри](../management/custom-parameters.md) моделі (інтерактивно) |

!!! warning
    `device:delete-in-group` видаляє пристрої разом з їх інтерфейсами та історією без додаткового
    підтвердження.

## Робота з обладнанням та діагностика

| Команда | Опис |
|---------|------|
| `wca switcher-core:modules <ip>` | Перелік модулів (можливостей), які підтримує модель пристрою |
| `wca switcher-core:call <ip> <модуль> [аргументи...]` | Виконати модуль на пристрої та вивести результат. Опції: `-s device\|cache\|store` — джерело даних (за замовчуванням `device`), `-t` — показати вивід консолі, `-m` — показати метадані |
| `wca test:switcher-core:call <модуль> [аргументи...] -g <group_id>` | Виконати модуль на всіх пристроях групи (масова перевірка). Опції: `-s` — джерело, `-c` — вивід консолі, `-f` — показати лише потрібне поле |
| `wca test:snmpwalk <ip> [oid]` | Виконати snmpwalk з параметрами доступу пристрою |
| `wca console:open <ip або id> [-l]` | Відкрити консоль пристрою з автоматичним входом (`-l` — без автовходу). Потрібен компонент [Веб-консоль](../components/console.md) |
| `wca live_traffic:view <ip> <інтерфейс> [-i 5s]` | Трафік на інтерфейсі в реальному часі |
| `wca prometheus_wrapper:last-values <ip> <метрики>` | Останні значення метрик пристрою (назви через кому) |
| `wca switches:counters <ip>` | Статистика трафіку по портах комутатора |
| `wca switches:errors <ip>` | Статистика помилок по портах |
| `wca switches:rmon <ip>` | RMON-статистика по портах |

Приклади:

```shell
sudo wca switcher-core:modules 192.0.2.10
sudo wca switcher-core:call 192.0.2.10 pon_onts_status
sudo wca switcher-core:call 192.0.2.10 interface_descriptions interface=gpon0/1:1 -s cache
sudo wca test:snmpwalk 192.0.2.10 1.3.6.1.2.1.1
sudo wca live_traffic:view 192.0.2.10 ge0/1 -i 2s
```

## Опитувач

| Команда | Опис |
|---------|------|
| `wca poller:poll <device_id> [-p <опитувач>] [-d]` | Запустити опитування пристрою вручну: усі опитувачі або один (`-p`, напр. `optical_strength`). `-d` — без перевірок доступності та інтервалу |
| `wca poller:last:counters` | Статистика останніх опитувань |

Детальніше про опитувачі — [Опитувач обладнання](../system/poller.md).

## Кеш

| Команда | Опис |
|---------|------|
| `wca cache:flush` | Оновити всі кеші. Використовуйте після зміни налаштувань або якщо дані відображаються некоректно |
| `wca cache:redis:flush-all` | Очистити кеш Redis |
| `wca cache:memcache:flush` | Очистити кеш відповідей обладнання |
| `wca cache:objects:flush` | Очистити кеш службових об'єктів |
| `wca cache:memcache:keys [маска]` | Список ключів кешу за маскою |
| `wca cache:memcache:key-value <ключ>` | Значення ключа кешу |

## Система та фонові процеси

| Команда | Опис |
|---------|------|
| `wca system:http:reset` | Перезапустити обробники веб-запитів — застосувати зміни в [`.env`](../installation-and-updating/env-configuration.md) |
| `wca system:http:stat` | Стан обробників веб-запитів |
| `wca system:configuration` | Вивести поточну конфігурацію системи |
| `wca system:subscription` | Інформація про підписку агента. Допомагає з'ясувати причину, якщо агент відключено |
| `wca system:reload-external-apps` | Перезавантажити конфігурацію зовнішніх застосунків (Grafana, Prometheus тощо) |
| `wca supervisor:processes-list` | Список фонових процесів та їх стан |
| `wca supervisor:control <процес> <restart\|stop\|start>` | Керування фоновим процесом, напр. перезапуск Telegram-бота після зміни налаштувань |
| `wca supervisor:restart` | Перезапустити всі фонові процеси |
| `wca schedule:list` | Задачі планувальника |

## Компоненти

| Команда | Опис |
|---------|------|
| `wca component:list [-o json]` | Список компонентів та їх стан |
| `wca component:control <компонент> <install\|uninstall\|enable\|disable>` | Встановити, видалити, увімкнути або вимкнути компонент |
| `wca component:dependencies` | Залежності між компонентами |

Детальніше — [Про компоненти](../components/index.md).

## Журнали та очищення даних

| Команда | Опис |
|---------|------|
| `wca logs:clear <тип> [днів]` | Очистити журнали старші за N днів. Типи: `switcher-core` (звернення до обладнання), `collector` (опитувач), `actions` (дії користувачів), `crontab-reports` (звіти планувальника) |
| `wca events:retention <днів>` | Видалити закриті події, старші за N днів |
| `wca trapservice:clear-old-logs [днів]` | Очистити старі записи SNMP-трапів |
| `wca attachments:clear-not-existed` | Видалити записи вкладень, файли яких відсутні |
| `wca auto_topology:clear-not-actual-links [-d 3]` | Видалити автоматично знайдені з'єднання, не підтверджені N днів |

## Команди компонентів

Доступні, коли відповідний компонент увімкнено. Більшість з них запускаються планувальником
автоматично — вручну їх виконують, щоб не чекати розкладу або для діагностики.

| Команда | Компонент | Опис |
|---------|-----------|------|
| `wca autodiscovery:scan [cidr] [-a <access_id>] [-g <group_id>]` | [Autodiscovery](../components/autodiscovery.md) | Пошук нових пристроїв у мережі |
| `wca auto_topology:scan` | [Автотопологія](../components/links/autotopology.md) | Побудувати з'єднання між пристроями за LLDP/FDB |
| `wca links:calc-link-utilization` | [Навантаження з'єднань](../components/links/utilization.md) | Перерахувати завантаження з'єднань |
| `wca olts:get-onts-blacklist [ip]` | ОЛТи | Зчитати [чорний список ONU](../system/onu-blacklist.md) з усіх OLT або одного |
| `wca onts_registration:get-unregistered-onts [ip]` | [Реєстрація ONU](../components/onts-registration/getting-started.md) | Оновити список незареєстрованих ONU |
| `wca analytics:duplicated-mac-addresses` | Аналітика | Пошук дублікатів MAC-адрес |
| `wca analytics:duplicated-ont-idents` | Аналітика | Пошук дублікатів ONU |
| `wca events:apply-rules` | [Події](../components/events.md) | Застосувати правила подій після зміни конфігурації |
| `wca events:sync-active-alerts [--dry-run]` | Події | Закрити «завислі» події після перезапуску Alertmanager (`--dry-run` — лише показати) |
| `wca notifications:send-notify <id>` | [Сповіщення](../components/notifications.md) | Повторно надіслати сповіщення за ID |
| `wca pinger:update-exporter-statuses` | Pinger | Оновити статуси для ICMP-моніторингу |
| `wca mikbill_integration:sync-clients` | [MikBill](../components/mikbill_integration.md) | Синхронізувати абонентів з MikBill |
| `wca nodeny_plus:sync-clients` | [NoDeny Plus](../components/nodeny_plus.md) | Синхронізувати абонентів з NoDeny |
| `wca userside_integration:sync [типи...]` | [Userside](../components/us_integration.md) | Синхронізувати дані з Userside |

## Службові команди

Ці команди запускаються системою автоматично (фонові сервіси, планувальник, міграції при
оновленні). **Не запускайте їх вручну**, якщо цього не порадила підтримка:

`schedule:executor`, `schedule:exec-once`, `poller:poll-service`, `migration:migrate`,
`migration:components-migrate`, `migration:list`, `cache:compile`, `openapi:generate`,
`system:internal-event-listener`, `system:prom-metrics-exporter`, `system:events:listeners`,
`events:subscribe`, `notifications:service`, `notifications:telegram-bot`, `trapservice:handler`,
`console:open-for-web`, `console:run-ttyd-server`, `server:run`, `api:routes-list`, `api:rules-list`.
