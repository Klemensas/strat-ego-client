import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameDataService } from '../services/game-data.service';
import { SocketService } from '../services/socket.service';

@Component({
  moduleId: module.id,
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private route: ActivatedRoute, private socket: SocketService, private gameData: GameDataService) { }

  ngOnInit() {
    console.log(this.route.data)
    this.route.data.subscribe(val => {
      console.log(val);
    })
    // this.route.params.subscribe(params => {
    //   let name = params['name'];
    //   this.gameData.getWorldData(name).subscribe(d => {
    //     console.log('hi', d)
    //   });
    // });
  }

}
