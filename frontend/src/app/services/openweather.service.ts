import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class OpenweatherService {

    constructor( private http:Http ) { }

    getCity() {
        let url = 'http://localhost/backend/api/v1/city/2509954';
        return this.http.get( url )
            .map( res => res.json());
    }
}
