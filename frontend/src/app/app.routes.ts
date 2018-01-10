import { RouterModule, Routes } from '@angular/router';

import { ForecastComponent } from "./components/forecast/forecast.component";
import { EvolutionComponent } from "./components/evolution/evolution.component";
import { ForecastTableComponent } from "./components/forecast-table/forecast-table.component";

const app_routes: Routes = [
  { path: 'evolution', component: EvolutionComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: 'forecast-table', component: ForecastTableComponent },
  { path: '', pathMatch: 'full', redirectTo: '/forecast' },
  { path: '**', pathMatch: 'full', redirectTo: '/forecast' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
