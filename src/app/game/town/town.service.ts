import { Town, MovementType } from 'strat-ego-common';

export interface TownPopulation {
  total: number;
  used: number;
  available: number;
}
export interface FullTown extends Town {
  canRecruit: boolean;
  storage: number;
  recruitmentModifier: number;
  population?: TownPopulation;
}

export class TownService {
  static calculatePopulation(town: Town, farmData, unitMap) {
    const total = farmData[town.buildings.farm.level].population;
    const supportPop = town.originSupport.reduce((result, { units }) =>
      result + Object.entries(units).reduce((a, b) => a + unitMap[b[0]].farmSpace * b[1], 0), 0);
    const attackPop = town.originMovements.reduce((result, { units }) =>
      result + Object.entries(units).reduce((a, b) => a + unitMap[b[0]].farmSpace * b[1], 0), 0);
    const returnPop = town.targetMovements.reduce((result, { units, type }) =>
      result + type === MovementType.return ?  Object.entries(units).reduce((a, b) => a + unitMap[b[0]].farmSpace * b[1], 0) : 0, 0);
    const townPop = Object.entries(town.units).reduce((count, [name, unit]) => {
      return count + unitMap[name].farmSpace * unit.inside + unitMap[name].farmSpace * unit.queued;
      }, 0);
    const used = townPop + supportPop + attackPop + returnPop;
    return {
      total,
      used,
      available: total - used,
    };
  }
}
