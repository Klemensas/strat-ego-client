import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

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
        tokenGetter: (() => {
          console.log('get token', localStorage.getItem('jwt'))
          return localStorage.getItem('jwt')
        }),
        whitelistedDomains: ['localhost:9000']
      }
    }),
    AuthModule,
  ],
  declarations: [
    AppComponent,
    routedComponents,
  ],
  providers: [
    SocketService,
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
