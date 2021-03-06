import { Component, Input, OnChanges } from '@angular/core';
import { Town } from '../town/town.model';

@Component({
  selector: 'town-loyalty',
  templateUrl: './town-loyalty.component.html',
  styleUrls: ['./town-loyalty.component.scss'],
})
export class TownLoyaltyComponent implements OnChanges {
  @Input() town: Town;
  @Input() loyaltyRegeneration: number;
  loyalty: number;

  constructor() { }

  ngOnChanges() {
    this.updateLoyalty();
  }

  updateLoyalty() {
    const updateTime = Date.now();
    const growth = this.calculateLoyaltyGrowth(+this.town.updatedAt, updateTime);
    const changedValue = this.town.loyalty + growth;
    this.loyalty = Math.floor(Math.min(100, changedValue));

    if (this.loyalty < 100) {
      this.queueNextUpdate(changedValue);
    }
  }

  calculateLoyaltyGrowth(lastTime: number, updateTime: number) {
    const hoursPast = (updateTime - lastTime) / 3600000;
    return this.loyaltyRegeneration * hoursPast;
  }

  queueNextUpdate(loyalty: number) {
    const nextGrowth = (1 - loyalty % 1) * (3600000 / this.loyaltyRegeneration);
    setTimeout(() => this.updateLoyalty(), nextGrowth);
  }
}
