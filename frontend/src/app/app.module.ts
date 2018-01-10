import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';

// Routes
import { APP_ROUTING } from "./app.routes";

// Services
import { OpenweatherService } from "./services/openweather.service";

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { EvolutionComponent } from './components/evolution/evolution.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastTableComponent } from './components/forecast-table/forecast-table.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EvolutionComponent,
    ForecastComponent,
    ForecastTableComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    FormsModule
  ],
  providers: [
      OpenweatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
