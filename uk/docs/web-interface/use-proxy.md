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

`PROXY_ENABLED=yes`

Заголовок `PROXY_REAL_IP_HEADER` має співпадати з тим, що вказано в конфігурації проксі.

Ви можете зробити ці зміні і через веб-інтерфейс (`Конфігурація > Конфігурація системи` → розділ «Безпека», див. [Налаштування системи](../installation-and-updating/env-configuration.md)), і у файлі `/opt/wildcore-dms/.env`.

!!! warning "Увага"
    Впевніться, що порти `80` і `443` відкриті та доступні ззовні (не заблоконі через `ufw`, `iptables` і налаштований форвардінг через `NAT`, якщо ви його використовуєте).


### Налаштування NGINX з HTTPS

1. Встановіть **NGINX** та **Certbot**.
2. Зконфігуруйте ваш DNS так, щоб ім'я домену вказувало на адресу вашого сервера.
3. Застосуйте наступну конфігурацію для **NGINX**:
    ```nginx title="/etc/nginx/sites-enabled/wildcore-proxy.conf" 
    server {
    listen 80;
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
    server_name ІМЯ_ВАШОГО_ДОМЕНУ;

    client_max_body_size 500M;

    # Стиснення відповідей (gzip)
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
       proxy_set_header Upgrade $upgrade_header;
       proxy_set_header Connection $connection_header;
       proxy_pass       http://localhost:8088;
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

### Стиснення відповідей (gzip) { #gzip }

Блок `gzip` у конфігурації вище вмикає стиснення відповідей на проксі. Це помітно прискорює роботу
веб-панелі через повільні канали та мобільний інтернет: списки пристроїв, ONU, подій та інші
відповіді API (JSON) стискаються в кілька разів.

| Директива | Значення |
|-----------|----------|
| `gzip on` | Увімкнути стиснення |
| `gzip_comp_level 5` | Рівень стиснення (1–9). 5 — баланс між розміром і навантаженням на CPU |
| `gzip_min_length 1024` | Не стискати відповіді менші за 1 КБ — для них виграшу немає |
| `gzip_proxied any` | Стискати відповіді й тоді, коли перед NGINX стоїть ще один проксі/CDN |
| `gzip_vary on` | Додавати заголовок `Vary: Accept-Encoding` для коректного кешування |
| `gzip_types` | Типи вмісту для стиснення: HTML/CSS/JS, JSON відповіді API, SVG, маніфест застосунку. `text/html` стискається завжди |

Перевірити, що стиснення працює:

```bash
curl -s -o /dev/null -w '%{size_download}\n' -H 'Accept-Encoding: gzip' https://dms.example.com/
curl -sI -H 'Accept-Encoding: gzip' https://dms.example.com/ | grep -i content-encoding
```

У відповіді має бути `Content-Encoding: gzip`. Після змін застосуйте конфігурацію:
`sudo nginx -t && sudo systemctl reload nginx`.
