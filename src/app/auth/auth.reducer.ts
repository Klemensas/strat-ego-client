import { User } from 'strat-ego-common';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  inProgress: boolean;
  user: User;
  token: string;
  error?: any;
}

export const initialState: AuthState = {
  inProgress: false,
  user: null,
  token: null,
  error: null,
};

export function reducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
    case AuthActionTypes.Register:
      return { ...state, inProgress: true, error: null };

    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.RegisterSuccess:
      return { ...state, inProgress: false, token: action.payload };

    case AuthActionTypes.LoadProfileSuccess:
      return { ...state, inProgress: false, user: action.payload };

    case AuthActionTypes.LoginFail:
      return { ...state, inProgress: false, error: action.payload };

    case AuthActionTypes.Logout:
      return initialState;

    default: {
      return state;
    }
  }
}


export const getUser = (state: AuthState) => state.user;
export const getProgress = (state: AuthState) => state.inProgress;
export const getError = (state: AuthState) => state.error;
