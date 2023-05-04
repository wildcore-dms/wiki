# Updating

**1. Update wca-tool to actual version (information about the current version in our telegram channel)**
```shell
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
```

**2. Run command for update DMS** 
```shell
sudo wca-tool update
```
**The update process takes some time (usually 10-15 minutes).**   

If the installation is successful, a message will be displayed
```shell
...
WildcoreDMS success updated to version ...
...
```

After installation, go to the web panel.
By default, the panel is available on port `8088`, and the default login/password is admin/admin.


## Frequent installation problems
### docker-compose-plugin not installed
Usually the error looks like this:
![](assets/no-docker-compose-plugin.jpg)

It is required that docker-compose be installed on the system as a plugin for docker, and not as a separate utility.

To fix the problem:

1. Install the `docker-compose-plugin` package for your OS (see installation instructions in the official docker documentation - [docs.docker.com](https://docs.docker.com/engine/install/))
2. Check that it really works - the `docker compose version` command should return the plugin version.
3. Continue installing wildcoreDMS with the command ```sudo wca-tool update```

### Agent disabled
After successful installation, when you try to login - a message is displayed
![](assets/agent-disabled.png)
This problem may be related to the installation of the system on "weak" servers (less than indicated in the recommendations)
Solved as follows:

1. We are waiting for 5-10 minutes (the DBMS should start. You can also follow the launch with the `docker logs -f wca-db` command)
2. Execute the command `wca migration:migrate --up *:*`
3. If during the execution of the command we received a connection to the database (for example, Connection refused) - return to point 1.
4. Execute the command `wca system:check`
5. Trying to re-login through the web interface


### Network related errors
Can be manifested by entries in logs like: `Connection refused`, `Connection timeout`, `Forbidden`

Recommended actions:

1. Read from the logs where exactly the attempt is made to connect
2. Make sure that this address is available from the server (check the availability with the same curl in case of HTTP)
3. If everything is fine with the answer - check that everything is fine with the docker (installed according to the official dock, there were no old versions and the version was installed specifically for your system)

After the problem is fixed, the reinstallation can be performed with the `wca-tool update` command.

### Web not working and command wca returned error 
Use command `docker ps -a` for checking working containers and check logs on restarting containers over command `docker logs ...` 
