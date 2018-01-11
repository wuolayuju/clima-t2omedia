import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OpenweatherService } from "../../services/openweather.service";

@Component({
    selector: 'app-forecast-table',
    templateUrl: './forecast-table.component.html',
    styles: []
})
export class ForecastTableComponent implements OnInit {

    cities:any[] = [];

    forecastData:any[] = [];

    loadingData:boolean = false;

    constructor( public _openWeatherService:OpenweatherService ) { }

    ngOnInit() {
        this._openWeatherService.getAllCities()
          .subscribe( data => {
            this.cities = data;
          });
    }

    citySelected(event) {
        let filterCityId = event.target.value;
        let checked = event.target.checked;

        if (checked) {
            this.loadingData = true;
            this._openWeatherService.getForecastByCity(filterCityId, true)
                .subscribe( res => {
                    this.forecastData.push(res);
                    this.loadingData = false;
                })
        } else {
            let toDelete = this.forecastData.filter( item => {
                return item.city.id == filterCityId;
            })

            let index = this.forecastData.indexOf(toDelete);
            this.forecastData.splice(index, 1);
        }
    }

    exportToXSL() {
        let table_html = document.getElementById("forecast-table");
        let html = table_html.outerHTML;

        let anchor:any = document.createElement("a");
        anchor.style = "display:none !important";
        document.body.appendChild(anchor);
        let blob = new Blob([html], {type: 'application/vnd.ms-excel'});
        let url= window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = "tabla_predicciones.xls";
        anchor.click();
        anchor.remove();
    }
}
