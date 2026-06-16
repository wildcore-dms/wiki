# API — getting started

WildcoreDMS provides a **REST API** for managing equipment and users and for pulling data into integrations (billing, monitoring, custom scripts and portals).

All communication is plain HTTP requests with **JSON** bodies and responses.

## Base URL

Every method lives under the **`/api/v1`** prefix on your server:

```
https://<your-server>/api/v1/...
```

Examples in this documentation use the demo stand: `https://demo.wildcore.tools`.

## Where to get the method description (OpenAPI / Swagger)

The full and **always up-to-date** list of methods is described by an **OpenAPI 3** specification, served directly from your server:

- **Interactive Swagger UI** — browse and try methods in the browser:
  `https://<your-server>/swagger/`
  (demo: [demo.wildcore.tools/swagger](https://demo.wildcore.tools/swagger/))
- **Raw specification file** (to import into Postman/Insomnia, generate clients, or feed to AI):
  `https://<your-server>/swagger/openapi.yaml`

!!! tip "Tip"
    The downloaded `openapi.yaml` is the best source for automation — you can generate
    client code or scripts from it. See [Generating scripts with AI](./ai-codegen.md).

## Authentication

Two access methods are supported: **token** and **trusted networks**.

### Method 1. Auth token (recommended)

The token is bound to a user and passed in the **`X-Auth-Key`** header.

**How to obtain a token:**

- **Via the web panel** — easiest: create a user (e.g. `api_user`) and generate a key
  for it. Step-by-step: [API Key Generation](../web-interface/api-key-generation.md).
- **Via the console utility** — on the server running the agent:
  ```shell
  wca user:generate-key api_user 365d
  ```
  where `api_user` is the user login and `365d` is the key lifetime. The response is a table containing the key.

**How to use it** — add the header to every request:

```shell
curl "https://demo.wildcore.tools/api/v1/device" \
  --header "X-Auth-Key: YOUR_KEY"
```

The key can also be passed as a query parameter `?x-auth-key=YOUR_KEY` — handy for a quick check in the browser, but **prefer the header in scripts** (query strings end up in logs).

!!! note "Session login"
    The web panel and apps sign in via `POST /api/v1/auth` with the body
    `{"login": "...", "password": "..."}`, which returns a session key. For integrations
    a long-lived token from `user:generate-key` is more convenient.

### Method 2. Trusted networks (no authorization)

You can allow API access **without a key** for requests coming from trusted IPs/subnets.

1. In the web panel open **Configuration → System configuration → Configuration tab**.
2. In the security block fill in the trusted networks in **CIDR** notation (e.g. `10.0.0.0/8`, `192.168.1.10/32`).

Requests without a key but from a trusted network run as the built-in **`sys`** user (full rights).

!!! warning "Security"
    Trusted networks disable the key check for every address in the list — enable them
    only for a controlled internal segment. For external integrations use a token with a
    limited lifetime.

## Response format

Successful responses share a single envelope:

```json
{
  "statusCode": 200,
  "meta": null,
  "data": { }
}
```

- **`statusCode`** — the result HTTP code;
- **`meta`** — extra data (e.g. pagination), when applicable;
- **`data`** — the payload (an object or an array).

On error, `statusCode` carries the corresponding code (4xx/5xx) and the body describes the error.

## Next

- **[API groups & sections](./groups.md)** — an overview of all method groups by area.
- **[Request examples (curl)](./examples.md)** — ready-to-use examples by group.
- **[Generating scripts with AI](./ai-codegen.md)** — how to use the OpenAPI description with AI.

## SDK & tools

- PHP client (experimental): [github.com/meklis/wildcore-api-client](https://github.com/meklis/wildcore-api-client) ([examples](https://github.com/meklis/wildcore-api-client/tree/master/examples)).
- Since the web panel is an SPA, any method can be inspected in the browser **Network** tab (F12) and replayed in your own code.
