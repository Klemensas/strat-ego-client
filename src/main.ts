import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AuthService } from './app/auth/auth.service';
import { GameDataService } from './app/services/game-data.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        tokenName: 'jwt'
      }), http);
    },
    deps: [Http]
  }),
  AuthService,
  GameDataService,

])
.catch(err => console.error(err));
