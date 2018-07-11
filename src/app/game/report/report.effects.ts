import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { Store } from '@ngrx/store';

import { ReportActions } from './report.actions';

@Injectable()
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}
}
