import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  Subject } from 'rxjs';
import { combineLatest, filter } from 'rxjs/operators';

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
  private registeredEvents = [];
  private readyToRegister$: Subject<boolean> = new Subject();
  private registerEventsSubscription = this.eventsToRegister$.pipe(
    combineLatest(this.readyToRegister$),
    filter(([events, ready]) => ready && !!events.length)
  ).subscribe(([events]) => {
    events.forEach(([event, callback]) => {
      if (this.registeredEvents.includes(event)) { return; }

      this.socket.on(event, callback);
      this.registeredEvents.push(event);
    });
  });

  public events = new Map();

  constructor(private store: Store<GameModuleState>) {}

  public registerEvents(events: SocketEvent[]) {
    // Add to already existing events
    this.eventsToRegister$.next([...this.eventsToRegister$.value, ...events]);
  }

  public connect(token): void {
    const world = 'megapolis'; // replace with target world data
    this.socket = io.connect(environment.server.base, {
        path: '/socket.io-client',
        query: `token=${token}&world=${world}`,
    });

    this.socket.on('connect', () => this.readyToRegister$.next(true));
  }

  public disconnect() {
    if (this.socket) { this.socket.close(); }
    this.registeredEvents = [];
    this.readyToRegister$.next(false);
  }

  public sendEvent(event: string, data?: any) {
    this.socket.emit(event, data);
  }
}
