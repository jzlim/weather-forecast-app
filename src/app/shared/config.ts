import { InjectionToken } from '@angular/core';

export type AppConfig = {
  production: false;
  apiBaseUrl: string;
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app config');
