import { Component, OnChanges, Input } from '@angular/core';

import { TownUnit } from '../../store/town/town.model';
import { unitData } from '../staticData';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnChanges {
  @Input() public units: { [name: string]: TownUnit };
  public unitDetails = unitData;
  public townUnits: TownUnit[] = [];

  public ngOnChanges(changes) {
    this.townUnits = Object.entries(this.units).reduce((result, [name, unit]) => {
      if (unit.inside || unit.outside || unit.queued) {
        result.push({
          name,
          ...unit,
          amount: unit.outside + unit.inside,
        })
      }
      return result;
    }, []);
  }
}
