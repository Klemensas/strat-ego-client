import { NgModule } from '@angular/core';
// import { CommonModule }   from '@angular/common';
// import { FormsModule }    from '@angular/forms';


import { gameRouting, gameComponents } from './game.routing';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    gameRouting
  ],
  declarations: [
    gameComponents
  ],
  providers: [
    // HeroService
  ]
})

export class GameModule {}
