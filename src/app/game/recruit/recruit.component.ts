import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/game-data.service';
import { TownService } from '../services/town.service';

@Component({
  selector: 'recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.scss'],
})
export class RecruitComponent implements OnInit {
  private units;
  private buildings;
  private unitData;
  private unitDataMap;

  constructor(private gameData: GameDataService, private townService: TownService) { }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      this.unitData = world.unitData;
      this.unitDataMap = world.unitDataMap;
    });
    this.townService.currentTown.subscribe(town => {
      console.log(town);
      if (town) {
        this.units = town.units;
        this.buildings = town.buildings;
      }
    });
  }

  canRecruit(unit) {
    if (!unit.requirements || !this.units) {
      return true;
    }
    // console.log(unit.name, unit.requirements, this.buildings);
    return unit.requirements.every(req => {
      console.log(req.level, this.buildings[req.item].level);
      req.level <= this.buildings[req.item].level
    })
  }

}
