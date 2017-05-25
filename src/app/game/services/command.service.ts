import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommandService {
  public targeting = new BehaviorSubject(null);

  constructor() { }

}
