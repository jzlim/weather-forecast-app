import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../shared/config';
import { City } from '../models';

@Injectable()
export class CityService {
  private http = inject(HttpClient);
  private apiUrlPath = '/api/city';

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  getCities() {
    return this.http.get<City[]>(
      `${this.appConfig.apiBaseUrl}${this.apiUrlPath}`
    );
  }
}
