# Request examples (curl)

Ready-to-use examples by group. All examples use variables — set them once:

```shell
WC="https://demo.wildcore.tools"      # your server address
KEY="YOUR_KEY"                         # the X-Auth-Key token
```

Every authenticated request carries the `X-Auth-Key: $KEY` header. Exact parameters for
each method are in [Swagger](index.md).

## Authentication (auth)

Session sign-in with login/password — returns a session key:

```shell
curl "$WC/api/v1/auth" \
  -X POST -H "Content-Type: application/json" \
  -d '{"login":"api_user","password":"••••••"}'
```

Verify the token with any protected method, e.g. the device list (below).

## Devices (device)

Device list / device by IP:

```shell
curl "$WC/api/v1/device"            -H "X-Auth-Key: $KEY"
curl "$WC/api/v1/device?ip=10.1.0.6" -H "X-Auth-Key: $KEY"
```

Detect a device model by IP and access profile:

```shell
curl "$WC/api/v1/device-detect" \
  -X POST -H "Content-Type: application/json" -H "X-Auth-Key: $KEY" \
  -d '{"ip":"10.1.0.6","access_id":6}'
```

## Interfaces (device-interface)

### Search interface by parameters

Returns an array (there may be several results). Parameters are not exclusive — the more
you pass, the more precise the search:

* **device_id** — device id in Wildcore;
* **device_ip** — device IP address;
* **interface_name** — interface name (e.g. `epon0/1:1` or `1/3`);
* **interface_bind_key** — the interface's unique key on the device;
* **ont_ident** — ONU serial number or MAC;
* **mac_address** — client MAC from FDB;
* **only_active_mac** — `1|0`, search only active MACs.

```shell
curl "$WC/api/v1/device-interface/search?device_id=495&interface_name=1/13" \
  -H "X-Auth-Key: $KEY"
```

Example response (trimmed):

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

### ONU list with filters and pagination

```shell
curl "$WC/api/v1/device-interface/ont-list" \
  -X PUT -H "Content-Type: application/json" -H "X-Auth-Key: $KEY" \
  -d '{"device_id":495,"limit":50,"offset":0}'
```

## Search & objects nearby (portal)

Global search across the system:

```shell
curl "$WC/api/v1/portal/search?query=00:11:22" -H "X-Auth-Key: $KEY"
```

Nearest objects by coordinates (devices/ONUs near a point):

```shell
curl "$WC/api/v1/portal/nearest-elements?lat=50.4501&lon=30.5234&distance=1000" \
  -H "X-Auth-Key: $KEY"
```

## Events & monitoring (events, pinger, analytics)

Events by filter:

```shell
curl "$WC/api/v1/component/events?not_resolved=1" -H "X-Auth-Key: $KEY"
```

Reachability statuses (pinger):

```shell
curl "$WC/api/v1/component/pinger/statuses" -H "X-Auth-Key: $KEY"
```

Widget: number of ONUs with a bad optical signal:

```shell
curl "$WC/api/v1/component/analytics/widgets/bad-signals" -H "X-Auth-Key: $KEY"
```

## Macros & ONU registration

List macros and run a macro on a device:

```shell
curl "$WC/api/v1/component/macros/list" -H "X-Auth-Key: $KEY"

curl "$WC/api/v1/component/macros/execute" \
  -X POST -H "Content-Type: application/json" -H "X-Auth-Key: $KEY" \
  -d '{"device":{"id":495},"macros":{"id":12},"from":"device"}'
```

Unregistered ONUs on a device:

```shell
curl "$WC/api/v1/component/onts_registration/unregistered?device_id=495" \
  -H "X-Auth-Key: $KEY"
```

## Users & access (user, user-role)

```shell
curl "$WC/api/v1/user"                    -H "X-Auth-Key: $KEY"
curl "$WC/api/v1/user-role-permissions"   -H "X-Auth-Key: $KEY"
```

## System (system)

System configuration and server info:

```shell
curl "$WC/api/v1/system/configuration" -H "X-Auth-Key: $KEY"
curl "$WC/api/v1/system/info"          -H "X-Auth-Key: $KEY"
```

---

!!! tip "Can't find the method you need?"
    Every method with exact parameters and schemas is in your server's Swagger
    (`/swagger/`). A handy way to assemble a script for your task right away —
    [Generating scripts with AI](./ai-codegen.md).
