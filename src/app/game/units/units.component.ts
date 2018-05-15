import { Component, OnChanges, Input } from '@angular/core';

import { TownUnit } from '../town/town.model';
import { unitData } from '../staticData';
import { Dict, Movement, TownSupport, MovementType } from 'strat-ego-common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnChanges {
  @Input() public units: Dict<TownUnit>;
  @Input() public originMovements: Movement[];
  @Input() public targetMovements: Movement[];
  @Input() public originSupport: TownSupport[];
  @Input() public targetSupport: TownSupport[];

  public unitDetails = unitData;
  public townUnits: TownUnit[] = [];
  public townSupport: TownUnit[] = [];

  // TODO: avoid recalculating everything on each change
  public ngOnChanges(changes) {
    const supporting = this.originSupport.reduce((result, { units }) => {
      return Object.entries(units).reduce((sum, [key, val]) => {
        sum[key] = val + (sum[key] || 0);
        return sum;
      }, result);
    }, {});
    const attacking = this.originMovements.reduce((result, { units }) => {
      return Object.entries(units).reduce((sum, [key, val]) => {
        sum[key] = val + (sum[key] || 0);
        return sum;
      }, result);
    }, {});
    const returning = this.targetMovements.reduce((result, { units, type }) => {
      if (type !== MovementType.return) { return result; }
      return Object.entries(units).reduce((sum, [key, val]) => {
        sum[key] = val + (sum[key] || 0);
        return sum;
      }, result);
    }, {});

    this.townUnits = Object.entries(this.units).reduce((result, [name, unit]) => {
      if (unit.inside || unit.queued || attacking[name] || returning[name] || supporting[name]) {
        result.push({
          name,
          ...unit,
          amount: unit.inside + (attacking[name] || 0) + (returning[name] || 0) + (supporting[name] || 0),
        });
      }
      return result;
    }, [] as TownUnit[]);
    const supportDict = this.targetSupport.reduce((result, { units }) => {
      return Object.entries(units).reduce((sum, [key, val]) => {
        sum[key] = val + (sum[key] || 0);
        return sum;
      }, result);
    }, {});
    this.townSupport = Object.entries(supportDict).reduce((result, [key, val]) => {
      result.push({
        name: key,
        amount: val,
      });
      return result;
    }, []);
  }
}
