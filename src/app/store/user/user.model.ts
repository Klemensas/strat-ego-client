export interface User {
  _id: number;
  UserWorlds: any[];
  name: string;
  password: string;
  salt: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
