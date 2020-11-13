FROM php:7.3-apache

RUN apt-get update && docker-php-ext-install pdo_mysql mysqli mbstring

RUN apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

COPY ./php.ini /usr/local/etc/php/

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
