import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { AuthState } from './auth/auth.state';
import { WorldState } from './world/world.state';
import { PlayerState } from './player/player.state';
import { TownState } from './town/town.state';
import { MapState } from './map/map.state';
import { AuthReducer } from './auth/auth.reducer';
import { WorldReducer } from './world/world.reducer';
import { PlayerReducer } from './player/player.reducer';
import { TownReducer } from './town/town.reducer';
import { MapReducer } from './map/map.reducer';
import { AuthActions } from './auth/auth.actions';
import { WorldActions } from './world/world.actions';
import { PlayerActions } from './player/player.actions';
import { TownActions } from './town/town.actions';
import { MapActions } from './map/map.actions';
import { AuthEffects } from './auth/auth.effects';
import { WorldEffects } from './world/world.effects';
import { PlayerEffects } from './player/player.effects';
import { TownEffects } from './town/town.effects';
import { MapEffects } from './map/map.effects';
import { AllianceState } from './alliance/alliance.state';
import { AllianceReducer } from './alliance/alliance.reducer';
import { AllianceActions } from './alliance/alliance.actions';
import { Allianceffects } from './alliance/alliance.effects';
// import * as auth from './auth';
// import * as world from './world';
// import * as player from './player';
// import * as town from './town';
// import * as map from './map';

export interface StoreState {
  auth: AuthState;
  world: WorldState;
  player: PlayerState;
  alliance: AllianceState;
  town: TownState;
  map: MapState;
}

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
