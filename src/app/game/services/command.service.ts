import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommandService {
  public targeting = new BehaviorSubject(null);

  constructor() { }

}
