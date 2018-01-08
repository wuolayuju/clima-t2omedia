<?php
require './vendor/autoload.php';

require './src/handlers/exception.php';

require './src/openweathermap/OpenWeatherMap.php';

$app = new \Slim\App;

$container = $app->getContainer();

$container['openweathermap'] = function ($container) {
    $owm_config = include('./src/openweathermap/config/owm_config.php');
    $owm = new \OpenWeatherMap($owm_config);
    return $owm;
};


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
