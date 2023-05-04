## Agent Key
Before starting the installation, you must obtain an agent key (wildcoreDMS software).
At the time of beta testing, the following ways to get a key are available:

* Send request to contact@wildcore.tools
* Submit a request on the site [wildcore.tools](https://wildcore.tools), button "Request beta"
* Write to our group in telegram - [@WildCoreDMS](https://t.me/wildcore_dms_channel)

## Equipment requirements
* Server access to the Internet from a static IP (if behind NAT - the external IP should not change)
* Equipment Specifications
* 4+ CPU cores
* 6Gb+ RAM
* 100Gb+ SSD drive

## Software Requirements
* Operating system
* Linux (Ubuntu/Debian/CentOS/Fedora)
* MacOS (not tested)
* WSL2 (linux on windows, not tested)
* Installed Docker (>=20.10) with docker-compose plugin (it is recommended to use only official documentation and install the latest version)
* [**wca-tool** - utility for managing WildcoreDMS (installation, update).](wca-tool/index.md)


## Optional
*<span style="color: darkred;">Ubuntu 20+ - install docker through the offered services, DO NOT install the system, the network will not work</span>*

Docker installation documentation - [docs.docker.com](https://docs.docker.com/engine/install/).

*The specifications above are recommended for 50 switches/10 OLTs*       



*It is recommended not to exceed 10k interfaces (ports, ONU) and 300 devices per instance*