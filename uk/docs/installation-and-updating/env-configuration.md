# Налаштування системи (.env)

!!! abstract "Огляд"

    Основні параметри WildcoreDMS зберігаються у файлі **`/opt/wildcore-dms/.env`** на сервері:
    мережеві порти, підключення до бази даних, параметри роботи з обладнанням, опитувача,
    безпеки, кешу, авторизації та компонентів.

    Частину параметрів можна змінювати **у веб-інтерфейсі**, решту — **лише на сервері**,
    редагуючи файл `.env`. На цій сторінці параметри розділено на ці дві групи, а всередині —
    за призначенням.

## Як змінювати параметри

### У веб-інтерфейсі

Меню `Конфігурація > Конфігурація системи` (потрібне право **«Читання/зміна системних
налаштувань»**). Параметри згруповані за розділами («Веб-панель», «Система», «Безпека»,
«Робота з пристроями», розділи компонентів). Біля кожного поля показано значення за
замовчуванням. Після збереження значення записується у той самий файл `.env`.

!!! note
    Параметри розділу «Система» (кількість потоків опитувача, веб-сервера, термін зберігання
    метрик) застосовуються після перезапуску контейнерів — див. нижче.

### На сервері

1. Зробіть резервну копію: `sudo cp /opt/wildcore-dms/.env /opt/wildcore-dms/.env.bak`
2. Відредагуйте файл, наприклад: `sudo nano /opt/wildcore-dms/.env`
3. Застосуйте зміни:

    - параметри застосунку (авторизація, безпека, робота з обладнанням, кеш тощо):

        ```bash
        sudo wca system:http:reset
        ```

    - параметри Docker, портів, бази даних, опитувача та кількості потоків — перезапуск контейнерів:

        ```bash
        cd /opt/wildcore-dms
        sudo docker compose up -d
        ```

!!! warning
    - Формат рядка — `ПАРАМЕТР=значення`, без пробілів навколо `=`. Значення з пробілами беріть у
      лапки: `APP_NAME="My ISP DMS"`.
    - Логічні параметри (у таблицях позначені `yes` / `no`) приймають будь-яку з пар значень:
      `yes` / `no`, `true` / `false` або `1` / `0` (регістр не важливий).
    - Не змінюйте параметри, яких немає на цій сторінці, якщо цього не порадила підтримка.
    - У прикладах нижче вказано **умовні** значення (`dms.example.com`, `<пароль>` тощо) —
      підставляйте свої.

---

## Параметри, які можна змінити у веб-інтерфейсі { #web }

### Веб-панель

| Параметр | Назва в інтерфейсі | Опис | Значення | За замовчуванням |
|----------|--------------------|------|----------|------------------|
| `APP_NAME` | Ім'я агенту | Назва системи у заголовку сторінок | довільний текст | `Wildcore DMS` |
| `EXTERNAL_HTTP_ADDRESS` | Веб-адреса системи | Адреса, за якою користувачі відкривають WildcoreDMS. Використовується для посилань у сповіщеннях, QR-кодах та [SSO](../sso/index.md) | URL, напр. `https://dms.example.com` | `http://127.0.0.1:8088` |
| `DEFAULT_LANGUAGE` | Мова за замовчуванням | Мова інтерфейсу для нових користувачів та сторінки входу | `ua`, `en`, `ru` | `en` |
| `MAP_COORDINATES` | Координати мапи | Центр карти за замовчуванням | `широта,довгота`, напр. `50.45,30.52` | — |
| `MAP_TILE_LAYER` | Тип мапи | Підкладка карти за замовчуванням | `Google (street)`, `Google (hybrid)`, `OpenStreetMap`, `OpenTopoMap`, `Satellite`, `Dark`, `Terrain` | `Google (street)` |
| `LOGS_RETURN_RESULTS_LIMIT` | Розмір логів | Максимальна кількість записів у вибірках журналів | число | `500` |
| `WEB_ZOOM_MAIN` | Масштаб веб-інтерфейсу | Масштаб інтерфейсу (експериментально) | число, напр. `0.95` = 95% | `1.0` |
| `WEB_ZOOM_IFRAME` | Масштаб (в iframe) | Масштаб при вбудовуванні в iframe (наприклад, у білінг) | число | `1.0` |
| `SEARCH2_ENABLED` | Додатковий статус пошуку | Показати в заголовку друге поле пошуку | `yes` / `no` | `no` |
| `SEARCH2_FILTER` | Додатковий пошук по | За чим шукає друге поле | `agreement` (договір), `description`, `interface`, `ont_ident` (серійний/MAC ONU), `fdb_history`, `device` | `agreement` |

