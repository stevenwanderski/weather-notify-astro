#!/bin/bash
cd /home/ec2-user/weather-notify-astro
git pull origin main
npm install --force
sudo systemctl restart weather-notify-astro