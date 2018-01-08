FROM php:5.6.30-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql \
  && a2enmod rewrite \
  && sed -i 's/DocumentRoot.*/DocumentRoot \/var\/www\/html/g' /etc/apache2/sites-enabled/000-default.conf
