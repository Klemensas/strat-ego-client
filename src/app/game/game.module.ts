import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule }    from '@angular/forms';

import { PlayerService, RestaurantService, SocketService } from './services/index';

import { gameRouting, gameComponents } from './game.routing';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    gameRouting
  ],
  declarations: [
    gameComponents
  ],
  providers: [
    SocketService,
    PlayerService,
    RestaurantService
  ]
})

export class GameModule {}
