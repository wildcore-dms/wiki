# System Configuration Optimization Under High Load

To ensure stable and efficient system operation under significant load (e.g., over 1000 devices or 50,000 interfaces/ONUs), it is crucial to properly configure the system.  
Below are recommendations and parameters to help optimize performance.

!!! warning "When working with a large number of devices or interfaces, **using SSD or NVMe drives is mandatory**. This significantly speeds up I/O operations, which are a bottleneck during heavy data processing and frequent database queries."

!!! info "All configuration parameters below are defined in the file **`/opt/wildcore-dms/.env`**. If a parameter is not present in the file, you can add it by inserting the corresponding line."

!!! info "Parameters are specified as `KEY=VALUE`"

## 1. MySQL Configuration Optimization

Allocating sufficient memory for MySQL is key to database performance, especially for intensive read/write operations.

* **`MYSQL_INNODB_BUFFER_POOL_SIZE`**: Defines the size of the InnoDB buffer pool. This pool caches table data and indexes. Increasing this value allows MySQL to keep more data in memory, reducing the need for frequent disk access.
  * **Recommended value**: `4G` (4 Gigabytes) to start.
* **`MYSQL_KEY_BUFFER_SIZE`**: Used to cache indexes of MyISAM tables. If you're mostly using InnoDB tables, this value can be lower, but still matters for some internal operations.
  * **Recommended value**: `256M` (256 Megabytes).
* **`MYSQL_TABLE_OPEN_CACHE`**: The number of tables the server can keep open. Increasing this reduces the frequency of table open/close operations, which is useful under high concurrent query loads.
  * **Recommended value**: `500`.

---

## 2. Increasing Cache Lifetimes

Data caching helps reduce database and hardware load by serving frequently requested data from memory.

* **`MEMCACHE_CACHING_QUERY_TIMEOUT_SEC`**: Cache lifetime for DB records and device polling results. Increasing this keeps data in cache longer.
  * **Recommended value**: `9000` seconds (2.5 hours).
* **`SWC_CACHE_ACTUALIZE_TIMEOUT_SEC`**: Interval at which cached data is refreshed from devices. This defines how often the system polls devices for fresh data instead of using cached ones.
  * **Recommended value**: `3600` seconds (1 hour).

---

## 3. Increasing Number of Workers

To handle large numbers of simultaneous requests and tasks efficiently, you should increase the number of HTTP workers and background pollers.

* **`RR_NUM_WORKERS`**: Number of HTTP workers. These handle incoming HTTP requests to the system.
  * **Recommended value**: `120`.
* **`POLLER_COUNT_PROCS`**: Number of background pollers. These processes poll devices and collect data.
  * **Recommended value**: `30`.

---

## 4. Applying the Changes

!!! warning "**All configuration changes above require Docker container recreation.**"

To apply changes, run the following commands from the `/opt/wildcore-dms` directory:
```bash
cd /opt/wildcore-dms
docker compose up -d --force-recreate

```

---

## 6. Important Notes and Tuning Recommendations

* **Imperative Parameter Selection**: There are no universal "golden" values for all parameters. Optimal values depend heavily on:
  * **Device Types**: Different types of equipment may generate different volumes of data and require varying polling frequencies.
  * **Server Specifications**: The amount of RAM and number of CPU cores on your server are critically important factors. The more resources you have, the higher the parameter values can be set.

* **Monitoring and Iterative Approach**: It is recommended to implement changes gradually and continuously monitor system performance (CPU usage, RAM, disk operations, query latency). This will allow you to empirically determine the optimal values for your specific environment. Start with the suggested values and adjust them up or down based on monitoring results.

* **No Fixed Recommendations for 10k Interfaces**: Due to the high variability of load, equipment types, and server resources, it's impossible to give precise recommendations—for example, for 10,000 interfaces—without a detailed analysis of your system. An imperative, environment-specific tuning approach is the most effective.
