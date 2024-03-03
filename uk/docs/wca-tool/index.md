!!! abstract "Огляд"
    `wca-tool` це консольний інструмент, що використовується для встановлення та оновлення WildcoreDMS.

    Він також надає можливість створення та відтворення резервних копій, а також оновлення до версій з гілки Розробки.

## Встановлення та оновлення `wca-tool`

Щоб встановити або оновити інструмент `wca-tool`, виконайте наступну команду:

``` shell
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
```  
Щоб перевірити правильність встановлення, виконайте наступну команду:

``` 
wca-tool --version
``` 

Консоль має повернути номер встановленої версії:

```
wca-tool version 0.5.1
```

## Використання
Щоб отримати повний список доступних функцій, виконайте команду `wca-tool --help`:

```
$ wca-tool --help
NAME:
   wca-tool - Cli tool for install/update/upgrade wildcoreDMS

USAGE:
   ./wca-tool [global options] command [command options] [arguments...]

VERSION:
   0.5.1

COMMANDS:
   install   Install new wildcoreDMS instance
   update    Upgrade wildcoreDMS instance
   backup    Create backup of instance
   restore   Restore backup of instance
   register  Register wildcoreDMS instance
   help, h   Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --dir value    Working directory for agent (default: "/opt/wildcore-dms")
   --key value    License key for your agent
   --verbose      Verbose output with stacktrace (default: false)
   --help, -h     show help (default: false)
   --version, -v  print the version (default: false)

COPYRIGHT:
   wildcore DMS by wildcore.tools @ 2022
```

#### Встановлення WildcoreDMS

Щоб встановити WildcoreDMS, виконайте наступну команду:
```
sudo wca-tool --key=YOUR_AGENT_KEY install 
```

#### Оновлення WildcoreDMS до найновішої версії

Щоб оновити **WildcoreDMS**, виконайте наступну команду:

```
sudo wca-tool update 
```

Вона перевірить наявніть нових версій, та встановить їх, якщо це необхідно.

!!! tip "Підказка"
    Ключ агента можна опустити під час оновлення, він буде зчитаний з системи.

Якщо у вас вже встановлена найновіша версія, буде виведено наступне повідомлення:

```
$ wca-tool update
INFO[2024-02-29 00:10:32] Received update command                      
INFO[2024-02-29 00:10:32] Enabled check version before update          
INFO[2024-02-29 00:10:32] Installed version - 0.21.2, latest version - 0.21.2 
INFO[2024-02-29 00:10:32] Istalled latest version, exiting...  
```

Ви можете використовувати цю команду в `cron`, наприклад:

```
0 0 * * * wca-tool update
```

Щоб оновитися примусово, використайте аргумент `--no-check`, що пропустить перевірку встановленої версії та встановить найновішу.


#### Оновлення WildcoreDMS до конкретної версії

```
sudo wca-tool update --dev --version=RELEASE_VERSION
```

!!! warning ""
    Ми не рекомендуємо знижувати версію вашої поточної інсталяції WildcoreDMS.

#### Створення резервних копій

!!! warning "Увага"
    Створення резервних копій та відновлення з них можливе лише у тому випадку, якщо ваша система працює у стандартному режимі (без розділення СУБД/Prometheus, коллекторів, та ін.)



    Цю можливість підтримують лише версії **WildcoreDMS** `0.21.2` і вище.

!!! tip "**Нове у версії 0.5**"
    - Створення резервних копій більше не вимагає повної зупинки системи.
    - Вміст резервних копій тепер включаює файли системи та конфігурацій, дампи бази даних і знімки TSBD (метрики Prometheus).

Щоб створити резервну копію, виконайте команду `wca-tool backup`.

Якщо процес створення резервної копії пройшов успішно, буде виведено наступне повідомлення:

```
Backup /opt/wildcore-dms-backups/290270907272424.tar.gz success created! 
If you need - you can restore backup by command ./wca-tool restore --path <backup path>
```

#### Відновлення з резервних копій
!!! warning "Увага"
    Відновлення з резервної копії повністю видаляє попередньо встановлену систему.

Щоб відновитися з резервної копії, виконайте команду

```
wca-tool restore --path /opt/wildcore-dms-backups/290270907272424.tar.gz
```

Якщо процес відновлення пройшов успішно, буде виведено наступне повідомлення:

```
WildcoreDMS success restored from backup /opt/wildcore-dms-backups/290270907272424.tar.gz!
```