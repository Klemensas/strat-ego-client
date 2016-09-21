import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SocketService } from './socket.service';


@Injectable()
export class SocketResolver implements Resolve<any> {
  constructor (private router: Router, private socket: SocketService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Object> {
    const target = route.params['name'].toLowerCase();

    // TODO: rework into valid
    // CONSIDER: maybe this would work better as a route guard?
    return this.socket.connect().subscribe(
      () => {},
      err => console.error('socket connect error', err)
    );
      // .map(worlds => {
      //   const foundWorld = worlds.find(w => w.name.toLowerCase() === target);
      //   if (foundWorld) {
      //     this.gameData.data.activeWorld.next(foundWorld);
      //     return foundWorld;
      //   }
      //   this.router.navigate(['/']);
      //   return false;
      // });
  }
}
