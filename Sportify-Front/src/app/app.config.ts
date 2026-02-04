import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NavigationService } from './services/navigation.service';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes), NavigationService, provideClientHydration(), provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'es' }
  ]
};
