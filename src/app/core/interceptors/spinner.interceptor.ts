import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      this.spinnerService.mostrar();

      return next.handle(req)
          .pipe(tap((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                  this.spinnerService.ocultar();
              }
          }, (error) => {
              this.spinnerService.ocultar();
          }));


  }

}
