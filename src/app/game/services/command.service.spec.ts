/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnitService } from './command.service';

describe('CommandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandService]
    });
  });

  it('should ...', inject([CommandService], (service: CommandService) => {
    expect(service).toBeTruthy();
  }));
});
