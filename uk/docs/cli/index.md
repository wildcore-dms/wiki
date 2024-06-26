У системі є консольна утиліта - **wca**.
Ця утиліта розширює деякі функції, які недоступні у веб-інтерфейсі, як-от очищення кешу або виконання міграцій.

## Про роботу з wca cli

**Виконайте команду `wca`, щоб отримати список підтримуваних команд**
```shell linenums="1"
$ wca     
WildcoreDMS 0.17.018     

Usage:     
  command [options] [arguments]     

Options:     
  -h, --help            Display help for the given command. When no command is given display help for the list command     
  -q, --quiet           Do not output any message     
  -V, --version         Display this application version     
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output     
  -n, --no-interaction  Do not ask any interactive question     
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug     

Available commands:     
  completion                                      Dump the shell completion script     
  help                                            Display help for a command     
  list                                            List commands     
 api     
  api:routes-list                                 List of routes     
  api:rules-list                                  List of rules     
 autodiscovery     
  autodiscovery:scan                              Run autodiscovery scanner     
 component     
  component:control                               Components control     
  component:dependencies                          Component dependencies     
  component:list                                  Return list of supported components     
 device     
  device:add                                      Create new device     
  device:delete                                   Delete device     
  device:list                                     Table of devices     
  device:update                                   Edit device     
 live_traffic     
  live_traffic:view                               View realtime traffic on interface     
 logs     
  logs:clear                                      Clear switcher_core_actions table     
 migration     
  migration:components-migrate                    Migrate migrations. Default used up migrations     
  migration:list                                  Flush all keys in cache     
...     
```     

**Кожна команда може мати власні аргументи та параметри. Щоб дізнатися, які параметри має команда - додайте `--help` після команди.**
Наприклад,
```shell linenums="1"
$ wca switcher-core:call --help     
Usage:     
  switcher-core:call [options] [--] <ip> <module> [<arguments>...]     

Arguments:     
  ip                        Device ip address     
  module                    Module name     
  arguments                 Arguments. For example interface=pon0/1/1     

Options:     
  -t, --telnet|--no-telnet  Print telnet output     
  -m, --meta=META           Show meta [default: false]     
  -s, --source=SOURCE       Source to use. Can be device(every call from device),store(every call from store) and cache(if not found in store - can be call from device) [default: "device"]     
  -h, --help                Display help for the given command. When no command is given display help for the list command     
  -q, --quiet               Do not output any message     
  -V, --version             Display this application version     
      --ansi|--no-ansi      Force (or disable --no-ansi) ANSI output     
  -n, --no-interaction      Do not ask any interactive question     
  -v|vv|vvv, --verbose      Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug     
```     

## Популярні команди

* `wca cache:clear` - очистити системний кеш
* `wca autodiscovery:scan` - шукати пристрої, щоб не чекати завершення планувальника
* `wca system:check-subscription` - перевірити ключ агента в системі wildcore. Якщо ваш агент був відключений (повідомлення при спробі входу) - ця команда допоможе визначити причину
* `wca supervisor:processes-list` - покаже, які фонові процеси запущені.
* `wca supervisor:control` - дозволяє керувати фоновими процесами. Наприклад, перезапустіть телеграм-бота після зміни налаштувань.



