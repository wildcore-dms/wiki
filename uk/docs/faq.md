!!! abstract "Огляд"
    Ця сторінка надає відповіді на часті запитання від наших користувачів.

    Скористайтеся меню справа, щоб перейти до розділу, який вас цікавить.

## Як відкрити Prometheus для зовнішнього додатку (Grafana абощо)
1. Перейдіть до `/opt/wildcore-dms/.env`.
2. Знайдіть та змініть, або додайте наступний рядок:
    `PROMETHEUS_EXPOSE=0.0.0.0:9090`
3. Виконайте `cd /opt/wildcore-dms && docker compose up -d` у вашому Терміналі.

## Як перенести WildCoreDMS на інший сервер
1. Зробіть повну резервну копію наступною командою:

    ```
    wca-tool backup
    ```

2. Знайдіть резервну копію у `/opt/wildcore-backups` та перенесіть на цільовий сервер.
3. Відновіться з резервної копії виконавши
    ```
    sudo wca-tool restore --path path-to-you-backup.tar.gz
    ```

4. Перейдіть до [**Особистого кабінету**](https://cabinet.wildcore.tools/) і скиньте збережену IP-адресу (іконка розірваного ланцюга).
5. Зареєеструйте нову ІР-адресу на новому сервері за допомогою
    ```
    wca-tool register
    ```

6. Виконайте наступну команду на новому сервері:
    ```
    cd /opt/wildcore-dms && docker compose up -d --build
    ```