import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  state: String = 'landing';
  public stateUpdate = new Subject<String>();

  changeState(state: String): void {
    this.state = state;
    this.stateUpdate.next(state);
  }
}
