import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

// Services
import { OpenweatherService } from "./services/openweather.service";

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
      OpenweatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
