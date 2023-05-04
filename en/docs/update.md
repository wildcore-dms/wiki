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

If the updating is successful, a message will be displayed
```shell
...
WildcoreDMS success updated to version ...
...
```

<span style="color: darkred; font-weight: bold">If you update minor(x.x.0) versions, please read recommendations in changelogs</span>