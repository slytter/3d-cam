echo "Wifi Configurating"
sudo ifup wlan0

echo "Starting webserver"
node slave.js
