import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Report } from 'strat-ego-common';

export enum ReportActionTypes {
  Initialize = '[Report] Initialize',
  Add = '[Report] Add',
}

export class Initialize implements Action {
  readonly type = ReportActionTypes.Initialize;

  constructor(public payload: Report[]) {}
}

export class Add implements Action {
  readonly type = ReportActionTypes.Add;

  constructor(public payload: Report) {}
}

export type ReportActions = Initialize
| Add
;
