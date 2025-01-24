!!! abstract
    This page provides answers to various common questions by our users.

    Feel free to use the right-side menu to jump to the section you are interested in.

## How to open Prometheus to a 3rd-party app (Grafana etc.)
1. Go to `/opt/wildcore-dms/.env`.
2. Find and change or add the the following line:
    `PROMETHEUS_EXPOSE=0.0.0.0:9090`
3. Run `cd /opt/wildcore-dms && docker compose up -d` in your Terminal.

## How to transfer WildCoreDMS to another server
1. Make a full backup with the following command:

    ```
    wca-tool backup
    ```

2. Find the backup in `/opt/wildcore-backups` and transfer it to the target server.
3. Restore the system from backup by running
    ```
    sudo wca-tool restore --path path-to-you-backup.tar.gz
    ```

4. Go to your [**Personal Cabinet**](https://cabinet.wildcore.tools/) and reset the saved IP (broken chain icon).
5. Register the new IP on the new server with
    ```
    wca-tool register
    ```

6. Run on the new server:
    ```
    cd /opt/wildcore-dms && docker compose up -d --build
    ```
   
## Encryption of Equipment Access

!!! note "Starting from version 0.25, encryption of equipment access using SHA-AES-256 is supported"
!!! note "For new installations, encryption will be enabled by default."

To encrypt access after the update, run the following command:
```shell
sudo wca security:enable-encryption
```

Example output:
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

The first step in encryption is generating a password (if not already created) and saving it to the file `/opt/wildcore-dms/.encrypt_passwd`.

!!! warning "If the password is changed or lost, access will be unreadable."
