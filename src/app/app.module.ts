import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { FullGuard } from './full.guard';
import { AuthGuard } from './auth.guard';
import { GameDataService } from './services/game-data.service';
import { SocketService } from './game/services/socket.service';
import { AuthModule } from './auth/auth.module';
import { reducers, metaReducers } from './reducers';
import { WorldEffects } from './world/world.effects';
import { RollbarErrorHandler, RollbarService } from './rollbar';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([WorldEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization',
        tokenGetter: (() => localStorage.getItem('jwt')),
        whitelistedDomains: ['localhost:9000']
      }
    }),
    AuthModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  declarations: [
    AppComponent,
    routedComponents,
  ],
  providers: [
    SocketService,
    AuthGuard,
    FullGuard,
    GameDataService,
    RollbarService.provider(),
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    (window.screen as any).orientation.lock('landscape')
      .then(() => {})
      .catch(() => {});
  }
}
