import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class OpenweatherService {

    private URL_API = '/backend/api/v1';

    constructor( private http:Http ) { }

    getAllCities() {
        let url = `${ this.URL_API }/city`;
        return this.http.get( url )
            .map( res => res.json());
    }

    getSampleCity() {
        let url = `${ this.URL_API }/city/2509954`;
        return this.http.get( url )
            .map( res => res.json());
    }

    getSampleForecast() {
        let url = `${ this.URL_API }/weather/3117735`;
        return this.http.get( url )
            .map( res => res.json());
    }

    getForecastByCity( cityId:number, compact?:boolean ) {
        let isCompact = compact == undefined ? false : compact;
        let url = '';
        if ( isCompact ) {
            url = `${ this.URL_API }/weather/${ cityId }?compact`;
        } else {
            url = `${ this.URL_API }/weather/${ cityId }`;
        }
        return this.http.get( url )
            .map( res => res.json());
    }
}
