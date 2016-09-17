import { Units, Buildings, Resources } from './';

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
  createdAt: number;
  updatedAt: number;
}