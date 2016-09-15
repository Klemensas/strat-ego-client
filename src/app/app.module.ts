import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';

import { AuthHttp, provideAuth } from 'angular2-jwt';

import { AuthGuard } from './auth.guard';
// import { PlayerResolver } from './player.resolver';

import { AuthService } from './auth/auth.service';
import { GameDataService } from './services/game-data.service';

import { GameModule } from './game/game.module';


import { HeaderComponent} from './header/';

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
    HeaderComponent,
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
    // PlayerResolver,
    AuthService,
    GameDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
