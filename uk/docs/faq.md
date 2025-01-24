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
   
## Шифрування доступів до обладнання 
!!! note "Доступно з версії 0.25"
!!! note "Для нових інсталяцій шифрування буде ввімкнено за замовчуванням."

Щоб після оновлення зашифрувати доступи, виконайте команду:
```shell
sudo wca security:enable-encryption
```

Приклад виконання:
```shell
$ sudo wca security:enable-encryption

                
    This command will encrypt access to the equipment in the database!
    The action is irreversible!!
    If you lose your decryption key, you will lose your passwords!!!

        
Are you sure you want to proceed? (y/n, default: no)? y
Encryption key not generated, trying to create
Encrypt password created - %&h0p5E&EQe*Ihj
Access 'Access L2' encrypted!
Encryption success enabled!
```

Першим кроком при шифруванні буде створено пароль (якщо він не був створений раніше) і збережено у файлі `/opt/wildcore-dms/.encrypt_passwd`.

!!! warning "У разі зміни або втрати пароля доступи будуть неможливі для читання."
