import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/cache';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/skipUntil';
import * as io from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { StoreState } from '../../store';
import { AuthActions } from '../../store/auth/auth.actions';
import { PlayerActions } from '../../store/player/player.actions';
import { TownActions } from '../../store/town/town.actions';
import { MapActions } from '../../store/map/map.actions';
import { ReportActions } from '../../store/report/report.actions';
import { AllianceActions } from '../../store/alliance/alliance.actions';
import { ChatActions } from '../../store/chat/chat.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

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
  private registerEventsSubscription = this.eventsToRegister$
    .combineLatest(this.readyToRegister$)
    .filter(([events, ready]) => ready && !!events.length)
    .subscribe(([events]) => {
      this.eventsToRegister$.next([]);
      events.forEach(([event, callback]) => this.socket.on(event, callback));
    });

  public events = new Map();

  constructor(private store: Store<StoreState>) {
  }

  public registerEvents(events: SocketEvent[]) {
    // Add to already existing events
    this.eventsToRegister$.next([...this.eventsToRegister$.value, ...events]);
  }

  public connect(token): Observable<any> {
    const world = 'megapolis'; // replace with target world data
    // console.log('connecting to socket', this.auth.tokenData)
    this.socket = io.connect(environment.server.base, {
        path: '/socket.io-client',
        query: `token=${token}&world=${world}`,
    });

    // TODO: consider moving hookup to the appropriate component
    // TODO: many listeners vs less with metadata
    this.socket.on('player', (payload) => this.store.dispatch({ type: PlayerActions.UPDATE, payload }));
    this.socket.on('town', (payload) => this.store.dispatch({ type: TownActions.UPDATE_EVENT, payload }));
    this.socket.on('map', (payload) => this.store.dispatch({ type: MapActions.UPDATE, payload }));
    this.socket.on('report', (payload) => this.store.dispatch({ type: PlayerActions.UPDATE_REPORTS, payload }));
    this.socket.on('chat:messageCreated', (payload) => this.store.dispatch({ type: ChatActions.POST_MESSAGE_SUCCESS, payload }));
    this.socket.on('chat:newMessage', (payload) => this.store.dispatch({ type: ChatActions.ADD_MESSAGE, payload }));
    this.events.set('player', this.socketObservable('player'));
    this.events.set('town', this.socketObservable('town'));
    this.events.set('map', this.socketObservable('map'));
    this.events.set('reports', this.socketObservable('reports'));

    this.readyToRegister$.next(true);

    // TODO: rework returned value into something valid when working with server side socket authentication
    return Observable.create(observer => {
      this.socket.on('connect', data => observer.next(this.socket));
    });
  }

  public disconnect() {
    this.socket.close();
  }

  public sendEvent(event: string, data?: any) {
    console.log(`[Socket emit: ${event}]`, data);
    this.socket.emit(event, data);
  }

  private socketObservable(event) {
    return Observable.create((observer: any) => {
        this.socket.on(event, (data: any) => {
          console.log('wup', event, data);
          observer.next(data);
        });
    });
    // .cache();
  }
}
