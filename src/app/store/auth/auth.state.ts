import { User } from '../user/';

export interface AuthState {
  inProgress: boolean;
  user: User;
  token: string;
  error?: any;
}

export const initialAuthState: AuthState = {
  inProgress: false,
  user: null,
  token: null,
  error: null
};
