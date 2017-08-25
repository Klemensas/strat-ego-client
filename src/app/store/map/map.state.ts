import { Map } from './map.model';

export interface MapState {
  inProgress: boolean;
  activeTown: number;
  mapData: Map;
}

export const initialMapState: MapState = {
  inProgress: false,
  activeTown: null,
  mapData: null
};
