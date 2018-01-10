import { Component, OnInit } from '@angular/core';

import { OpenweatherService } from "../../services/openweather.service";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styles: []
})
export class ForecastComponent implements OnInit {

  constructor( public _openWeatherService:OpenweatherService ) { }

  ngOnInit() {
      this._openWeatherService.getForecastByCity(3117735, true)
        .subscribe( data => {
            console.log(data);
        })
  }

}
