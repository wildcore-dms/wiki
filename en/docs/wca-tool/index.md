!!! abstract "Overview"

    `wca-tool` is a console utility that allows the installation and upgrading of WildcoreDMS.

    It also provides the ability to create and deploy backups, as well as updating to Development branch versions.

## Installation

To install the `wca-tool`, run the following command:

``` shell
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
```  

To check if the installation was performed correctly, run the following command:

``` 
wca-tool --version
``` 

The console should return the installed version number:

```
wca-tool version 0.21.1
```

## Usage
Run `wca-tool --help` to get a list of supported commands.

```
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
   --dir value    Working directory for agent (default: "/opt/wildcore-dms")
   --key value    License key for your agent
   --verbose      Verbose output with stacktrace (default: false)
   --help, -h     show help (default: false)
   --version, -v  print the version (default: false)

COPYRIGHT:
   wildcore DMS by wildcore.tools @ 2022
```

#### WildcoreDMS installation
```
sudo wca-tool --key=YOUR_AGENT_KEY install 
```

#### Update WildcoreDMS to the latest version

To update the **WildcoreDMS**, run the following command:

```
wca-tool update
```

It will check for new versions and update it if necessary.

!!! tip
    The key can be omitted during the update, it will be read from the system.



If you already have the latest version installed, the following message will be displayed:

```
$ wca-tool update
INFO[2024-02-29 00:10:32] Received update command                      
INFO[2024-02-29 00:10:32] Enabled check version before update          
INFO[2024-02-29 00:10:32] Installed version - 0.21.1, latest version - 0.21.1 
INFO[2024-02-29 00:10:32] Istalled latest version, exiting...  
```

You can use this command in cron, i.e.:

```
0 0 * * * wca-tool update
```

To force an update, use the `--no-check` flag, which will skip the version check and install the latest version.



#### Upgrade WildcoreDMS to a specific version

```
sudo wca-tool update --dev --version=RELEASE_VERSION
```

!!! warning ""
    We do not recommend downgrading your current WildcoreDMS installation.

#### Creating backups

!!! warning
    Backing up and restoring from a backup is only possible, if the system is in default mode (no DMS/Prometheus separation, no collectors, etc.)

    Only **WildcoreDMS** versions `0.21.2` and above support this feature.

!!! tip "**New in version 0.5**"
    - Backup creation no longer requires system shutdown.
    - Backup content now encompasses system files, configurations, database dumps, and TSBD snapshots (Prometheus metrics).

To create a backup, run `wca-tool backup`.

If the backup process was successful, the following message will be displayed:

```
Backup /opt/wildcore-dms-backups/290270907272424.tar.gz success created! 
If you need - you can restore backup by command ./wca-tool restore --path <backup path>
```

#### Restoration from a backup
!!! warning
    Restoring from a backup removes the previous installation completely.

To restore from a backup, run

```
wca-tool restore --path /opt/wildcore-dms-backups/290270907272424.tar.gz
```

If the restoration process was successful, the following message will be displayed:

```
WildcoreDMS success restored from backup /opt/wildcore-dms-backups/290270907272424.tar.gz!
```