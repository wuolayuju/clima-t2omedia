import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class OpenweatherService {

    constructor( private http:Http ) { }

    getAllCities() {
        let url = '/backend/api/v1/city';
        return this.http.get( url )
            .map( res => res.json());
    }

    getCity() {
        let url = '/backend/api/v1/city/2509954';
        return this.http.get( url )
            .map( res => res.json());
    }

    getSampleForecast() {
        let url = '/backend/api/v1/weather/3117735';
        return this.http.get( url )
            .map( res => res.json());
    }

    getForecastByCity( cityId:number ) {
        let url = '/backend/api/v1/weather/' + cityId;
        return this.http.get( url )
            .map( res => res.json());
    }
}
