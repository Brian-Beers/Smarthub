# SMART HUB

SmartHub is an IoT project that lets a mobile app control a Mac and Windows PC over a local network.

## FEATURES

* Wake devices using Wake-on-LAN
* Launch applications on Mac
* Launch applications on Windows PC
* React Native / Expo mobile interface
* Raspberry Pi can run the central SmartHub server

## PROJECT STRUCTURE

mobile/
App.js                  Mobile controller

raspberry-pi/
smartHubServer.py       Main Wake-on-LAN server

mac/
launchAppsMac.py        Mac application launcher

pc/
launchAppsPC.py         Windows application launcher

## HOW IT WORKS

The phone sends commands to the SmartHub server running on the Raspberry Pi.

The Raspberry Pi can send Wake-on-LAN packets to the Mac or PC.

Once a computer is running, its local Python server can receive commands from the mobile app and launch applications.

## SETUP

Install Python dependencies:

```
pip install flask wakeonlan
```

Replace all placeholder values such as:

```
YOUR_PI_IP
YOUR_PC_IP
YOUR_MAC_IP
YOUR_PC_MAC_ADDRESS
YOUR_MAC_MAC_ADDRESS
YOUR_WINDOWS_USERNAME
```

Do not upload personal IP addresses, credentials, or other private configuration to GitHub.

## NOTE

SmartHub currently operates over a local/private network. Remote access can be added using a VPN such as Tailscale.

This project was created as an IoT capstone project.
