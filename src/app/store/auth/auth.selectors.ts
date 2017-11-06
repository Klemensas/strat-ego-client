import { createSelector } from 'reselect';

import { AuthState } from './auth.state';
import { StoreState } from '../';

export const getUserState = (state: StoreState) => state.auth;
export const getUser = (state: StoreState) => state.auth.user;
export const getProgress = (state: StoreState) => state.auth.inProgress;
export const getError = (state: StoreState) => state.auth.error;
