#!/bin/bash
cd /home/ec2-user/weather-notify-astro
git pull origin main
npm install --legacy-peer-deps
npm run build
sudo systemctl restart weather-notify-astro