import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { PlayerService, TownService, SocketService } from './services/index';

import { gameRouting, gameComponents } from './game.routing';
import { ResourcesComponent } from './resources';

import { WorldResolver } from './services/world.resolver';
import { SocketResolver } from './services/socket.resolver';
import { BuildingsComponent } from './buildings/buildings.component';
import { BuildingQueueComponent } from './building-queue/building-queue.component';
import { UnitsComponent } from './units/units.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    gameRouting
  ],
  declarations: [
    gameComponents,
    ResourcesComponent, BuildingsComponent, BuildingQueueComponent, UnitsComponent
  ],
  providers: [
    SocketService,
    PlayerService,
    TownService,
    WorldResolver,
    SocketResolver
  ]
})

export class GameModule {}
