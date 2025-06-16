import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


//configurando para usar prime ng
export const appConfig: ApplicationConfig = {
  providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideAnimations(), 
        providePrimeNG({
            theme: {
                //preset padrão do prime ng
                preset: Aura,
                options: {
                //settando light mode fixo
                darkModeSelector: false 
              }
            }
        })
  ]
};