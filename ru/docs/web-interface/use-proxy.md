# Проксирование 
При желании, вы можете настроить проксирование системы через nginx/apache или любой другой прокси-сервер. 

## Для чего это нужно? 
**Например**

* Сделать стандартные порты для веб
* Добавить SSL-сертификат и сделать работу по https  
* Внедрить дополнительные системы защиты. Например, fail2ban или ограничить доступы по IP с помощью веб-сервера.   

## Настройка проксирования
### Изменения в wildcore
Системе необходимо сообщить о том, что используется прокси.   
Необходимо изменить следующие параметры: 

* PROXY_ENABLED = true
* PROXY_REAL_IP_HEADER = X-Forwarder-For 

Внести изменения можно как через веб-интерфейс (на странице /config/system/configuration, вкладка Agent parameters), так и в файле /opt/wildcore-dms/.env

_Имя заголовка PROXY_REAL_IP_HEADER должно соответствовать тому, что указан в конфигурации прокси._    



### Пример конфигурации для nginx 
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

