# SportifyWeb
Página web de reservas con pagos usando Laravel y Angular.

Una vez clonado el repositorio, dentro del proyecto Sportify hacer lo siguiente:

-composer install

-npm install

-cp .env.example .env

-Configuar el .env y que quede algo así, por ejemplo si se usa XAMPP

  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=sportify
  DB_USERNAME=root
  DB_PASSWORD=
  
-php artisan key:generate

-php artisan migrate:fresh --seed

-php artisan serve

Y con el proyecto de Sportify-Front lo siguiente:

-npm install

-ng serve

Una vez el proyecto esté funcionando, para probar la parte del panel de control de admin, habrá que poner manualmente en la url base un '/cms' para que lleve al login del CMS.
Las credenciales son: Uusario-> admin@gmail.com Contraseña-> admin
