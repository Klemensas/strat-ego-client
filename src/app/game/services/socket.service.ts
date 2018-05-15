import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { combineLatest, filter } from 'rxjs/operators';
import 'rxjs/add/operator/combineLatest';
// import 'rxjs/add/operator/cache';
import { Store } from '@ngrx/store';
import * as io from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { GameModuleState } from '../reducers';

export type SocketEvent<T = any> = [string, (payload: T) => void];

@Injectable()
export class SocketService {
  name = 'tmp';
  host = 'watever';
// TODO: using subjects to delay registering after socket is initialized. This is required due to socket load on app startup
// Consider separating game module and lazy loading it with sockets. That could potentially simplify registering logic.
  public eventsToRegister$: BehaviorSubject<SocketEvent[]> = new BehaviorSubject([]);
  private socket: SocketIOClient.Socket;
  private readyToRegister$: Subject<boolean> = new Subject();
  private registerEventsSubscription = this.eventsToRegister$.pipe(
    combineLatest(this.readyToRegister$),
    filter(([events, ready]) => ready && !!events.length)
  ).subscribe(([events]) => {
    this.eventsToRegister$.next([]);
    events.forEach(([event, callback]) => this.socket.on(event, callback));
  });

  public events = new Map();

  constructor(private store: Store<GameModuleState>) {}

  public registerEvents(events: SocketEvent[]) {
    // Add to already existing events
    this.eventsToRegister$.next([...this.eventsToRegister$.value, ...events]);
  }

  public connect(token): Observable<any> {
    const world = 'megapolis'; // replace with target world data
    this.socket = io.connect(environment.server.base, {
        path: '/socket.io-client',
        query: `token=${token}&world=${world}`,
    });
    this.readyToRegister$.next(true);

    // TODO: rework returned value into something valid when working with server side socket authentication
    return Observable.create(observer => {
      this.socket.on('connect', data => observer.next(this.socket));
    });
  }

  public disconnect() {
    this.socket.close();
    this.readyToRegister$.next(false);
  }

  public sendEvent(event: string, data?: any) {
    console.log(`[Socket emit: ${event}]`, data);
    this.socket.emit(event, data);
  }
}
