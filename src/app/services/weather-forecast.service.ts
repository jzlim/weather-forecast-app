import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../shared/config';
import { WeatherForecast } from '../models';

@Injectable()
export class WeatherForecastService {
  private http = inject(HttpClient);
  private apiUrlPath = '/api/weatherforecast';

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  getWeatherForecasts(cityId: number) {
    return this.http.get<WeatherForecast[]>(
      `${this.appConfig.apiBaseUrl}${this.apiUrlPath}`,
      { params: { cityId } }
    );
  }
}
