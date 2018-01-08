<?php

require_once './src/models/City.php';
require_once './src/models/Cache.php';
require_once './src/models/Forecast.php';

class OpenWeatherMap
{
    private $API_KEY = '';

    private $SAMPLE_URL = 'http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22';

    private $FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast?';


    public function __construct($config)
    {
        if ( empty($config) || !array_key_exists('apiKey', $config)) {
            $this->API_KEY = null;
        } else {
            $this->API_KEY = $config['apiKey'];
        }
    }

    public function getSampleWeather()
    {
        return $this->executeQuery( $this->SAMPLE_URL );
    }

    public function getWeather( $city_id )
    {
        $cache = Cache::find( $city_id );
        $forecast_result = array();

        if( $cache == null ) {
            $url = $this->FORECAST_URL . "id=$city_id&units=metric&appid=$this->API_KEY";

            $result_raw = $this->executeQuery( $url );
            $result_assoc = json_decode($result_raw, TRUE);

            $cache = new Cache;
            $cache->id_city = $result_assoc['city']['id'];
            $cache->cache_time = 600;
            $cache->save();

            $forecast = new Forecast;
            $forecast->id_city = $result_assoc['city']['id'];
            $forecast->timestamp = $result_assoc['list'][0]['dt_txt'];
            $forecast->temperature = $result_assoc['list'][0]['main']['temp'];
            $forecast->save();

            $forecast_result = $this->curateForecast($result_raw);
        } else {
            $forecast = Forecast::find( $city_id );
            $city = $cache->city;
            $forecast_result = array(
                "city" => array(
                    "id"    => $city->id,
                    "name"  => $city->name
                ),
                "forecasts" => array(
                    "timestamp"     => $forecast->timestamp,
                    "temperature"   => $forecast->temperature
                )
            );
        }

        return $forecast_result;
    }

    private function executeQuery( $url ) {
        $curl = curl_init();
        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url
        ));
        // Send the request & save response to $resp
        $resp = curl_exec($curl);
        // Close request to clear up some resources
        curl_close($curl);

        return $resp;
    }

    private function curateForecast( $forecast ) {
        $forecast_assoc = json_decode($forecast, TRUE);

        $forecast_result = array(
            "city" => array(
                "id"    => $forecast_assoc['city']['id'],
                "name"  => $forecast_assoc['city']['name']
            ),
            "forecasts" => array()
        );

        foreach ($forecast_assoc['list'] as $weather) {
            $weather_assoc = array(
                "timestamp"     => $weather['dt_txt'],
                "temperature"   => $weather['main']['temp']
            );
            array_push($forecast_result['forecasts'], $weather_assoc);
        }

        return $forecast_result;
    }
}
