import * as Rollbar from 'rollbar';
import {
  Injectable,
  ErrorHandler,
  Injector,
} from '@angular/core';

import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { AuthModuleState, getUser } from './auth/reducers';

const rollbarConfig: Rollbar.Configuration = {
  accessToken: environment.rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: environment.production ? 'production' : 'development',
};

@Injectable()
export class RollbarService {
  private personSubscription = this.store.select(getUser).subscribe((user) => {
    const person = user ? {
      ...user,
      username: user.name,
    } : null;
    this.rollbar.configure({
      payload: {
        person,
      }
    });
  });

  public static factory (store) {
    if (!rollbarConfig.accessToken) {
      throw new Error('Missing rollbar token');
    }
    return new RollbarService(new Rollbar(rollbarConfig), store);
  }

  public static provider() {
    return {
      provide: RollbarService,
      deps: [Store],
      useFactory: RollbarService.factory
    };
  }

  constructor(public rollbar: Rollbar, private store: Store<AuthModuleState>) {}
}


@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err: any): void {
    const rollbarService = this.injector.get(RollbarService);
    rollbarService.rollbar.error(err.originalError || err);
  }
}
