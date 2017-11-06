import { Town } from './Town';

export class Player {
  _id: number;
  UserId: number;
  name: string;
  Towns: [Town];
  createdAt: number;
  updatedAt: number;
}
