import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { timestamp, map, publish, refCount } from 'rxjs/operators';


export const enoughResources = (res, needed) => res.wood >= needed.wood && res.clay >= needed.clay && res.iron >= needed.iron;

export const resourceTime = (res, needed, production) => {
  if (enoughResources(res, needed)) {
    return false;
  }
  return Math.max(...Object.entries(res).map(([name, value]) => (needed[name] - value) / production[name])) * 3600000;
};

export const availableResources = (town) => {
  return Observable.timer(0, 1000).pipe(
    timestamp(),
    map((time) => {
      const timePast = (time.timestamp - +(new Date(town.updatedAt))) / 3600000;
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
