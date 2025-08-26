Ви можете встановити проксі для системи через **NGINX**/**Apache**, або будь-який інший проксі-сервер.

## Для чого це?
**Наприклад:**

* Відкриття стандартних портів для Інтернету
* Додання SSL сертифікату та встановлення НТТРS з'єднання
* Реалізування додаткових безпекових функцій, таких як fail2ban або обмеження доступу за ІР-адресою за допомогою веб-сервера.

## Налаштування проксі
### Налаштування Wildcore
Системі потрібно повідомити, що використовується проксі-сервер.

Ви маєте змінити наступні налаштування:

`PROXY_ENABLED=true`

Заголовок `PROXY_REAL_IP_HEADER` має співпадати з тим, що вказано в конфігурації проксі.

Ви можете зробити ці зміні і через веб-інтерфейс (сторінка `/config/system/configuration`, вкладка Параметри агента), і у файлі `/opt/wildcore-dms/.env`.

!!! warning "Увага"
    Впевніться, що порти `80` і `443` відкриті та доступні ззовні (не заблоконі через `ufw`, `iptables` і налаштований форвардінг через `NAT`, якщо ви його використовуєте).


### Налаштування NGINX з HTTPS

1. Встановіть **NGINX** та **Certbot**.
2. Зконфігуруйте ваш DNS так, щоб ім'я домену вказувало на адресу вашого сервера.
3. Застосуйте наступну конфігурацію для **NGINX**:
    ```title="/etc/nginx/sites-enabled/wildcore-proxy.conf" 
    server {
    listen 80;
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
    server_name ІМЯ_ВАШОГО_ДОМЕНУ;
    location / {
       set $connection_header "";
       set $upgrade_header "";
       if ($http_upgrade) {
           set $upgrade_header $http_upgrade;
           set $connection_header "upgrade";
       }
       proxy_set_header Upgrade $upgrade_header;
       proxy_set_header Connection $connection_header;
       proxy_pass      http://localhost:8088;
       proxy_set_header X-Forwarded-For $remote_addr;
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header X-Forwarded-Host $host;
       proxy_set_header X-Forwarded-Server $host;
        }
    }
    ```
4. Змініть наступні рядки в конфігурації:
    ```title="/opt/wildcore-dms/.env"
    NGINX_EXPOSE=0.0.0.0:8088 -> NGINX_EXPOSE=127.0.0.1:8088
    PROXY_ENABLED=no          -> PROXY_ENABLED=yes
    ```
4. Виконайте `cd /opt/wildcore-dms && docker compose up -d` у вашому Терміналі.
5. Отримайте сертифікат через `Certbot` за допомогою наступної команди: 

    `certbot --nginx -d ІМЯ_ВАШОГО_ДОМЕНУ`
