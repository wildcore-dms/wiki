# Проксі
При бажанні ви можете налаштувати проксі-сервер системи через nginx/apache або будь-який інший проксі-сервер.

## Для чого це?
**Наприклад**

* Зробіть стандартні порти для Інтернету
* Додайте сертифікат SSL і змусьте його працювати на https
* Впровадити додаткові системи захисту. Наприклад, fail2ban або обмежити доступ за IP за допомогою веб-сервера.

## Налаштування проксі
### Зміни Wildcore
Системі необхідно повідомити, що використовується проксі.
Вам потрібно змінити такі налаштування:

* PROXY_ENABLED=true
* PROXY REAL_IP_HEADER = X-Forwarded-For

Зміни можна вносити як через веб-інтерфейс (на сторінці /config/system/configuration, вкладка Параметри агента), так і у файлі /opt/wildcore-dms/.env

Ім’я заголовка _Proxy_REAL_IP_HEADER має збігатися з тим, що зазначено в конфігурації проксі._



### Приклад конфігурації для nginx
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



