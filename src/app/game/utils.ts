import { Observable, timer } from 'rxjs';
import { Resources } from 'strat-ego-common';

import { timestamp, map, publish, refCount } from 'rxjs/operators';

import { Town } from './town/town.model';

export const enoughResources = (res: Resources, needed: Resources) => res.wood >= needed.wood && res.clay >= needed.clay && res.iron >= needed.iron;

export const resourceTime = (res: Resources, needed: Resources, production: Resources) => {
  if (enoughResources(res, needed)) {
    return false;
  }
  return Math.max(...Object.entries(res).map(([name, value]) => (needed[name] - value) / production[name])) * 3600000;
};

export const availableResources = (town: Town) => {
  return timer(0, 1000).pipe(
    timestamp(),
    map((time) => {
      const timePast = (time.timestamp - +town.updatedAt) / 3600000;
      return {
        wood: Math.min(town.resources.wood + town.production.wood * timePast, town.storage),
        clay: Math.min(town.resources.clay + town.production.clay * timePast, town.storage),
        iron: Math.min(town.resources.iron + town.production.iron * timePast, town.storage),
      };
    }),
    publish(),
    refCount()
  );
};
