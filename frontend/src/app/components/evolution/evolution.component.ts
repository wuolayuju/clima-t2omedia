import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OpenweatherService } from "../../services/openweather.service";

import { Chart } from 'chart.js';

@Component({
    selector: 'app-evolution',
    templateUrl: './evolution.component.html',
    styles: []
})
export class EvolutionComponent implements OnInit {

    cities:any[] = [];
    selectedCity:any;

    chart:Chart;

    constructor( public _openWeatherService:OpenweatherService ) { }

    ngOnInit() {
        this._openWeatherService.getAllCities()
          .subscribe( data => {
            this.cities = data;
            this.selectedCity = this.cities[0].id
          });

          this.chart = new Chart('canvas', {
              type: 'line',
              data: {
                  labels: [],
                  datasets: [
                      {
                          data: [],
                          borderColor: "#3cba9f",
                          fill: false,
                          pointRadius: 5
                      }
                  ]
              },
              options: {
                  title: {
                      display: true,
                      text:[]
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
    }

    selectCity(newCity) {
        console.log(newCity);
        this.selectedCity = newCity;
        this._openWeatherService.getForecastByCity(this.selectedCity)
        .subscribe( data => {
            let forecastTemps = data['forecasts'].map(res => res.temperature);
            let forecastDates = data['forecasts'].map(res => res.timestamp);

            this.chart.data.labels = forecastDates;
            this.chart.data.datasets[0].data = forecastTemps;
            this.chart.options.title.text = data.city.name;
            this.chart.update();

            // this.chart = new Chart('canvas', {
            //     type: 'line',
            //     data: {
            //         labels: forecastDates,
            //         datasets: [
            //             {
            //                 data: forecastTemps,
            //                 borderColor: "#3cba9f",
            //                 fill: false,
            //                 pointRadius: 5
            //             }
            //         ]
            //     },
            //     options: {
            //         title: {
            //             display: true,
            //             text: data.city.name
            //         },
            //         legend: {
            //             display: false
            //         },
            //         scales: {
            //             xAxes: [{
            //                 display: true
            //             }],
            //             yAxes: [{
            //                 display: true
            //             }],
            //         }
            //     }
            // });
        })
    }

}
