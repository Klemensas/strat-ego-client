export interface Credentials {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  UserWorlds: any[];
  name: string;
  password: string;
  salt: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
