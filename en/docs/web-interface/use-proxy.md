# Proxying
If desired, you can set up system proxying through nginx/apache or any other proxy server.

## What is it for?
**For example**

* Make standard ports for the web
* Add an SSL certificate and make it work on https
* Implement additional protection systems. For example, fail2ban or restrict access by IP using a web server.

## Proxy settings
### Wildcore changes
The system needs to be informed that a proxy is being used.
You need to change the following settings:

* PROXY_ENABLED=true
* PROXY REAL_IP_HEADER = X-Forwarded-For

You can make changes both through the web interface (on the /config/system/configuration page, Agent parameters tab), and in the /opt/wildcore-dms/.env file

_Proxy_REAL_IP_HEADER header name must match what is specified in the proxy configuration._



### Configuration example for nginx
```nginx linenums="1"
server {
    listen 80;
    listen 443 ssl;
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
    ssl_prefer_server_ciphers on;
    add_header Strict-Transport-Security max-age=15768000;

    gzip on;
    gzip_comp_level 5;
    gzip_disable "msie6";
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    server_name wildcore.example.com;
    location / {
       proxy_set_header X-Forwarder-For $remote_addr;
       proxy_pass http://127.0.0.1:8088/;
    }
}
```


