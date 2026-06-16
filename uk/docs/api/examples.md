# Приклади запитів (curl)

Готові приклади за групами. У всіх прикладах використовуються змінні — задайте їх один раз:

```shell
WC="https://demo.wildcore.tools"      # адреса вашого сервера
KEY="ВАШ_КЛЮЧ"                         # токен з X-Auth-Key
```

Усі запити з токеном містять заголовок `X-Auth-Key: $KEY`. Точні параметри кожного
методу — у [Swagger](index.md).

## Авторизація (auth)

Сесійний вхід логіном/паролем — повертає ключ сесії:

```shell
curl "$WC/api/v1/auth" \
  -X POST -H "Content-Type: application/json" \
  -d '{"login":"api_user","password":"••••••"}'
```

Перевірити токен — будь-яким захищеним методом, напр. списком пристроїв (нижче).

## Пристрої (device)

Список пристроїв / пристрій за IP:

```shell
curl "$WC/api/v1/device"            -H "X-Auth-Key: $KEY"
curl "$WC/api/v1/device?ip=10.1.0.6" -H "X-Auth-Key: $KEY"
```

Визначити модель пристрою за IP та профілем доступу:

```shell
curl "$WC/api/v1/device-detect" \
  -X POST -H "Content-Type: application/json" -H "X-Auth-Key: $KEY" \
  -d '{"ip":"10.1.0.6","access_id":6}'
```

## Інтерфейси (device-interface)

### Пошук інтерфейсу за параметрами

Повертає масив (може бути кілька результатів). Параметри не взаємовиключні — що більше
передано, то точніший пошук:

* **device_id** — ідентифікатор пристрою в Wildcore;
* **device_ip** — IP-адреса пристрою;
* **interface_name** — назва інтерфейсу (наприклад `epon0/1:1` або `1/3`);
* **interface_bind_key** — унікальний ключ інтерфейсу на пристрої;
* **ont_ident** — серійний номер або MAC ONU;
* **mac_address** — MAC клієнта з FDB;
* **only_active_mac** — `1|0`, шукати лише активні MAC.

```shell
curl "$WC/api/v1/device-interface/search?device_id=495&interface_name=1/13" \
  -H "X-Auth-Key: $KEY"
```

Приклад відповіді (скорочено):

```json
{
  "statusCode": 200,
  "meta": null,
  "data": [
    {
      "id": 96252,
      "name": "1/13",
      "type": "FE",
      "status": "Up",
      "bind_key": "13",
      "description": "",
      "device": { "id": 495, "ip": "10.1.0.6", "name": "sw-ak", "location": "Kyiv" }
    }
  ]
}
```

### Перелік ONU з фільтрами та пагінацією

```shell
curl "$WC/api/v1/device-interface/ont-list" \
  -X PUT -H "Content-Type: application/json" -H "X-Auth-Key: $KEY" \
  -d '{"device_id":495,"limit":50,"offset":0}'
```

## Пошук і об'єкти поруч (portal)

Глобальний пошук по системі:

```shell
curl "$WC/api/v1/portal/search?query=00:11:22" -H "X-Auth-Key: $KEY"
```

Найближчі об'єкти за координатами (пристрої/ONU поблизу точки):

```shell
curl "$WC/api/v1/portal/nearest-elements?lat=50.4501&lon=30.5234&distance=1000" \
  -H "X-Auth-Key: $KEY"
```

## Події та моніторинг (events, pinger, analytics)

Події за фільтром:

```shell
curl "$WC/api/v1/component/events?not_resolved=1" -H "X-Auth-Key: $KEY"
```

Статуси доступності (pinger):

```shell
curl "$WC/api/v1/component/pinger/statuses" -H "X-Auth-Key: $KEY"
```

Віджет: кількість ONU з поганим оптичним сигналом:

```shell
curl "$WC/api/v1/component/analytics/widgets/bad-signals" -H "X-Auth-Key: $KEY"
```

## Макроси та реєстрація ONU

Перелік макросів і виконання макросу на пристрої:

```shell
curl "$WC/api/v1/component/macros/list" -H "X-Auth-Key: $KEY"

curl "$WC/api/v1/component/macros/execute" \
  -X POST -H "Content-Type: application/json" -H "X-Auth-Key: $KEY" \
  -d '{"device":{"id":495},"macros":{"id":12},"from":"device"}'
```

Незареєстровані ONU на пристрої:

```shell
curl "$WC/api/v1/component/onts_registration/unregistered?device_id=495" \
  -H "X-Auth-Key: $KEY"
```

## Користувачі та доступ (user, user-role)

```shell
curl "$WC/api/v1/user"                    -H "X-Auth-Key: $KEY"
curl "$WC/api/v1/user-role-permissions"   -H "X-Auth-Key: $KEY"
```

## Система (system)

Конфігурація системи та інформація про сервер:

```shell
curl "$WC/api/v1/system/configuration" -H "X-Auth-Key: $KEY"
curl "$WC/api/v1/system/info"          -H "X-Auth-Key: $KEY"
```

---

!!! tip "Не знайшли потрібний метод?"
    Усі методи з точними параметрами та схемами — у Swagger вашого сервера
    (`/swagger/`). Зручний шлях зібрати скрипт одразу під свою задачу —
    [Генерація скриптів за допомогою ШІ](./ai-codegen.md).
