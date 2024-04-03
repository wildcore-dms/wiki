# Updating

1. Update the `wca-tool` to the latest version.
    
    ``` shell linenums="1"
    sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
    ```

    !!! tip
        Release notes can be found in our [Telegram channel](https://t.me/wildcore_dms_channel)


2. Execute the following command to update **WildcoreDMS**.

    ``` shell linenums="1"
    sudo wca-tool update
    ```

    !!! note
        The installation process may take some time (usually about 10-15 minutes)

    If the installation was successful, the following message will be displayed:
    ```{ .shell .no-copy }
    WildcoreDMS success updated to version x.xx.xx!
    Now, you can use wildcoreDMS by URL: http://<service ip|domain>:8088
    Default login/password - admin/admin

    You can change some parameters in /opt/wildcore-dms/.env file, as listen ports for example
    ```

    !!! tip
        When updating minor (x.x.0) versions, please review the recommendations provided in the release notes.