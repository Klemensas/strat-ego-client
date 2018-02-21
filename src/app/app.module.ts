import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Http, HttpModule, RequestOptions } from '@angular/http';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { FullGuard } from './full.guard';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth/auth.service';
import { GameDataService } from './services/game-data.service';
import { SocketService } from './game/services/socket.service';
import { AuthModule } from './auth/auth.module';
import { reducers, metaReducers } from './reducers';
import { WorldEffects } from './world/world.effects';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'bearer',
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('jwt')),
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false
  }), http, options);
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([WorldEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AuthModule,
  ],
  declarations: [
    AppComponent,
    routedComponents,
  ],
  providers: [
    SocketService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthGuard,
    FullGuard,
    GameDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    (window.screen as any).orientation.lock('landscape')
      .then(() => {})
      .catch(() => {});
  }
}
