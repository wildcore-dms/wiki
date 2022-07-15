## Об утилите
**WCA-TOOL** - консольная утилита, обеспечивающая установку системы wildcoreDMS с нуля и её последующее обновление.    
Так же доступна возможность создания бекапов, разворачивания бекапов и получения dev-версий при необходимости.   


## Установка/Обновление
```shell
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
```   
**Проверка успешности установки**    
Выполнить следующую команду:    
```shell 
wca-tool --version
``` 
В консоли должно вернуть номер установленной версии: 
```shell
wca-tool version 0.2.5
```
   
## Использование 
**Выполните `wca-tool --help` для получения списка поддерживаемых команд** 
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
### Примеры 
**Установка wildcoreDMS** 
```shell
sudo wca-tool --key=YOUR_AGENT_KEY install 
```

**Обновление wildcoreDMS до последней версии** 
```shell
sudo wca-tool update 
```
*Ключ при обновлении можно не указывать, он будет прочитан с системы*     

**Обновление на определенную версию (понижать версию не рекомендуется)** 
```shell
sudo wca-tool update --dev --version=RELEASE_VERSION
```
*Ключ при обновлении можно не указывать, он будет прочитан с системы*     

**Создание бекапов (например обновлением на другую минорную версию)** 
```shell
sudo wca-tool backup
```
*При создании бекапа система будет остановлена*       
*Бекапы создаются в каталоге `/opt/wildcore-dms-backups`*     
