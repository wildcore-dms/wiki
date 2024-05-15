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

`PROXY_ENABLED=true`

`Proxy_REAL_IP_HEADER` header name must match the value specified in the proxy configuration.

You can make these changes both through the web interface (on the `/config/system/configuration` page, Agent parameters tab), and in the `/opt/wildcore-dms/.env` file.

!!! warning
    Make sure ports `80` and `443` are open and available for the outside world (not blocked by `ufw`, `iptables` and forwared through `NAT` if you're using one).

### NGINX Setup with HTTPS

1. Install both **NGINX** and **Certbot**.
2. Configure your DNS domain name to point to your server address.
3. Apply the following configuration for **NGINX**:
   ```nginx
   cat /etc/nginx/sites-enabled/wildcore-proxy
   server {
   listen 80;
   root /var/www/html;
   index index.html index.htm index.nginx-debian.html;
   server_name YOUR_DOMAIN_NAME;
   location / {
      proxy_pass      http://localhost:8088;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header X-Forwarded-Host $host;
      proxy_set_header X-Forwarded-Server $host;
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
