import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
