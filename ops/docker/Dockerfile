FROM node:20 as node

WORKDIR /app

COPY . ./

RUN yarn
RUN yarn build

FROM php:8.3-apache

WORKDIR /var/www/html

COPY --from=node /app/dist ./app
COPY ./simpleserver ./

EXPOSE 80

ENTRYPOINT ['php', '-S', 'localhost:80']
