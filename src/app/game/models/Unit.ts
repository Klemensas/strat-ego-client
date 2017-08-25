import { Resources, Combat } from './';

export class Unit {
  _id: number;
  name: string;
  haul: number;
  recruiTime: number;
  speed: number;
  type: [string];
  costs: Resources;
  combat: Combat;
  // requirements: [Building]
}
