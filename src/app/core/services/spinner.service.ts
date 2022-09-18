import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class SpinnerService {

  loading = new BehaviorSubject<boolean>(false)
  spinner$ = this.loading.asObservable();

  constructor() { }

  mostrar(): void {
    this.loading.next(true);
  }

  ocultar(): void{
    this.loading.next(false);
  }
}
