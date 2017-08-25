import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';


import { AppStore } from './store';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';

import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthGuard } from './auth.guard';
import { SocketGuard } from './game/services/socket.guard';
// import { PlayerResolver } from './player.resolver';

import { AuthService } from './auth/auth.service';
import { GameDataService } from './services/game-data.service';

import { GameModule } from './game/game.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'bearer',
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('jwt')),
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: true
  }), http, options);
}

@NgModule({
  imports: [
    routing,
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    GameModule,
    NgbModule.forRoot(),
    AppStore,
  ],
  declarations: [
    AppComponent,
    routedComponents,
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthGuard,
    SocketGuard,
    // PlayerResolver,
    AuthService,
    GameDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(/* private authService: AuthService */) {
    (window.screen as any).orientation.lock('landscape')
      .then(() => {})
      .catch(() => {});
  }
}
