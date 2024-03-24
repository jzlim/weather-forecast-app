import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { City, WeatherForecast } from '../models';
import { CityService } from '../services/city.service';
import { WeatherForecastService } from '../services/weather-forecast.service';

export type StateType = {
  isLoading: boolean;
  cities: City[];
  forecasts: WeatherForecast[];
  searchQuery: string;
};

const initialState: StateType = {
  isLoading: false,
  cities: [],
  forecasts: [],
  searchQuery: '',
};

export const WeatherForecastStore = signalStore(
  withState(initialState),
  withComputed(({ cities, searchQuery }) => ({
    filteredCities: computed(() =>
      cities().filter(
        (x) =>
          searchQuery() != '' &&
          `${x.cityName}, ${x.stateName}`
            .toLowerCase()
            .includes(searchQuery().toLowerCase())
      )
    ),
  })),
  withMethods((store) => {
    const cityService = inject(CityService);
    const weatherForecastService = inject(WeatherForecastService);

    return {
      load: async () => {
        if (store.isLoading()) {
          return;
        }
        patchState(store, { isLoading: true });
        const cities = await firstValueFrom(cityService.getCities());
        patchState(store, {
          isLoading: false,
          cities,
        });
      },
      getWeatherForecasts: async (cityId: number) => {
        if (store.isLoading()) {
          return;
        }
        patchState(store, { isLoading: true });
        const forecasts = await firstValueFrom(
          weatherForecastService.getWeatherForecasts(cityId)
        );
        patchState(store, {
          isLoading: false,
          forecasts,
        });
      },
      updateSearchQuery: (value: string) => {
        patchState(store, { searchQuery: value });
        console.log(store.searchQuery());
      },
    };
  })
);
