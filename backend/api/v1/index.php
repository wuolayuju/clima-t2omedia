<?php
require './vendor/autoload.php';

require './src/handlers/exception.php';

require './src/openweathermap/OpenWeatherMap.php';

$config = include('./src/config/config.php');
$app = new \Slim\App(['settings'=> $config]);

$container = $app->getContainer();

// Eloquent ORM
$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);
$capsule->setAsGlobal();
$capsule->bootEloquent();

$capsule->getContainer()->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

// OpenWeatherMap
$container['openweathermap'] = function ($container) {
    $owm_config = include('./src/openweathermap/config/owm_config.php');
    $owm = new \OpenWeatherMap($owm_config);
    return $owm;
};

// Routes
$app->get('/sample-weather', function ($request, $response, $args) {

    $owm = $this->get('openweathermap');
    $resp = $owm->getSampleWeather();
    return $response->withJson(json_decode($resp));
});

$app->get('/weather/{id}', function ($request, $response, $args) {

    $city_id = $args['id'];
    $owm = $this->get('openweathermap');
    $resp = $owm->getWeather( $city_id );

    return $response->withJson($resp);
});


$app->run();
