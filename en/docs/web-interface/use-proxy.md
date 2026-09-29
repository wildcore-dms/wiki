You can set up a proxy for the system through **NGINX**/**Apache** or any other proxy server.

## What is it for?

**For example**

- Open standard ports for the web
- Add an SSL certificate and make it work on https
- Implement additional security features, i.e. fail2ban or access restriction by IP using a web server.

## Proxy settings

### Wildcore setup

The system needs to be informed that a proxy is being used.
You have to change the following settings:

`PROXY_ENABLED=yes`

`Proxy_REAL_IP_HEADER` header name must match the value specified in the proxy configuration.

You can make these changes both through the web interface (`Configuration > System configuration` → "Security" section, see [System configuration](../installation-and-updating/env-configuration.md)), and in the `/opt/wildcore-dms/.env` file.

!!! warning
    Make sure ports `80` and `443` are open and available for the outside world (not blocked by `ufw`, `iptables` and forwared through `NAT` if you're using one).

### NGINX Setup with HTTPS

1. Install both **NGINX** and **Certbot**.
2. Configure your DNS domain name to point to your server address.
3. Apply the following configuration for **NGINX**:

   ```nginx title="/etc/nginx/sites-enabled/wildcore-proxy.conf"
   server {
      listen 80;
      root /var/www/html;
      index index.html index.htm index.nginx-debian.html;
      server_name YOUR_DOMAIN_NAME;

      client_max_body_size 500M;

      # Response compression (gzip)
      gzip on;
      gzip_comp_level 5;
      gzip_min_length 1024;
      gzip_proxied any;
      gzip_vary on;
      gzip_types text/plain text/css text/xml text/javascript
             application/javascript application/x-javascript application/json
             application/xml application/xml+rss application/manifest+json
             image/svg+xml;

      location / {
         set $connection_header "";
         set $upgrade_header "";
         if ($http_upgrade) {
            set $upgrade_header $http_upgrade;
            set $connection_header "upgrade";
         }
         proxy_set_header  Upgrade $upgrade_header;
         proxy_set_header  Connection $connection_header;
         proxy_pass        http://127.0.0.1:8088;
         proxy_set_header  X-Forwarded-For $remote_addr;
         proxy_set_header  Host $host;
         proxy_set_header  X-Forwarded-Proto $scheme;
         proxy_set_header  X-Forwarded-Host $host;
         proxy_set_header  X-Forwarded-Server $host;
      }
   }
   ```

4. Change the following lines in `/opt/wildcore-dms/.env`:
   ```
   NGINX_EXPOSE=0.0.0.0:8088 -> NGINX_EXPOSE=127.0.0.1:8088
   PROXY_ENABLED=no          -> PROXY_ENABLED=yes
   ```
5. Run `cd /opt/wildcore-dms && docker compose up -d` in your Terminal.
6. Get a sertificate through `Certbot` by running the following command:

   `certbot --nginx -d YOUR_DOMAIN_NAME`

### Response compression (gzip) { #gzip }

The `gzip` block in the configuration above enables response compression on the proxy. It
noticeably speeds up the web panel over slow links and mobile internet: device, ONU and event
lists and other API responses (JSON) are compressed several times.

| Directive | Meaning |
|-----------|---------|
| `gzip on` | Enable compression |
| `gzip_comp_level 5` | Compression level (1–9). 5 is a balance between size and CPU load |
| `gzip_min_length 1024` | Don't compress responses smaller than 1 KB — no gain for them |
| `gzip_proxied any` | Compress responses even when another proxy/CDN sits in front of NGINX |
| `gzip_vary on` | Add the `Vary: Accept-Encoding` header for correct caching |
| `gzip_types` | Content types to compress: HTML/CSS/JS, API JSON responses, SVG, app manifest. `text/html` is always compressed |

Check that compression works:

```bash
curl -s -o /dev/null -w '%{size_download}\n' -H 'Accept-Encoding: gzip' https://dms.example.com/
curl -sI -H 'Accept-Encoding: gzip' https://dms.example.com/ | grep -i content-encoding
```

The response must contain `Content-Encoding: gzip`. Apply the configuration after changes:
`sudo nginx -t && sudo systemctl reload nginx`.
