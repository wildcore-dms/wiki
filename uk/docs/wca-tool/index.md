## Про утиліту
**WCA-TOOL** - консольна утиліта, що забезпечує встановлення системи wildcoreDMS з нуля та її подальше оновлення.
Також доступна можливість створення бекапів, розгортання бекапів та отримання dev-версій при необхідності.


## Встановлення/Оновлення
```shell
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca- tool && sudo chmod +x /usr/local/bin/wca-tool
````
**Перевірка успішності встановлення**
Виконати таку команду:
```shell
wca-tool --version
````
У консолі має повернути номер встановленої версії:
```shell
wca-tool version 0.2.5
````
   
## Використання
**Виконайте `wca-tool --help` для отримання списку підтримуваних команд**
```shell
$ wca-tool --help
NAME:
   wca-tool - Cli tool for install/update/upgrade wildcoreDMS

USAGE:
   ./wca-tool [global options] command [command options] [arguments...]

VERSION:
   0.2.5

COMMANDS:
   install Install new wildcoreDMS instance
   update Upgrade wildcoreDMS instance
   backup Create backup of instance
   restore Restore backup of instance
   register Register wildcoreDMS instance
   Help, h Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --dir value Working directory for age (докладніше: "/opt/wildcore-dms")
   --key value License key for your agent
   --verbose Verbose output with stacktrace (default: false)
   --help, -h show help (default: false)
   --version, -v print the version (default: false)

COPYRIGHT:
   wildcore DMS by wildcore.tools @ 2022
````
### Приклади
**Установка wildcoreDMS**
```shell
sudo wca-tool --key=YOUR_AGENT_KEY install
````

**Оновлення wildcoreDMS до останньої версії**
```shell
sudo wca-tool update
````
*Ключ при оновленні можна не вказувати, він буде прочитаний із системи*

**Оновлення на певну версію (знижувати версію не рекомендується)**
```shell
sudo wca-tool update --dev --version=RELEASE_VERSION
````
*Ключ при оновленні можна не вказувати, він буде прочитаний із системи*

**Створення бекапів (наприклад, оновленням на іншу мінорну версію)**
```shell
sudo wca-tool backup
````
*При створенні бекапа система буде зупинена*
*Бекапи створюються в каталозі `/opt/wildcore-dms-backups`*
