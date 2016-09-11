/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MapService } from './map.service';

describe('Service: Map', () => {
  beforeEach(() => {
    addProviders([MapService]);
  });

  it('should ...',
    inject([MapService],
      (service: MapService) => {
        expect(service).toBeTruthy();
      }));
});
