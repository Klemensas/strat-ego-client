import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameDataService } from '../services/game-data.service';

@Component({
  moduleId: module.id,
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {

  private acceptedEvents = {
    'player-data': data => this.updatePlayerData(data),
  };
  public playerData = {};

  constructor(private route: ActivatedRoute, private gameData: GameDataService) { }

  ngOnInit() {
    this.gameData.init()
      .subscribe(event => {
        if (this.acceptedEvents[event.type]) {
          this.acceptedEvents[event.type](event.data);
        }
      });

    // this.route.data.subscribe(val => {
    //   console.log(val);
    // })
    // this.route.params.subscribe(params => {
    //   let name = params['name'];
    //   this.gameData.getWorldData(name).subscribe(d => {
    //     console.log('hi', d)
    //   });
    // });
  }

  updatePlayerData(data) {
    this.playerData = data;
  }
}
