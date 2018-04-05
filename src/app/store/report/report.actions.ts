import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export enum ReportActionTypes {
  Update = '[Report] Update',
}

export class Update implements Action {
  readonly type = ReportActionTypes.Update;

  constructor(public payload: any) {}
}

export type ReportActions = Update;
