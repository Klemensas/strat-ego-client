import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as auth from './auth.reducer';

export interface State {
  auth: auth.AuthState;
}

export interface AuthModuleState {
  auth: State;
}

export const reducers = {
  auth: auth.reducer,
};

export const getState = createFeatureSelector<State>('auth');
export const getAuthState = createSelector(
  getState,
  (state: State) => state.auth
);
export const getUser = createSelector(
  getAuthState,
  auth.getUser,
);

// TODO: enable state reset
// Reset state on logout
// export function productionReducer(state, action) {
//   if (action.type === auth.AuthActions.LOGOUT) {
//     state = undefined;
//   }
//   return rootReducer(state, action);
// }
