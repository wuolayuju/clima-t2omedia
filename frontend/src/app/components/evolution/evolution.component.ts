import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OpenweatherService } from "../../services/openweather.service";
import { ICity } from "../../interfaces/city.interface";
import { Chart } from 'chart.js';

@Component({
    selector: 'app-evolution',
    templateUrl: './evolution.component.html',
    styles: []
})
export class EvolutionComponent implements OnInit {

    cities:ICity[] = [];
    selectedCityId:number;

    chart:Chart;

    constructor( public _openWeatherService:OpenweatherService ) { }

    ngOnInit() {
        this._openWeatherService.getAllCities()
          .subscribe( data => {
            this.cities = data;
            this.selectedCityId = this.cities[0].id
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
        this.selectedCityId = newCity;
        this._openWeatherService.getForecastByCity(this.selectedCityId)
        .subscribe( data => {
            let forecastTemps = data['forecasts'].map(res => res.temperature);
            let forecastDates = data['forecasts'].map(res => res.timestamp);

            this.chart.data.labels = forecastDates;
            this.chart.data.datasets[0].data = forecastTemps;
            this.chart.options.title.text = data.city.name;
            this.chart.update();
        })
    }

}
