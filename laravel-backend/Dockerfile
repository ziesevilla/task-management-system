FROM php:8.3-fpm


# system deps
RUN apt-get update && apt-get install -y \
    git zip unzip libzip-dev libonig-dev libpng-dev libicu-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath

# composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# copy app files
COPY . /var/www/html

# install composer deps
RUN composer install --no-interaction --prefer-dist --optimize-autoloader || true

# permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["php-fpm"]
