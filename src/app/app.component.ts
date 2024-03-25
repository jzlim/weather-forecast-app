import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { City } from './models';
import { CityService } from './services/city.service';
import { WeatherForecastService } from './services/weather-forecast.service';
import { WeatherForecastStore } from './stores/weather-forecast.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, FormsModule, CardComponent],
  templateUrl: './app.component.html',
  providers: [WeatherForecastStore],
})
export class AppComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLElement>;

  store = inject(WeatherForecastStore);
  selectedCityName: string | null = null;
  searchInputFocus = false;

  constructor() {
    this.store.load();
  }

  searchInputBlur() {
    this.searchInput.nativeElement.blur();
    this.searchInputFocus = false;
  }

  async onCitySelect(city: City) {
    this.selectedCityName = `${city.cityName}, ${city.stateName}`;
    this.searchInputBlur();
    await this.store.getWeatherForecasts(city.id);
  }
}
