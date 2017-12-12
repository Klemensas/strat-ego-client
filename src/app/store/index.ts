import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { AuthState } from 'app/store/auth/auth.state';
import { WorldState } from 'app/store/world/world.state';
import { PlayerState } from 'app/store/player/player.state';
import { TownState } from 'app/store/town/town.state';
import { MapState } from 'app/store/map/map.state';
import { AuthReducer } from 'app/store/auth/auth.reducer';
import { WorldReducer } from 'app/store/world/world.reducer';
import { PlayerReducer } from 'app/store/player/player.reducer';
import { TownReducer } from 'app/store/town/town.reducer';
import { MapReducer } from 'app/store/map/map.reducer';
import { AuthActions } from 'app/store/auth/auth.actions';
import { WorldActions } from 'app/store/world/world.actions';
import { PlayerActions } from 'app/store/player/player.actions';
import { TownActions } from 'app/store/town/town.actions';
import { MapActions } from 'app/store/map/map.actions';
import { AuthEffects } from 'app/store/auth/auth.effects';
import { WorldEffects } from 'app/store/world/world.effects';
import { PlayerEffects } from 'app/store/player/player.effects';
import { TownEffects } from 'app/store/town/town.effects';
import { MapEffects } from 'app/store/map/map.effects';
import { AllianceState } from 'app/store/alliance/alliance.state';
import { AllianceReducer } from 'app/store/alliance/alliance.reducer';
import { AllianceActions } from 'app/store/alliance/alliance.actions';
import { Allianceffects } from 'app/store/alliance/alliance.effects';
// import * as auth from './auth';
// import * as world from './world';
// import * as player from './player';
// import * as town from './town';
// import * as map from './map';

export interface StoreState {
  auth: AuthState,
  world: WorldState,
  player: PlayerState,
  alliance: AllianceState,
  town: TownState,
  map: MapState,
};

const reducers: ActionReducerMap<StoreState> = {
  auth: AuthReducer,
  world: WorldReducer,
  player: PlayerReducer,
  alliance: AllianceReducer,
  town: TownReducer,
  map: MapReducer,
};
const actions = [
  AuthActions,
  WorldActions,
  PlayerActions,
  AllianceActions,
  TownActions,
  MapActions,
];
const effects = [
  AuthEffects,
  WorldEffects,
  PlayerEffects,
  Allianceffects,
  TownEffects,
  MapEffects,
];

// Reset state on logout
// export function productionReducer(state, action) {
//   if (action.type === auth.AuthActions.LOGOUT) {
//     state = undefined;
//   }
//   return rootReducer(state, action);
// }

const devTools = !environment.production ?
  [StoreDevtoolsModule.instrument({ maxAge: 50 })] : [];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    ...devTools,
  ],
  providers: [ ...actions ]
})
export class AppStore {}
