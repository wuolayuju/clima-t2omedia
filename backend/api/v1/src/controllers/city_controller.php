<?php

require_once './src/models/City.php';

class CityController
{
   protected $container;

   // constructor receives container instance
   public function __construct(Interop\Container\ContainerInterface $container) {
       $this->container = $container;
   }

   public function allCities($request, $response) {

       $cities = City::all();

       return $response->withJson($cities->toArray());
   }

   public function getCity($request, $response, $args) {
       $city_id = $args['id'];

       $city = City::find($city_id);

       return $response->withJson($city->toArray());
   }
}
