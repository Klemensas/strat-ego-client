import { Injectable } from '@angular/core';

@Injectable()
export class AuthActions {
  public static LOGIN = '[Auth] LOGIN';
  public static LOGIN_SUCCESS = '[Auth] LOGIN Success';
  public static LOGIN_FAIL = '[Auth] LOGIN Fail';
  public static LOAD_PROFILE = '[Auth] LOAD_PROFILE';
  public static LOAD_PROFILE_SUCCESS = '[Auth] LOAD_PROFILE Success';
  public static LOAD_PROFILE_FAIL = '[Auth] LOAD_PROFILE Fail';
  public static REGISTER = '[Auth] REGISTER';
  public static REGISTER_SUCCESS = '[Auth] REGISTER Success';
  public static REGISTER_FAIL = '[Auth] REGISTER Fail';
  public static LOGOUT = '[Auth] LOGOUT';
}
