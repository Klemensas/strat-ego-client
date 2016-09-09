  import { NgModule, enableProdMode, provide } from '@angular/core'; // ok
import { BrowserModule } from '@angular/platform-browser'; // browser platform right?
import { FormsModule } from '@angular/forms'; // forms directives?
import { HttpModule } from '@angular/http'; // http methods?

import { XHRBackend } from '@angular/http'; // dunno


import { AppComponent, environment } from './';
import { routing, routedComponents } from './app.routing';

import { AuthHttp, provideAuth } from 'angular2-jwt';

import { AuthGuard } from './auth.guard';
import { PlayerResolver } from './player.resolver';

import { AuthService } from './auth/auth.service';
import { GameDataService } from './services/game-data.service';
import { SocketService } from './services/socket.service';

import { GameModule } from './game/game.module';

if (environment.production) {
  enableProdMode();
}

@NgModule({
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    GameModule
  ],
  declarations: [
    AppComponent,
    routedComponents
  ],
  providers: [
    AuthHttp,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'bearer',
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('jwt')),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true
    }),
    AuthGuard,
    PlayerResolver,
    AuthService,
    GameDataService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
