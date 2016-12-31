import { Unit, Building, Resources, BuildingQueue } from './';

export class Town {
  _id: number;
  PlayerId: number;
  name: string;
  location: [number];
  moneyPercent: number;
  production: Resources;
  resources: Resources;
  buildings: {
    [index: string]: {
      amount: number;
      queued: number;
    }
  };
  units: {
    [index: string]: {
      amount: number;
      queued: number;
    }
  };
  BuildingQueues: [BuildingQueue];
  createdAt: number;
  updatedAt: number;
}
