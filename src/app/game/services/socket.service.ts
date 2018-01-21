import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/cache';
import { Store } from '@ngrx/store';
import * as io from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { StoreState } from '../../store';
import { AuthActions } from '../../store/auth/auth.actions';
import { PlayerActions } from '../../store/player/player.actions';
import { TownActions } from '../../store/town/town.actions';
import { MapActions } from '../../store/map/map.actions';
import { ReportActions } from '../../store/report/report.actions';
import { AllianceActions } from '../../store/alliance/alliance.actions';

@Injectable()
export class SocketService {
    name = 'tmp';
    host = 'watever';
    private socket: SocketIOClient.Socket;

    public events = new Map();

    constructor(private store: Store<StoreState>) {
    }

    public connect(token): Observable<any> {
        const world = 'megapolis'; // replace with target world data
        // console.log('connecting to socket', this.auth.tokenData)
        this.socket = io.connect(environment.server.base, {
            path: '/socket.io-client',
            query: `token=${token}&world=${world}`,
        });

        this.socket.on('player', (data) => this.store.dispatch({ type: PlayerActions.UPDATE, payload: data }));
        this.socket.on('town', (data) => this.store.dispatch({ type: TownActions.UPDATE_EVENT, payload: data }));
        this.socket.on('map', (data) => this.store.dispatch({ type: MapActions.UPDATE, payload: data }));
        this.socket.on('report', (data) => this.store.dispatch({ type: PlayerActions.UPDATE_REPORTS, payload: data }));
        this.socket.on('alliance', (data) => this.store.dispatch({ type: AllianceActions.UPDATE, payload: data }));
        this.socket.on('alliance:memberUpdate', (data) => this.store.dispatch({ type: AllianceActions.UPDATE_MEMBER, payload: data }));
        this.socket.on('alliance:memberRemove', (data) => this.store.dispatch({ type: AllianceActions.REMOVED_MEMBER, payload: data }));
        this.socket.on('alliance:memberLeave', (data) => this.store.dispatch({ type: AllianceActions.REMOVED_MEMBER, payload: data }));
        this.socket.on('alliance:left', (data) => this.store.dispatch({ type: AllianceActions.LEAVE_ALLIANCE_SUCCESS }));
        this.socket.on('alliance:destroyed', (data) => this.store.dispatch({ type: AllianceActions.DESTROY_SUCCESS, payload: data }));
        this.events.set('player', this.socketObservable('player'));
        this.events.set('town', this.socketObservable('town'));
        this.events.set('map', this.socketObservable('map'));
        this.events.set('reports', this.socketObservable('reports'));

        // TODO: rework returned value into something valid when working with server side socket authentication
        return Observable.create(observer => {
          this.socket.on('connect', data => observer.next(this.socket));
        });
    }

    public disconnect() {
        this.socket.close();
    }

    public sendEvent(event: string, data?: any) {
        // console.log(`[Socket emit: ${event}]`, data);
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

    // get(name: string): Observable<any> {
    //     this.name = name;
    //     let socketUrl = this.host + "/" + this.name;
    //     this.socket = io.connect(socketUrl);
    //     this.socket.on("connect", (a) => this.onConnect(a));
    //     this.socket.on("disconnect", () => this.disconnect());
    //     this.socket.on("error", (error: string) => {
    //         console.log(`ERROR: "${error}" (${socketUrl})`);
    //     });

    //     // Return observable which follows "create" and "remove" signals from socket stream
    //     return Observable.create((observer: any) => {
    //         this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
    //         this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
    //         return () => this.socket.close();
    //     });
    // }

    // create(name: string) {
    //     this.socket.emit('create', name);
    // }

    // remove(name: string) {
    //     this.socket.emit('remove', name);
    // }

    // private onConnect(a) {
    //     console.log(`Connected to ${this.name}`);
    //     // Request initial list when connected
    //     // this.socket.emit('player');
    // }

    // private onDisconnect() {
    //     console.log(`Disconnected from "${this.name}"`);
    // }
}
