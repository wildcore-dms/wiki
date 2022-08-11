## Foreword
If in the course of work you encounter problems with the agent, first of all make sure that you are using the latest version of the software.

### Solution to almost all problems
It is possible that in some of the updates some of the resources were not updated, the caches were not cleared, etc.
Run the following commands to rule out possible problems:
```shell
cd /opt/wildcore-dms
sudo docker compose down --remove-orphans
sudo docker compose up -d --build
# Here you need to wait some time until all containers start. If HDD is used, double the time
sleep 10
wca cache:flush
wca cache:redis:flush-all
```

## Contact support

Before applying:

1. **Make sure you are using the latest version of the agent and wca-tool**
2. Run the commands described in ["Solving almost all problems"](#_2)
3. Make sure the server has stable access to the hardware (like ping and snmpwalk)

If the steps above did not solve the problem, when contacting, try to describe as much as possible the actions that cause the problem, specify:

* Characteristics of the system on which the software is running
* The role of the user under which the error occurs;
* What rights are granted to this user group;
* Which hardware (if it is hardware) is having problems. It is also desirable to provide the output of the `wca switcher-core:call DEVICE IP system` command;
* Provide screenshots
* Describe what exactly is wrong, even if it is obvious to you (but everyone understands in their own way))))
* What access to the equipment was provided (community - RO or RW, login / password as a user or administrator)

[Support Contacts](/en/contact/contacts/#_2)