### Система

| Параметр | Назва в інтерфейсі | Опис | Значення | За замовчуванням |
|----------|--------------------|------|----------|------------------|
| `LOG_LEVEL` | Рівень логів | Детальність журналу застосунку | `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY` | `WARNING` |
| `PROMETHEUS_RETENTION_TIME` | Час життя даних | Скільки зберігаються метрики (історія сигналів, трафіку, статусів, аналітика). Більше — більше місця на диску | тривалість: `15d`, `30d`, `90d`, `1y` | `30d` |
| `RR_NUM_WORKERS` | Кількість потоків веб-сервера | Скільки запитів до API обробляється паралельно | число | `50` |
| `POLLER_COUNT_PROCS` | Кількість потоків опитувальника | Скільки пристроїв опитується одночасно, див. [Опитувач](../system/poller.md) | число | `10` |
| `POLLER_IGNORE_DOWN` | Ігнорувати лежачі пристрої | Не опитувати недоступні пристрої | `yes` / `no` | `yes` |
| `POLLER_DO_NOT_CLEAR_INTERFACES` | Не очищати інтерфейси | Не видаляти інтерфейси, яких більше немає на обладнанні (наприклад, видалені ONU) | `yes` / `no` | `no` |

!!! info
    Параметри цього розділу застосовуються після `sudo docker compose up -d` у `/opt/wildcore-dms`.

### Безпека та проксі

| Параметр | Назва в інтерфейсі | Опис | Значення | За замовчуванням |
|----------|--------------------|------|----------|------------------|
| `API_KEY_EXPIRATION` | Час життя ключа | Час життя сесії користувача після входу, секунд | число, напр. `864000` (10 днів) | `864000` |
| `RATE_LIMITER_ENABLED` | Захист від брутфорсу | Блокувати IP після невдалих спроб входу | `yes` / `no` | `yes` |
| `RATE_LIMITER_ATTEMPTS` | Кількість спроб входу | Кількість невдалих спроб (за 10 хвилин), після якої IP блокується | число | `3` |
| `RATE_LIMITER_TIME` | Таймаут блокування IP | На скільки блокується IP, секунд. Розблокувати вручну: `wca security:reset:ipblock <IP>` | число | `3600` |
| `SECURE_CHECK_PASSWORD_STRENGTH` | Перевірка складності пароля | Вимагати пароль від 8 символів з великими/малими літерами, цифрою та спецсимволом | `yes` / `no` | `yes` |
| `TRUSTED_HOST_NETWORK_LIST` | Список довірених мереж | Адреси/мережі, з яких дозволено звертатися до API **без ключа** (для інтеграцій, напр. з білінгом). Вказуйте лише адреси довірених серверів. Порожньо — вимкнено | через кому, напр. `192.0.2.10,192.0.2.0/28` | порожньо |
| `PROXY_ENABLED` | Проксі ввімкнутий | Брати IP клієнта із заголовка проксі. Вмикайте лише якщо WildcoreDMS працює за [проксі](../web-interface/use-proxy.md) | `yes` / `no` | `no` |
| `PROXY_REAL_IP_HEADER` | Заголовок з IP користувача | Заголовок, у якому проксі передає реальний IP | назва заголовка | `X-Forwarded-For` |

### Робота з обладнанням { #swc }

