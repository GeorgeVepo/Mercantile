#!/bin/bash
################################################
# A SIMPLE SCHEDULE IP CHANGE SCRIPT FOR LINUX #
# MAKE SURE YOU HAVE RUN hma-udp-grabber.sh    #
################################################
cd /etc/openvpn/

echo 9424 | sudo -S killall openvpn # <<<< disconnect
sleep 10 # <<<< wait a bit more to make sure that the openvpn has been properly disconnected 
echo 9424 | sudo -S openvpn --daemon --config Brazil.JoaoPessoa.TCP.ovpn # <<<< change the config file string to match your prefered server
echo "IP Alterado!"
sleep 20 # <<<< wait for connection to be established
# do something here

