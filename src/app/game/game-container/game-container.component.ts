import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameDataService } from '../../services/game-data.service';

// import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  moduleId: module.id,
  selector: 'game-container',
  templateUrl: 'game-container.component.html',
  styleUrls: ['game-container.component.css']
})
export class GameContainerComponent implements OnInit {

  // private acceptedEvents = {
  //   'player-data': data => this.updatePlayerData(data),
  // };
  // public playerData = null;
  // public activeRest = null;

  constructor(private route: ActivatedRoute, private gameData: GameDataService) { }

  ngOnInit() {
  //   this.gameData.init()
  //     .subscribe(event => {
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

  // updatePlayerData(data) {
  //   const restaurants = data.Restaurants;
  //   this.playerData = data;
  //   if (!this.activeRest && restaurants.length) {
  //       this.activeRest = restaurants[0];
  //   }
  // }
}
