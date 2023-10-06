## Про утиліту
**WCA-TOOL** — це консольна утиліта, яка забезпечує встановлення wildcoreDMS з нуля та його подальше оновлення.
Також доступна можливість створювати резервні копії, розгортати резервні копії та отримувати версії для розробників, якщо це необхідно.


## Встановити/оновити
```shell     
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool     
```        
**Перевірка успішності встановлення**
Виконайте таку команду:
```shell      
wca-tool --version     
```      
Консоль має повернути номер встановленої версії:
```shell     
wca-tool version 0.2.5     
```     

## Використання
**Запустіть `wca-tool --help`, щоб переглянути список підтримуваних команд**
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
### Приклади
**Встановити wildcoreDMS**
```shell     
sudo wca-tool --key=YOUR_AGENT_KEY install      
```     

**Оновіть wildcoreDMS до останньої версії**
```shell     
sudo wca-tool update      
```     
*Ключ можна пропустити під час оновлення, він буде прочитаний із системи*

**Оновіть до певної версії (повернення не рекомендується)**
```shell     
sudo wca-tool update --dev --version=RELEASE_VERSION     
```     
*Ключ можна пропустити під час оновлення, він буде прочитаний із системи*

**Створення резервних копій (наприклад, шляхом оновлення до іншої проміжної версії)**
```shell     
sudo wca-tool backup     
```     
*Під час створення резервної копії система буде зупинена*
*Резервні копії створюються в каталозі `/opt/wildcore-dms-backups`*


