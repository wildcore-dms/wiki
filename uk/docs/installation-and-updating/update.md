# Оновлення

1. Оновіть `wca-tool` до останньої версії.

    ``` shell linenums="1"
    sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
    ```

    !!! tip "Підказка"
        Примітки до випусків нових версій можна знайти у нашому [Телеграм-каналі](https://t.me/wildcore_dms_channel)


2. Виконайте наступну команду для оновлення **WildcoreDMS**.

    ``` shell linenums="1"
    sudo wca-tool update
    ```

    !!! note "Примітка"
        Процесс встановлення може зайняти деякий час, зазвичай 10-15 хвилин.

    Якщо встановлення пройшло успішно, буде виведено наступне повідомлення:

    ``` { .shell .no-copy }
    WildcoreDMS success updated to version x.xx.xx!
    Now, you can use wildcoreDMS by URL: http://<service ip|domain>:8088
    Default login/password - admin/admin

    You can change some parameters in /opt/wildcore-dms/.env file, as listen ports for example
    ```

    !!! tip "Підказка"
        Оновлюючи проміжну (x.x.0) версію, перегляньте рекомендації, наведені у примітках до випуску.