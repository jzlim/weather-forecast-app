import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { CityService } from './services/city.service';
import { WeatherForecastService } from './services/weather-forecast.service';
import { APP_CONFIG } from './shared/config';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    { provide: APP_CONFIG, useValue: environment },
    CityService,
    WeatherForecastService,
  ],
};
