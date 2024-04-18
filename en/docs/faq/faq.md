!!! abstract
    This page provides answers to various common questions by our users.

    Feel free to use the right-side menu to jump to the section you are interested in.

## How to open Prometheus to a 3rd-party app (Grafana etc.)
1. Go to `/opt/wildcore-dms/.env`.
2. Find and change or add the the following line:
    `PROMETHEUS_EXPOSE=0.0.0.0:9090`
3. Run `cd /opt/wildcore-dms && docker compose up -d` in your Terminal.
