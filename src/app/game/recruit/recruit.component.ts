import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameDataService } from '../../services/game-data.service';
import { TownService } from '../services/town.service';

@Component({
  selector: 'recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.scss'],
})
export class RecruitComponent implements OnInit, OnDestroy {
  private units;
  private town;
  private unitData;
  private unitDataMap;
  private recruitment = {
    resources: {},
    units: {}
  };
  private recruiting = false;
  private hasRecruitmentQueue = false;
  private subscriptions = {
    gameData: null,
    currentTown: null,
    recruitEvents: null
  }

  constructor(private gameData: GameDataService, private townService: TownService) { }

  ngOnInit() {
    this.subscriptions.gameData = this.gameData.data.activeWorld.subscribe(world => {
      this.unitData = world.units;
      this.unitDataMap = world.unitMap;
    });
    this.subscriptions.currentTown = this.townService.currentTown.subscribe(town => {
      if (town) {
        this.town = town;
        this.recruitment.resources = this.town.resources;
        // this.units = this.modifyUnits(town.units);
        this.hasRecruitmentQueue = this.town.UnitQueues.length;
      }
    });
    this.subscriptions.recruitEvents = this.townService.townEvents.recruit.subscribe(event => {
      this.recruiting = false;
    });
  }

  ngOnDestroy() {
      this.subscriptions.gameData.unsubscribe();
      this.subscriptions.currentTown.unsubscribe();
      this.subscriptions.recruitEvents.unsubscribe();
  }

  unitAmountUpdate($event, type) {
    $event = $event || 0;
    let change = $event - (this.recruitment.units[type] || 0);
    if (typeof $event === 'number') {
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
    if (this.recruiting) {
      return false;
    }
    if (!unit.requirements || !this.town) {
      return true;
    }
    return unit.requirements.every(req => req.level <= this.town.buildings[req.item].level)
  }

  recruit(amount, type) {
    this.recruiting = true;
    this.townService.recruit([{ type, amount}]);
  }
}
