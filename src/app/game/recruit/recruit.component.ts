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
  private town;
  private unitData;
  private unitDataMap;
  private recruitment = {
    resources: {},
    units: {}
  };

  constructor(private gameData: GameDataService, private townService: TownService) { }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      this.unitData = world.unitData;
      this.unitDataMap = world.unitDataMap;
    });
    this.townService.currentTown.subscribe(town => {
      if (town) {
        this.town = town;
        this.recruitment.resources = this.town.resources;
        // this.units = this.modifyUnits(town.units);
      }
    });
  }

  unitAmountUpdate($event, type) {
    $event = $event || 0;
    let change = $event - (this.recruitment.units[type] || 0);
    if (typeof $event === "number") {
      const unitCosts = this.unitDataMap[type].costs;
      this.recruitment.resources['wood'] -= unitCosts.wood * change;
      this.recruitment.resources['clay'] -= unitCosts.clay * change;
      this.recruitment.resources['iron'] -= unitCosts.iron * change;
    }
    this.recruitment.units[type] = $event;
  }

  calculateMax(costs) {
    return Math.min.apply(null, [
      Math.floor(this.recruitment.resources['wood'] / costs.wood),
      Math.floor(this.recruitment.resources['clay'] / costs.clay),
      Math.floor(this.recruitment.resources['iron'] / costs.iron)
    ]);
  }

  canRecruit(unit) {
    if (!unit.requirements || !this.town) {
      return true;
    }
    return unit.requirements.every(req => {
      req.level <= this.town.buildings[req.item].level
    })
  }

  recruit(count, type) {
    console.log
  }

}
