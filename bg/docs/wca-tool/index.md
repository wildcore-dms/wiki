## За помощната програма
**WCA-TOOL** е конзолна помощна програма, която осигурява инсталиране на wildcoreDMS от нулата и последващото му актуализиране.
Налична е и възможността за създаване на резервни копия, внедряване на резервни копия и получаване на версии за разработчици, ако е необходимо.


## Инсталиране/Актуализиране
```shell
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
```   
**Проверява се дали инсталацията е успешна**
Изпълнете следната команда:
```shell 
wca-tool --version
``` 
Конзолата трябва да върне номера на инсталираната версия:
```shell
wca-tool version 0.2.5
```

## Използване
**Изпълнете `wca-tool --help` за списък с поддържани команди**
```shell
$ wca-tool --help
NAME:
   wca-tool - Cli tool for install/update/upgrade wildcoreDMS

USAGE:
   ./wca-tool [global options] command [command options] [arguments...]

VERSION:
   0.2.5

COMMANDS:
   install   Install new wildcoreDMS instance
   update    Upgrade wildcoreDMS instance
   backup    Create backup of instance
   restore   Restore backup of instance
   register  Register wildcoreDMS instance
   help, h   Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --dir value    Working directory for age (default: "/opt/wildcore-dms")
   --key value    License key for your agent
   --verbose      Verbose output with stacktrace (default: false)
   --help, -h     show help (default: false)
   --version, -v  print the version (default: false)

COPYRIGHT:
   wildcore DMS by wildcore.tools @ 2022
```
### Примери
**Инсталирайте wildcoreDMS**
```shell
sudo wca-tool --key=YOUR_AGENT_KEY install 
```

**Актуализирайте wildcoreDMS до най-новата версия**
```shell
sudo wca-tool update 
```
*Ключът може да бъде пропуснат по време на актуализацията, той ще бъде прочетен от системата*

**Надградете до конкретна версия (понижаването не се препоръчва)**
```shell
sudo wca-tool update --dev --version=RELEASE_VERSION
```
*Ключът може да бъде пропуснат по време на актуализацията, той ще бъде прочетен от системата*

**Създаване на резервни копия (например чрез актуализиране до друга второстепенна версия)**
```shell
sudo wca-tool backup
```
*При създаване на резервно копие, системата ще бъде спряна*
*Резервните копия се създават в директорията `/opt/wildcore-dms-backups`*

