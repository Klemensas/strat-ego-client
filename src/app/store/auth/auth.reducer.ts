import { ActionReducer, Action } from '@ngrx/store';

import { AuthState, initialAuthState } from './auth.state';
import { AuthActions } from './auth.actions';

export const AuthReducer: ActionReducer<AuthState> = (state = initialAuthState, action: Action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
    case AuthActions.REGISTER:
      return { ...state, inProgress: true, error: null };

    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.REGISTER_SUCCESS:
      return { ...state, inProgress: true, token: action.payload };

    case AuthActions.LOAD_PROFILE_SUCCESS:
      return { ...state, inProgress: false, user: action.payload };

    case AuthActions.LOGIN_FAIL:
    case AuthActions.REGISTER_FAIL:
    case AuthActions.LOAD_PROFILE_FAIL:
      return { ...state, inProgress: false, error: action.payload };

    case AuthActions.LOGOUT:
      return initialAuthState;

    default: {
      return state;
    }
  }
};
