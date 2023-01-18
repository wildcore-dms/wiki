Системата има конзолна помощна програма - **wca**.
Тази помощна програма разширява някои функции, които не са налични в уеб интерфейса, като например изчистване на кеша или извършване на миграции.

## За работата с wca cli

**Изпълнете командата `wca list`, за да получите списък с поддържани команди**
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

**Всяка команда може да има свои собствени аргументи и опции. За да разберете какви параметри има командата - добавете `--help` след командата.**
Например,
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

## Популярни команди

* `wca cache:clear` - изчистване на системния кеш
* `wca autodiscovery:scan` - търсене на устройства, за да не чакате, докато планировчикът завърши
* `wca system:check-subscription` - проверка на ключа на агента в wildcore система. Ако вашият агент е бил деактивиран (известие при опит за влизане) - тази команда ще ви помогне да определите причината
* `wca supervisor:processes-list` - ще покаже кои фонови процеси се изпълняват.
* `wca supervisor:control` - позволява ви да управлявате фонови процеси. Например, рестартирайте телеграмния бот след промяна на настройките.


