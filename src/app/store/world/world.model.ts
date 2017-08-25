export interface Requirements {
  item: string;
  level: number;
}
export interface Resources {
  clay: number;
  wood: number;
  iron: number;
}
export interface Combat {
  attack: number;
  defense: {
    general: number;
    cavalry: number;
    archer: number;
  }
}
export interface Unit {
  _id: number;
  name: string;
  costs: Resources;
  combat: Combat;
  attackType: string;
  haul: number;
  speed: number;
  recruitTime: number;
  requirements: Requirements[];
  createdAt: string;
  updatedAt: string;
}
export interface BuildingData {
  buildTime: number;
  costs: Resources;
  production?: number;
  population?: number;
  storage?: number;
  defense?: number;
  recruitment?: number;
}
export interface Building {
  _id: number;
  name: string;
  data: {

  }
  levels: {
    max: number;
    min: number;
  }
  requirements: Requirements[];
  createdAt: string;
  updatedAt: string;
}
export interface World {
  name: string;
  barbPercent: number;
  baseProduction: number;
  generationArea: number;
  currentRing: number;
  fillPercent: number;
  fillTime: string;
  regionSize: number;
  size: number;
  speed: number;
  timeQouta: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorldData {
  buildingMap: { [building: string]: Building };
  unitMap: { [unit: string]: Unit };
  units: Unit[];
  buildings: Building[];
  world: World;
}
