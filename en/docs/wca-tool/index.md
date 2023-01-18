## About the utility
**WCA-TOOL** is a console utility that provides installation of wildcoreDMS from scratch and its subsequent update.
Also available is the ability to create backups, deploy backups and get dev versions if necessary.


## Install/Upgrade
```shell
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
```   
**Checking if the installation was successful**
Run the following command:
```shell 
wca-tool --version
``` 
The console should return the installed version number:
```shell
wca-tool version 0.2.5
```

## Usage
**Run `wca-tool --help` for a list of supported commands**
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
### Examples
**Install wildcoreDMS**
```shell
sudo wca-tool --key=YOUR_AGENT_KEY install 
```

**Update wildcoreDMS to latest version**
```shell
sudo wca-tool update 
```
*The key can be omitted during the update, it will be read from the system*

**Upgrade to a specific version (downgrading is not recommended)**
```shell
sudo wca-tool update --dev --version=RELEASE_VERSION
```
*The key can be omitted during the update, it will be read from the system*

**Creating backups (for example, by updating to another minor version)**
```shell
sudo wca-tool backup
```
*When creating a backup, the system will be stopped*
*Backups are created in the directory `/opt/wildcore-dms-backups`*

