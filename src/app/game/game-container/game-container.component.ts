import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayerService } from '../services/player.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'game-container',
  templateUrl: 'game-container.component.html',
  styleUrls: ['game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {

  // private acceptedEvents = {
  //   'player-data': data => this.updatePlayerData(data),
  // };
  // public playerData = null;
  // public activeRest = null;

  constructor(private route: ActivatedRoute, private socket: SocketService, private player: PlayerService) {
  }

  ngOnInit() {
    // console.log(this.gameData.data);
    // this.gameData.data['player'].subscribe(event => {
    //   console.log('eventerino', event);
    // });
      // .subscribe(event => {
  //       if (this.acceptedEvents[event.type]) {
  //         this.acceptedEvents[event.type](event.data);
  //       }
  //     });

  //   // this.route.data.subscribe(val => {
  //   //   console.log(val);
  //   // })
  //   // this.route.params.subscribe(params => {
  //   //   let name = params['name'];
  //   //   this.gameData.getWorldData(name).subscribe(d => {
  //   //     console.log('hi', d)
  //   //   });
  //   // });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  // updatePlayerData(data) {
  //   const restaurants = data.Restaurants;
  //   this.playerData = data;
  //   if (!this.activeRest && restaurants.length) {
  //       this.activeRest = restaurants[0];
  //   }
  // }
}
