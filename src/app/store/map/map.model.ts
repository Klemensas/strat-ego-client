export interface Map {
  [coords: string]: {
    id: number;
    name: string;
    location: number[];
    owner?: {
      id: number;
      name: string;
    };
    alliance?: {
      id: number;
      name: string;cmd
    };
  };
}
