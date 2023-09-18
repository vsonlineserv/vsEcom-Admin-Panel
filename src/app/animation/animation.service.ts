import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  public sideNavState$: Subject<boolean> = new Subject();

  constructor() { }
}
