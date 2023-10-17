#!/bin/bash

echo "stoping conteiner"
docker stop sajt-app-co
echo "removig conteiner"
docker rm sajt-app-co
echo "removig image"
docker rmi sajt-app:latest
echo "building image"
docker build -t sajt-app:latest . 
echo "startig conatiner via docker compose"
docker compose up -d 
