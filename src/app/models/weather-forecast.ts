export type WeatherForecast = {
  id: number;
  cityId: number;
  cityName: string;
  stateName: string;
  forecastDate: Date;
  validDate: Date;
  summary: string;
  weatherDescription: string;
  minTemperature: number;
  maxTemperature: number;
};
