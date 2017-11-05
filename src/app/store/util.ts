import { Action } from '@ngrx/store';

// TODO: do a proper migration as per https://github.com/ngrx/platform/blob/master/MIGRATION.md#action-interface
export interface ActionWithPayload extends Action {
  payload?: any;
}
