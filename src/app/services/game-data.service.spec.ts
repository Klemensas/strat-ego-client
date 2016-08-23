/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GameDataService } from './game-data.service';

describe('Service: GameData', () => {
  beforeEach(() => {
    addProviders([GameDataService]);
  });

  it('should ...',
    inject([GameDataService],
      (service: GameDataService) => {
        expect(service).toBeTruthy();
      }));
});
