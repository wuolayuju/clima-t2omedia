import { Component } from '@angular/core';

import { OpenweatherService } from "./services/openweather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( public _openWeatherService:OpenweatherService ) {
      this._openWeatherService.getCity()
          .subscribe( data => {
              console.log(data);
          })
  }


}
