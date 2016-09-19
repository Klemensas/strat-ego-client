import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/cache';

import { AuthService } from '../../auth/auth.service';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    name = 'tmp';
    host = 'watever';
    private socket: SocketIOClient.Socket;

    public events = {
        player: this.socketObservable('self'),
        town: this.socketObservable('town'),
        map: this.socketObservable('map')
    };

    constructor(public auth: AuthService) {
    }

    public connect() {
        const world = 'megapolis' // replace with target world data
        console.log('connecting to socket', this.auth.tokenData)
        this.socket = io.connect('http://localhost:9000', {
            path: '/socket.io-client',
            query: `token=${this.auth.token}&world=${world}`,
        });

        // TODO: rework returned value into something valid when working with server side socket authentication
        return Observable.create(observer => {
            this.socket.on('connect', data => observer.next(this.socket));
        }).subscribe();
    }

    public disconnect() {
        this.socket.close();
    }

    public sendEvent(event, data) {
        this.socket.emit(event, data);
    }

    private socketObservable(event) {
        return Observable.create((observer: any) => {
            this.socket.on(event, (data: any) => observer.next(data));
        }).cache();
    }

//      /**
//       * Get items observable
//       *
//       * @class SocketService
//       * @method get
//       * @param name string
//       * @return Observable<any>
//       */
    get(name: string): Observable<any> {
        this.name = name;
        let socketUrl = this.host + "/" + this.name;
        this.socket = io.connect(socketUrl);
        this.socket.on("connect", (a) => this.onConnect(a));
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
            this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
            return () => this.socket.close();
        });
    }

    /**
     * Create signal
     *
     * @class SocketService
     * @method create
     * @param name string
     * @return void
     */
    create(name: string) {
        this.socket.emit("create", name);
    }
    /**
     * Remove signal
     *
     * @class SocketService
     * @method remove
     * @param name string
     * @return void
     */
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    /**
     * Handle connection opening
     *
     * @class SocketService
     * @method connect
     * @return void
     */
    private onConnect(a) {
        console.log(`Connected to ${this.name}`);
        // console.log(a, this.socket);

        // Request initial list when connected
        // this.socket.emit('player');
    }

    /**
     * Handle connection closing
     *
     * @class SocketService
     * @method disconnect
     * @return void
     */
    private onDisconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}