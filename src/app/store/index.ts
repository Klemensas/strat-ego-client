import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import * as auth from './auth';
import * as world from './world';
import * as player from './player';
import * as town from './town';
import * as map from './map';

export interface StoreState {
  auth: auth.AuthState,
  world: world.WorldState,
  player: player.PlayerState,
  town: town.TownState,
  map: map.MapState,
};

const reducers = {
  auth: auth.AuthReducer,
  world: world.WorldReducer,
  player: player.PlayerReducer,
  town: town.TownReducer,
  map: map.MapReducer,
}
const actions = [
  auth.AuthActions,
  world.WorldActions,
  player.PlayerActions,
  town.TownActions,
  map.MapActions,
]
const effects = [
  EffectsModule.run(auth.AuthEffects),
  EffectsModule.run(world.WorldEffects),
  EffectsModule.run(player.PlayerEffects),
  EffectsModule.run(town.TownEffects),
  EffectsModule.run(map.MapEffects),
]

const rootReducer = (state: any, action: any) => combineReducers(reducers)(state, action);

// Reset state on logout
export function productionReducer(state, action) {
  if (action.type === auth.AuthActions.LOGOUT) {
    state = undefined;
  }
  return rootReducer(state, action);
}

const devTools = !environment.production ?
  [StoreDevtoolsModule.instrumentOnlyWithExtension()] :
  [];

@NgModule({
  imports: [
    StoreModule.provideStore(productionReducer),
    effects,
    ...devTools,
  ],
  providers: [ ...actions ]
})
export class AppStore {}
