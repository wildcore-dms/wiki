# Оновлення

**1. Оновлення wca-tool до актуальної версії (інформація про актуальну версію в нашому телеграм-каналі)**
```shell     
sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool     
```     

**2. Виконати команду для оновлення DMS**
```shell     
sudo wca-tool update     
```     
**Процес оновлення займає деякий час (зазвичай 10-15 хвилин).**    

Якщо оновлення пройшло успішно, з’явиться повідомлення
```shell     
...     
WildcoreDMS success updated to version ...     
...     
```     

<span style="color: darkred; font-weight: bold">Якщо ви оновлюєте проміжні (x.x.0) версії, прочитайте рекомендації в журналах змін</span>
