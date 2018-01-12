import { Component, OnInit } from '@angular/core';

import { OpenweatherService } from "../../services/openweather.service";
import { ICity } from "../../interfaces/city.interface";
import { IForecast } from "../../interfaces/forecast.interface";

import { Chart } from 'chart.js';

@Component({
    selector: 'app-forecast',
    styles: [],
    templateUrl: './forecast.component.html',
})
export class ForecastComponent implements OnInit {

    loadingData:boolean = false;

    dates:Date[] = [];

    cities:ICity[] = [];
    forecasts:any[] = [];

    chart:Chart;

    selectedDate:string;

    constructor( public _openWeatherService:OpenweatherService ) {
        this._openWeatherService.getAllCities()
            .subscribe( data => this.cities = data);

        for (let i = 1; i <= 4; i++) {
            let day = new Date();
            day.setDate(day.getDate() + i);
            this.dates.push(day);
        }


    }

    ngOnInit() {
        this.loadingData = true;
        this._openWeatherService.getAllCities()
        .subscribe( data => {
            this.cities = data;
            let totalCities = this.cities.length;
            let loadedCities = 0;
            this.cities.map(res => {
                this._openWeatherService.getForecastByCity(res.id, true)
                .subscribe(
                    data => this.forecasts.push(data),
                    err => console.error(err),
                    () => {
                        loadedCities++;
                        if (loadedCities == totalCities) {
                            this.loadingData = false;
                        }
                    }
                );
            });
        });

        this.chart = new Chart('canvasForecast', {
            type: 'horizontalBar',
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: "#d7ecfb",
                        borderColor: "#36a2eb"
                    }
                ]
            },
            options: {
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
        // console.log(this.cities);
        // this._openWeatherService.getForecastByCity(3117735, true)
        //   .subscribe( data => {
        //       console.log(data);
        //   })
        // this._openWeatherService.getAllCities()
        //   .subscribe( data => {
        //       this.cities = data;
        //       console.log("Cities ready.")
        //   });
        // console.log("Outside subscribe.")
    }

    selectDate(newDate:string) {

        this.chart.data.labels = []
        this.chart.data.datasets[0].data = [];
        this.chart.update();

        this.selectedDate = newDate;

        this.forecasts.map(res => {
            res.forecasts.map(fc => {
                if (fc.timestamp === this.selectedDate) {
                    this.chart.data.labels.push(res.city.name);
                    this.chart.data.datasets[0].data.push(fc.temperature);
                    this.chart.update();
                }
            })
        })
    }

}
