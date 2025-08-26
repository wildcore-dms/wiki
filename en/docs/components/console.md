# Компонент «Консоль» 

!!! info "Доступно з версії 0.27"


## Purpose
- Connecting to the device console (Telnet/SSH) из Wildcore.
- Automatic login/password input по saved в системе кредам.
- Access via web interface (на базе ttyd) и из CLI.
- Log saving (общения с оборудованием) 
---

## Configuration 
### Enabling the component    

* В админке включите компонент «Консоль» (по умолчанию выключен).
* Refresh the page, откройте Настройки → Консоль и включите опцию «Enable web».
* Подождите ~1 минуту, пока поднимется веб-сервис.
* Configure role permissions (см. ниже).

<iframe width="100%" height="415"
  src="https://www.youtube.com/embed/g1KEANz6v7M">
</iframe>


### Permissions (RBAC)
Доступно три разрешения:    

* Allow access to console — доступ к Telnet/SSH без авто-логина.
* Allow access to console с автоматической авторизацией — авторизация по логин/пароль сохраненных в системе
* Access to view equipment logs

!!! note "Выбор Telnet/SSH происходит автоматически по конфигурации устройства"


### Configuration Nginx (WebSocket/Upgrade)
Если у вас настроено проксирование wildcore через nginx (например, для добавления сертификата) - необходимо сконфигурировать так же ваш внешний nginx для работы с сокетом.      
Добавьте эту конфигурацию

```title="блок location {} в nginx"
set $connection_header "";
set $upgrade_header "";
if ($http_upgrade) {
    set $upgrade_header $http_upgrade;
    set $connection_header "upgrade";
}
proxy_set_header Upgrade $upgrade_header;
proxy_set_header Connection $connection_header;
```

## Usage
### Via WEB
<iframe width="100%" height="415"
src="https://www.youtube.com/embed/g1KEANz6v7M">
</iframe>   

**Two links will appear in the device card:**  

* Console - without auto-login
* Console (auto-login) - открытие консоли и автоматический логин по доступам с системы 

Specific buttons can be enabled via role permissions  

### Via CLI 
Connection with auto-login:
```shell
wca console:open <device_ip>
```   

Connection with manual login/password entry:
```shell
wca console:open <device_ip> -l
```   