Загальні параметри підключення. Їх можна перевизначити в [доступі](../management/device-access.md#connection),
[моделі або пристрої](../management/custom-parameters.md#sw_core_connection).

| Параметр | Назва в інтерфейсі | Опис | Значення | За замовчуванням |
|----------|--------------------|------|----------|------------------|
| `SWC_CONSOLE_CONN_TYPE` | Тип підключення консолі | Протокол консолі | `telnet`, `ssh` | `telnet` |
| `SWC_CONSOLE_PORT` | Порт консолі | Порт Telnet/SSH | число | `23` |
| `SWC_CONSOLE_TIMEOUT_SEC` | Таймаут консолі | Максимальний час консольної сесії/команди, секунд | число | `300` |
| `SWC_CONSOLE_WAIT_BYTE_SEC` | Таймаут потоку байтів | Скільки чекати на наступні дані від консолі, секунд | число | `5` |
| `SWC_SNMP_VERSION` | SNMP-версія | Версія SNMP | `1`, `2c` | `2c` |
| `SWC_SNMP_PORT` | SNMP port | Порт SNMP | число | `161` |
| `SWC_SNMP_TIMEOUT_SEC` | SNMP timeout sec | Тайм-аут одного SNMP-запиту, секунд | число | `4` |
| `SWC_SNMP_REPEATS` | SNMP repeats | Кількість повторів SNMP-запиту | число | `3` |
| `SWC_MIKROTIK_API_PORT` | Mikrotik API-порт | Порт API Mikrotik RouterOS | число | `8728` |
| `SWC_CHECK_ICMP_PING` | Перевіряти стан по ICMP | Перед зверненням до пристрою перевіряти його доступність пінгом (швидка відповідь «недоступний» замість очікування тайм-ауту) | `yes` / `no` | `yes` |
| `SWC_ENABLE_SPLITTING` | Вичитувати та кешувати по інтерфейсам | Відповіді по всьому пристрою (список ONU, статуси) кешуються окремо для кожного інтерфейсу — сторінки портів/ONU відкриваються швидше | `yes` / `no` | `yes` |
| `SWC_CACHE_ACTUALIZE_TIMEOUT_SEC` | Актуалізувати кеш через | Через скільки секунд дані в кеші вважаються застарілими і запитуються з обладнання знову | число | `3600` |

### Параметри компонентів

Показуються в інтерфейсі, якщо компонент встановлено.

| Компонент | Параметри |
|-----------|-----------|
| [Веб-консоль](../components/console.md) | `CONSOLE_ENABLE_WEB` — увімкнути веб-консоль (`yes`/`no`, `no`); `CONSOLE_OPEN_AT` — відкривати у вкладці чи вікні (`tab`/`window`, `tab`); `CONSOLE_FONT_SIZE` — розмір шрифту, px (`14`) |
| SNMP-трапи | `TRAP_SERVICE_ENABLED` — приймати трапи (`yes`); `TRAP_SERVICE_SNMP_PORT` — UDP-порт (`162`, зміна потребує перезапуску контейнерів); `TRAP_SERVICE_COUNT_HANDLERS` — кількість обробників (`10`); `TRAP_SERVICE_IGNORE_UNKNOWN_TRAPS` — ігнорувати трапи від невідомих пристроїв; `TRAP_SERVICE_CHECK_COMMUNITY` — перевіряти community трапу (`no`) |
| [Бекапи конфігурації](../components/oxidized.md) | `OXIDIZED_THREADS` — потоків (`30`, рекомендовано = кількості CPU); `OXIDIZED_INTERVAL` — інтервал бекапу, сек (`86400`); `OXIDIZED_TIMEOUT` — тайм-аут, сек (`300`); `OXIDIZED_URL` — не змінюйте для вбудованого Oxidized |
| [Автотопологія](../components/links/autotopology.md) | `AUTO_TOPOLOGY_SCHEDULE_ENABLED` — запускати за розкладом (`yes`); `AUTO_TOPOLOGY_THREADS` — потоків (`10`) |
| [Навантаження з'єднань](../components/links/utilization.md) | `LINKS_UTILIZATION_CALCULATE_PERIOD` — період розрахунку (`10m`, `15m`, `30m`, `1h`, `3h`, `6h`; `15m`); `LINKS_UTILIZATION_MAX_PRC_FOR_ALERT` — % завантаження для події (`85`) |
| [Сповіщення](../components/notifications.md) | `NOTIFICATIONS_CHECK_PREVIOUS_MESSAGE` — не надсилати «вирішено», якщо не надсилалось повідомлення про проблему (`no`) |
| [Генератор QR](../components/qr-code-generator.md) | `QRGENERATOR_SHOW_DATA` — підпис під QR-кодом (`ip`/`name`, `name`) |
| Аналітика | `ANALYTICS_MIN_RX_SIGNAL` / `ANALYTICS_MAX_RX_SIGNAL` — межі нормального RX ONU, dBm (`-28` / `-10`); `ANALYTICS_MIN_OLT_RX_SIGNAL` / `ANALYTICS_MAX_OLT_RX_SIGNAL` — те саме для OLT RX; `ANALYTICS_MIN_SFP_RX_SIGNAL` / `ANALYTICS_MAX_SFP_RX_SIGNAL` — для SFP (`-15` / `5`); `ANALYTICS_IGNORE_IFACES_WITH_MORE_THAN` — у пошуку дублікатів MAC ігнорувати порти, де більше N MAC-адрес (аплінки, `10`); `ANALYTICS_SHOW_ACTIVE_MORE_THAN` — враховувати MAC, активні довше N секунд (`1800`) |
| Пошук пристроїв | `SEARCH_DEVICE_SOURCES` — джерела (`history,device`); `SEARCH_DEVICE_CHECK_ALL_SOURCES` — перевіряти всі джерела (`no`); `SEARCH_DEVICE_HISTORY_ONLY_ACTIVE` — з історії лише активні записи (`yes`); `SEARCH_DEVICE_IGNORE_TAG_PORTS` — ігнорувати транкові порти (`yes`); `SEARCH_DEVICE_REQUEST_CONCURRENCY` — паралельних запитів (`50`) |
| [MikBill](../components/mikbill_integration.md) | `MIKBILL_API_ADDR` — адреса білінгу (`https://billing.example.com`); `MIKBILL_AUTH_KEY` — ключ API (як у налаштуваннях інтеграції в MikBill); `MIKBILL_GLOBAL_SEARCH_FIELD` — поле для пошуку (`agreement`/`uid`/`login`); `MIKBILL_SET_ONT_COORDINATES` — брати координати ONU з білінгу (`no`) |
| [NoDeny Plus](../components/nodeny_plus.md) | `NODENY_URL` — адреса NoDeny; `NODENY_DATABASE_DSN`, `NODENY_DATABASE_USERNAME`, `NODENY_DATABASE_PASSWORD` — підключення до БД NoDeny; `NODENY_COMPARISON_DESCRIPTION_REQUIRED` — вимагати збіг опису інтерфейсу та імені (`no`) |
| [Userside](../components/us_integration.md) | `USERSIDE_WEB_ADDRESS` — адреса Userside; `USERSIDE_API_KEY` — ключ API; `USERSIDE_SYNC_DATA` — що синхронізувати (`devices`); `USERSIDE_ADD_NEW_DEVICES_TO_GROUP_ID` — ID групи для нових пристроїв (`-1`); `USERSIDE_DELETE_NOT_EXISTED_DEVICES` — видаляти пристрої, видалені в Userside (`no`); `USERSIDE_UPDATE_DEVICES_FIELDS` — поля для оновлення (`coordinates`, `name`, `location`, `comment`) |

---

## Параметри, які змінюються лише на сервері { #server-only }

### Мережа та Docker

!!! warning
    Після зміни — `cd /opt/wildcore-dms && sudo docker compose up -d`.

| Параметр | Опис | Значення | За замовчуванням |
|----------|------|----------|------------------|
| `NGINX_EXPOSE` | Адреса та порт веб-інтерфейсу | `IP:порт` | `0.0.0.0:8088` |
| `PROMETHEUS_EXPOSE` | Адреса та порт Prometheus (для зовнішнього доступу, напр. Grafana) | `IP:порт` | `127.0.0.1:9090` |
| `MYSQL_EXPOSE` | Адреса та порт MySQL на хості | `IP:порт` | `127.0.0.1:33306` |
| `LOCAL_SUBNET` | Внутрішня мережа контейнерів Docker. Змінюйте, лише якщо вона перетинається з вашими мережами | CIDR | `10.255.255.128/25` |

!!! danger
    Не відкривайте `MYSQL_EXPOSE` та `PROMETHEUS_EXPOSE` назовні (`0.0.0.0`) без фаєрвола.

### База даних

| Параметр | Опис | За замовчуванням |
|----------|------|------------------|
| `DATABASE_URL` | Рядок підключення до БД | `mysql:host=wca-db;dbname=wildcore_agent;charset=utf8` |
| `DATABASE_NAME` | Ім'я БД | `wildcore_agent` |
| `DATABASE_USER` / `DATABASE_PASSWD` | Користувач і пароль БД. Задаються при встановленні, змінювати не потрібно | — |
| `MYSQL_INNODB_BUFFER_POOL_SIZE` | Пам'ять під кеш даних MySQL. Для великих мереж збільште (напр. `4G`), але не більше ~50% RAM сервера | `1G` |
| `MYSQL_KEY_BUFFER_SIZE` | Буфер індексів MySQL | `256M` |
| `MYSQL_TABLE_OPEN_CACHE` | Кількість одночасно відкритих таблиць | `500` |

Див. також [Оптимізація](../troubleshooting/optimization.md).

### Авторизація та API

| Параметр | Опис | Значення | За замовчуванням |
|----------|------|----------|------------------|
| `AUTH_METHODS` | Способи входу | `internal`, `oidc` або обидва через кому | `internal` |
| `AUTH_AUTO_INITIATE` | Одразу переходити до SSO-провайдера | `yes` / `no` | `no` |
| `OIDC_*` | Параметри входу через SSO | див. [Вхід через SSO](../sso/index.md#configure) | — |
| `API_STRICT_RULES` | Забороняти виклики API, для яких не задано прав | `yes` / `no` | `yes` |
| `SECURE_ENCRYPT_ACCESSES` | Шифрування облікових даних обладнання в БД. Вмикайте командою `sudo wca security:enable-encryption`, а не вручну — див. [FAQ](../faq.md) | `yes` / `no` | `no` |

### Опитувач та продуктивність

| Параметр | Опис | Значення | За замовчуванням |
|----------|------|----------|------------------|
| `SWC_CALL_CONCURRENCY` | Максимальна кількість одночасних запитів до обладнання | число | `1` |
| `SWC_CACHE_TIMEOUT_SEC` | Скільки зберігається кеш відповідей обладнання, секунд | число | `86400` |
| `RR_MAX_WORKER_MEMORY` | Ліміт пам'яті на один потік веб-сервера, МБ | число | `160` |
| `DEVICES_LIST_DISABLE_IFACE_STAT` | Не рахувати статистику інтерфейсів у списку пристроїв — якщо список завантажується дуже повільно | `yes` / `no` | `no` |
| `MEMCACHE_CACHING_QUERY_TIMEOUT_SEC` | Час життя кешу запитів до БД, секунд | число | `30` |

### Інше

| Параметр | Опис | Значення | За замовчуванням |
|----------|------|----------|------------------|
| `LOG_FILES_PATH` | Каталог логів усередині контейнера | шлях | `/log` |
| `WS_ENABLED` | Сервер WebSocket для оновлень у реальному часі | `yes` / `no` | `no` |
| `ENVIRONMENT` | Режим роботи. Має бути `PRODUCTION` | `PRODUCTION` | `PRODUCTION` |

### Службові параметри

Ці параметри описують внутрішні адреси сервісів у Docker і заповнюються при встановленні.
**Не змінюйте їх**, якщо цього не порадила підтримка: `API_BASE_PATH`, `IMAGE_BASE_URL`,
`MEMCACHE_ENABLED`, `MEMCACHE_SERVER`, `MEMCACHE_PORT`, `REDIS_ENABLED`, `REDIS_HOST`,
`REDIS_PORT`, `REDIS_PASSWORD`, `PROMETHEUS_URL`, `ALERTMANAGER_URL`, `SWC_URL_PATH`,
`SWC_CACHE_SYSTEM`.

## Приклад

Фрагмент `.env` з умовними значеннями:

```dotenv
APP_NAME="Example ISP DMS"
EXTERNAL_HTTP_ADDRESS=https://dms.example.com
DEFAULT_LANGUAGE=ua
MAP_COORDINATES=50.45,30.52

NGINX_EXPOSE=0.0.0.0:8088

POLLER_COUNT_PROCS=20
PROMETHEUS_RETENTION_TIME=90d

SWC_CONSOLE_CONN_TYPE=ssh
SWC_CONSOLE_PORT=22
SWC_SNMP_TIMEOUT_SEC=5

PROXY_ENABLED=yes
```
