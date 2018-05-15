import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import {
  MatSidenavModule,
  MatSnackBarModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
} from '@angular/material';

import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router/';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

import { TownService, MapService, CommandService, ReportService } from './services/index';
import { reducers } from '../store/index';
import { gameRouting, gameComponents } from './game.routing';

import { ResourcesComponent } from './resources';
import { BuildingsComponent } from './buildings/buildings.component';
import { BuildingQueueComponent } from './building-queue/building-queue.component';
import { UnitsComponent } from './units/units.component';
import { CommandComponent } from './command/command.component';
import { CountdownPipe } from '../pipes/countdown.pipe';
import { MovementsComponent } from './movements/movements.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportComponent } from './reports/report/report.component';
import { UnitQueueComponent } from './unit-queue/unit-queue.component';
import { TownLoyaltyComponent } from './town-loyalty/town-loyalty.component';
import { AllianceComponent } from './alliance/alliance.component';
import { EditableRolesComponent } from './alliance/editable-roles/editable-roles.component';
import { PlayerRolesComponent } from './alliance/player-roles/player-roles.component';
import { ForumComponent } from './alliance/forum/forum.component';
import { AllianceChatComponent } from './alliance/alliance-chat/alliance-chat.component';
import { AllianceDiplomacyComponent } from './alliance/alliance-diplomacy/alliance-diplomacy.component';
import { AllianceOverviewComponent } from './alliance/alliance-overview/alliance-overview.component';
import { RankingsComponent } from './rankings/rankings.component';

import { PlayerEffects } from '../store/player/player.effects';
import { Allianceffects } from '../store/alliance/alliance.effects';
import { ChatEffects } from '../store/chat/chat.effects';
import { TownEffects } from '../store/town/town.effects';
import { MapEffects } from '../store/map/map.effects';
import { RankingsEffects } from './rankings/rankings.effects';
import { SupportComponent } from './support/support.component';
import { SupportItemComponent } from './support/support-item/support-item.component';
import { AllianceProfileComponent } from './alliance/alliance-profile/alliance-profile.component';
import { EditProfileComponent } from './alliance/alliance-profile/edit-profile/edit-profile.component';
import { TownHoverComponent } from './map/town-hover/town-hover.component';
import { PlayerProfileComponent } from './player/player-profile/player-profile.component';

export const effects = [
  PlayerEffects,
  Allianceffects,
  ChatEffects,
  TownEffects,
  MapEffects,
  RankingsEffects,
];

@NgModule({
  imports: [
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    gameRouting,
    NgbModule,
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature(effects),
    FontAwesomeModule,
    FileUploadModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: 'divudlfux',
      upload_preset: 'avatar',
    }),
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
    UnitQueueComponent,
    TownLoyaltyComponent,
    AllianceComponent,
    EditableRolesComponent,
    PlayerRolesComponent,
    ForumComponent,
    AllianceChatComponent,
    AllianceDiplomacyComponent,
    AllianceOverviewComponent,
    RankingsComponent,
    SupportComponent,
    SupportItemComponent,
    AllianceProfileComponent,
    EditProfileComponent,
    TownHoverComponent,
    PlayerProfileComponent,
  ],
  providers: [
    TownService,
    MapService,
    CommandService,
    ReportService,
    NgbTooltipConfig,
  ],
  exports: [RouterModule],
  entryComponents: [
    EditProfileComponent,
  ]
})

export class GameModule {
  constructor(config: NgbTooltipConfig) {
    config.triggers = 'hover';
  }
}
