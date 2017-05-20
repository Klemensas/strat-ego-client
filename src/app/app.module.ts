import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';

import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthGuard } from './auth.guard';
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
    // PlayerResolver,
    AuthService,
    GameDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
