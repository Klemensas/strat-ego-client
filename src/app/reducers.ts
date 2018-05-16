import { environment } from '../environments/environment';
import { MetaReducer, ActionReducer, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromWorld from './world/world.reducer';
import { AuthActionTypes } from './auth/auth.actions';

export interface State {
  world: fromWorld.WorldState;
}

export const reducers: ActionReducerMap<State> = {
  world: fromWorld.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.debug('state', state);
    console.debug('action', action);

    return reducer(state, action);
  };
}

export function reset(reducer) {
  return function(state, action) {
    if (action.type === AuthActionTypes.Logout) { state = { world: state.world }; }
    return reducer(state, action);
  };
}

// TODO: Observable.timer causes freeze to throw
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, reset, /* storeFreeze */] : [];

export const getWorldState = createFeatureSelector<fromWorld.WorldState>('world');
export const getWorlds = createSelector(
  getWorldState,
  fromWorld.getWorlds
);
export const getActiveWorld = createSelector(
  getWorldState,
  fromWorld.getActiveWorld
);
