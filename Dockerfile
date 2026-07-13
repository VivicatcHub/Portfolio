# build environment
FROM node:alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm i -g serve
EXPOSE 80
CMD serve -p 80 -s build
