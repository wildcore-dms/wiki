## **WildcoreDMS** - система моніторингу, сповіщень і менеджменту пристроїв.

WildcoreDMS - це система, яка направлена на діагностику, моніторинг і керування обладнанням. 
Основна мета - розвантажити інженерів/адмінів, дати можливість монтажнику провести діагностику в полі,
а оператору зорієнтуватися у проблемі, цим скоротивши час реакції. 

### Базовий фукціонал
* Модульність – можливість підключати тільки необхідні компоненти   
* Робота в Docker
* Легка установка та оновлення - за допомогою спеціальної утиліти встановлення та оновлення проводиться у декілька команд
* Легке налаштування системи
* HTTP RestAPI 
* Гнучке керування правами доступу користувачів, обмеження видимості груп пристроїв
* Логування дій користувачів, роботи з обладнанням
* Збір метрик в Prometheus

### Підтримувані вендори

* Dlink
* Edge-Core
* Huawei
* BDcom
* C-data
* Mikrotik
* ZTE       

Повний список підтримуваного обладнання за моделями - [https://github.com/meklis/switcher-core/blob/master/docs/DEVICES.md](https://github.com/meklis/switcher-core/blob/master/docs/DEVICES.md)