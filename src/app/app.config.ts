import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { BottomsheetComponent } from './components/bottomsheet/bottomsheet.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    DatepickerComponent,
    BottomsheetComponent,
  ],
};
