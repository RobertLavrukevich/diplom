FROM php:8.2-fpm
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo pdo_mysql
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY . .
ENV COMPOSER_ALLOW_SUPERUSER=1