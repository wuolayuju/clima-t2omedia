import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OpenweatherService } from "./services/openweather.service";

import { Chart } from 'chart.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    cities:any[] = [];
    selectedCity:any;

    chart:any[] = [];

    constructor( public _openWeatherService:OpenweatherService ) { }

    ngOnInit() {
        this._openWeatherService.getAllCities()
            .subscribe( data => {
                this.cities = data;
                this.selectedCity = this.cities[0].id;
            })
    }

    selectCity(newCity) {
        console.log(newCity);
        this.selectedCity = newCity;
        this._openWeatherService.getForecastByCity(this.selectedCity)
        .subscribe( data => {
            let forecastTemps = data['forecasts'].map(res => res.temperature);
            let forecastDates = data['forecasts'].map(res => res.timestamp);

            this.chart = new Chart('canvas', {
                type: 'line',
                data: {
                    labels: forecastDates,
                    datasets: [
                        {
                            data: forecastTemps,
                            borderColor: "#3cba9f",
                            fill: false,
                            pointRadius: 5
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: data.city.name
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            display: true
                        }],
                    }
                }
            });
        })
    }
}
