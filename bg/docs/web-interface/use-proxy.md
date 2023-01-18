# Прокси
Ако желаете, можете да настроите системно прокси чрез nginx/apache или друг прокси сървър.

## За какво е?
**Например**

* Направете стандартни портове за уеб
* Добавете SSL сертификат и го направете да работи на https
* Внедряване на допълнителни системи за защита. Например fail2ban или ограничаване на достъпа по IP чрез уеб сървър.

## Прокси настройки
### Wildcore промени
Системата трябва да бъде информирана, че се използва прокси.
Трябва да промените следните настройки:

* PROXY_ENABLED=вярно
* PROXY REAL_IP_HEADER = X-Forwarded-For

Можете да правите промени както през уеб интерфейса (на страницата /config/system/configuration, раздел Параметри на агента), така и във файла /opt/wildcore-dms/.env

_Proxy_REAL_IP_HEADER името на заглавката трябва да съответства на това, което е посочено в конфигурацията на прокси сървъра._



### Пример за конфигурация за nginx
``` 
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


