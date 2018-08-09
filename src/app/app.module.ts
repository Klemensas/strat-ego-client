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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
} from '@angular/material';

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
import { ReportErrorComponent } from './report-error/report-error.component';
import { ReportDialogComponent } from './report-error/report-dialog/report-dialog.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
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
    NgbModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization',
        tokenGetter,
        whitelistedDomains: ['localhost:9000', '178.128.203.143']
      }
    }),
    FontAwesomeModule,
    AuthModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
  ],
  declarations: [
    AppComponent,
    routedComponents,
    ReportErrorComponent,
    ReportDialogComponent,
  ],
  providers: [
    SocketService,
    AuthGuard,
    FullGuard,
    GameDataService,
    RollbarService.provider(),
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ReportDialogComponent,
  ]
})
export class AppModule {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    (window.screen as any).orientation.lock('landscape')
      .then(() => {})
      .catch(() => {});
  }
}
