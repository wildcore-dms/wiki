Система має консольну утиліту - **wca**.
Ця утиліта розширює деякий функціонал, недоступний у веб-інтерфейсі, наприклад, очищення кеша або виконання міграцій.

## Про роботу з wca cli

**Виконайте команду `wca list` щоб отримати список підтримуваних команд**
```shell
$ wca list
WCAA CLI 0.1

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
 alerts
  alerts:send-alerts                              Send alerts by event
  alerts:telegram-bot                             Send alerts by event
 component
  component:control                               Components control
  component:dependencies                          Component dependencies
  component:list                                  Return list of supported components
 device
  device:add                                      Create new device
  device:delete                                   Delete device
  device:list                                     Table of devices
  device:update                                   Edit device
 device-access
  device-access:add                               Create new device access
  device-access:delete                            Delete access device
  device-access:edit                              Update device access
  device-access:list                              Table of device accesses
 device-model
  device-model:list                               Table of device models
...
```

**Кожна команда може мати свої аргументи та параметри. Щоб дізнатися, які параметри є у команди - допишіть `--help` після команди.**
Наприклад,
```shell
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

* `wca cache:clear` - очистити кеш системи
* `wca autodiscovery:scan` - виконати пошук пристроїв, щоб не чекати поки відпрацює планувальник
* `wca system:check-subscription` - перевірити ключ агента у системі wildcore. Якщо ваш агент був відключений (сповіщення під час спроби входу) - дана команда допоможе визначити причину
* `wca supervisor:processes-list` - покаже, які фонові процеси працюють.
* `wca supervisor:control` - дозволяє керувати фоновими процесами. Наприклад, виконайте перезапуск бота телеграм після зміни налаштувань.


