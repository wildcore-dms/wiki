!!! abstract "Огляд"
    Ця сторінка надає різноманітні помилки, з якими ви можете зустрітися під час роботи із зовнішнім застосунком Prometheus, та способи їх вирішення.

    Скористайтеся меню справа, щоб перейти до розділу, який вас цікавить.

### Падіння Prometheus

!!! failure "Помилка"
    Виникла непередбачувана помилка, зверніться до адміністратора
    
    (Client (http://wca-prometheus:9090/prometheus) returned unsupported response: )

!!! success "Вирішення"
    1. Перевірте логи wca-prometheus за допомогою `docker logs wca-prometheus --tail 30`.
    2. Якщо у логах присутня помилка

        ```{ .shell .no-copy }
        level=error err="opening storage failed: /prometheus/chunks_head/001558: invalid magic number 0"
        ```
        виконайте наступні команди:
        
        ```shell linenums="1"
        sudo bash 
        docker stop wca-prometheus
        rm /var/lib/docker/volumes/wildcore-dms_prometheus_data/_data/chunks_head/*
        docker start wca-prometheus
        ```
    3. Перевірте логи ще раз `docker logs wca-prometheus --tail 30`, помилка повинна бути вирішена.
!!! info "Інформація"
    Ця помилка може виникати, коли сервер було неправильно вимкнено (напр. втрата електрохарчування, витягування з розетки, абощо), або у нього проблема з дисками.