FROM node:18.12.1-alpine
WORKDIR /app
COPY . ./
RUN npm install