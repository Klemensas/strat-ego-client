import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import { SocketService, PlayerService, TownService, MapService, CommandService, ReportService } from './services/index';

import { gameRouting, gameComponents } from './game.routing';
import { ResourcesComponent } from './resources';

import { WorldGuard } from './services/world.guard';
import { FullGuard } from '../full.guard';
import { BuildingsComponent } from './buildings/buildings.component';
import { BuildingQueueComponent } from './building-queue/building-queue.component';
import { UnitsComponent } from './units/units.component';
import { CommandComponent } from './command/command.component';
import { CountdownPipe } from '../pipes/countdown.pipe';
import { MovementsComponent } from './movements/movements.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportComponent } from './reports/report/report.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    gameRouting,
    NgbModule,
  ],
  declarations: [
    gameComponents,
    CountdownPipe,
    ResourcesComponent,
    BuildingsComponent,
    BuildingQueueComponent,
    UnitsComponent,
    CommandComponent,
    MovementsComponent,
    ReportsComponent,
    ReportComponent,
  ],
  providers: [
    SocketService,
    PlayerService,
    TownService,
    MapService,
    CommandService,
    ReportService,
    WorldGuard,
    FullGuard,
    NgbTooltipConfig,
  ]
})

export class GameModule {
  constructor(config: NgbTooltipConfig) {
    config.triggers = 'hover';
  }
}
