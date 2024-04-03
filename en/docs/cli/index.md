The system has a console utility - **wca**.
This utility extends some functionality that is not available in the web interface, such as clearing the cache or performing migrations.

## About working with wca cli

**Run the command `wca` to get a list of supported commands**
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

**Each command can have its own arguments and options. In order to find out what parameters the command has - add `--help` after the command.**
For example,
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

## Popular commands

* `wca cache:clear` - clear system cache
* `wca autodiscovery:scan` - search for devices so as not to wait until the scheduler completes
* `wca system:check-subscription` - check agent key in wildcore system. If your agent has been disabled (notification when trying to login) - this command will help determine the reason
* `wca supervisor:processes-list` - will show which background processes are running.
* `wca supervisor:control` - allows you to manage background processes. For example, restart the telegram bot after changing the settings.


