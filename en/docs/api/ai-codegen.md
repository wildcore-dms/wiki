# Generating scripts with AI

The API description in **OpenAPI** format is machine-readable, so it's convenient to hand
it to an AI assistant (Claude, ChatGPT, etc.) and have it generate a ready script for your
task — without reading the whole specification by hand.

## Step 1. Get the API description

Download the specification from your server:

```shell
curl -s https://demo.wildcore.tools/swagger/openapi.yaml -o openapi.yaml
```

The file is large (dozens of methods). If your assistant has a context-size limit,
**cut out only the section you need**: open [Swagger](index.md), find the methods you
want (groups are described on the [API groups & sections](./groups.md) page) and copy just those.

## Step 2. Give the assistant context

For the script to work right away, always state three things in your prompt:

1. **Base URL** — methods live under the `https://<your-server>/api/v1` prefix.
2. **Authentication** — the `X-Auth-Key: <token>` header (see [Authentication](./index.md)).
3. **Response format** — payload is in the `data` field, wrapped in `{statusCode, meta, data}`.

## Step 3. State the task

Example prompt to the AI:

> Here is a fragment of the Wildcore DMS OpenAPI specification (attaching `openapi.yaml`).
> Base URL is `https://wildcore.example.com/api/v1`, auth is the `X-Auth-Key` header.
> Write a **Python script** that:
> 1) fetches all devices (`GET /device`);
> 2) for each OLT-type device, gets the list of unregistered ONUs;
> 3) prints the result as CSV.
> Read the token from the `WC_KEY` environment variable, add error handling and pagination.

The AI returns a ready script; if needed, ask it to rewrite in another language
(bash/PHP/JS) or add logic.

## Tips for a good result

- **Narrow the context.** Pass only the methods the task needs — the answer will be more
  accurate and the risk of "inventing" non-existent fields lower.
- **Ask it to stick to the schema.** Add: "use only fields present in the specification".
- **Ask for parameterization.** Token and address via environment variables, not hard-coded.
- **Iterate on errors.** If the script returns an error, paste the server response (the
  field with the code and text) back to the assistant and ask it to fix it.
- **Test on safe data.** First run the script against a test/demo server
  ([demo.wildcore.tools](https://demo.wildcore.tools/swagger/), `admin/admin`), and only
  then against production.

## Security

- **Never paste a real token** into the AI conversation — use a placeholder; keep the real
  key in an environment variable or a secret store.
- For integrations, issue a **dedicated user** with the required rights and a key with a
  limited lifetime — that makes access easy to revoke.
- **Read the generated code before running it**, especially methods that change data
  (`POST`/`PUT`/`DELETE`).
