#!/bin/sh

echo "stopping container"
docker stop sajt-app-co
docker stop scrape-app-co

echo "rm container"
docker rm sajt-app-co
docker rm scrape-app-co

echo "rm images"
docker rmi sajt-app:latest
docker rmi scrape-app:latest

echo "building images"
docker build -t sajt-app:latest ./front/
docker build -t scrape-app:latest ./scrape_fl/

echo "startig containers via docker compose"
docker compose up -d 


