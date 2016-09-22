import { Units, Buildings, Resources, BuildingQueue } from './';

export class Town {
  _id: number;
  PlayerId: number;
  name: string;
  location: Array<number>;
  moneyPercent: number;
  buildings: Buildings;
  production: Resources;
  resources: Resources;
  units: Units;
  BuildingQueues: [BuildingQueue];
  createdAt: number;
  updatedAt: number;
}
