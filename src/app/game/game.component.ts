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

  constructor(private route: ActivatedRoute, private gameData: GameDataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let name = params['name'];
      this.gameData.getWorldData(name).subscribe(d => {
        console.log('hi', d)
      });
    });
  }

}
