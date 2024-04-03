!!! abstract "Overview"
    This page provides various error cases and a solution for them for the Prometheus external app.

    Feel free to use the right side menu to jump to the section, that you're interested in.

### Prometheus is suddenly down

!!! failure "Error"
    An unexpected error occured, please contact your administrator 
    
    (Client (http://wca-prometheus:9090/prometheus) returned unsupported response: )

!!! success "Solution"
    1. Check the wca-prometheus logs with `docker logs wca-prometheus --tail 30`.
    2. If logs contain

        ```{ .shell .no-copy }
        level=error err="opening storage failed: /prometheus/chunks_head/001558: invalid magic number 0"
        ```
        do the following:
        
        ```shell linenums="1"
        sudo bash 
        docker stop wca-prometheus
        rm /var/lib/docker/volumes/wildcore-dms_prometheus_data/_data/chunks_head/*
        docker start wca-prometheus
        ```
    3. Check the logs again `docker logs wca-prometheus --tail 30`, the error should be resolved.
!!! info
    This error can occur when the server is powered down incorrectly (i.e. sudden power loss, etc.), or if there is a problem with it's drives.