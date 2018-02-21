import { Action } from '@ngrx/store';

import { User, Credentials } from './user/user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFail = '[Auth] Login Fail',
  LoadProfileSuccess = '[Auth] Load Profile Success',
  LoadProfileFail = '[Auth] Load Profile Fail',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFail = '[Auth] Register Fail',
  Logout = '[Auth] Logout'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Credentials) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: string) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LoginFail;

  constructor(public payload: string) {}
}

export class LoadProfileSuccess implements Action {
  readonly type = AuthActionTypes.LoadProfileSuccess;

  constructor(public payload: User) {}
}

export class LoadProfileFail implements Action {
  readonly type = AuthActionTypes.LoadProfileFail;

  constructor(public payload?: any) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;

  constructor(public payload: Credentials) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;

  constructor(public payload: string) {}
}

export class RegisterFail implements Action {
  readonly type = AuthActionTypes.RegisterFail;

  constructor(public payload?: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  Login |
  LoginSuccess |
  LoginFail |
  LoadProfileSuccess |
  LoadProfileFail |
  Register |
  RegisterSuccess |
  RegisterFail |
  Logout;
