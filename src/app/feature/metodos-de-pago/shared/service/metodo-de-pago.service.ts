import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { MetodoDePago } from '../model/MetodoDePago';


@Injectable()
export class MetodoDePagoService {

  private url: string = environment.UrlBase+"/";

  constructor(public httpClient: HttpClient) { }

  consultarMetodosDePagoPorCliente(cedula: number): Observable<MetodoDePago[]>{
    return this.httpClient.get<MetodoDePago[]>(`${this.url}api/metodoDePago/consultarMetodosDePagosPorCedula?cedula=${cedula}`).pipe(
      catchError(e => {
        Swal.fire(
          'Error al consultar los metodos de pago',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  guardarMetodoDePago(metodo: MetodoDePago): Observable<MetodoDePago>{
    return this.httpClient.post<MetodoDePago>(`${this.url}api/metodoDePago/guardarMetodoDePago`, metodo).pipe(
      catchError(e => {
        Swal.fire(
          'Error al guardar el metodo de pago',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  modificarMetodoDePago(metodo: MetodoDePago): Observable<MetodoDePago>{
    return this.httpClient.put<MetodoDePago>(`${this.url}api/metodoDePago/modificarMetodoDePago`, metodo).pipe(
      catchError(e => {
        Swal.fire(
          'Error al guardar el metodo de pago',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  eliminarrMetodoDePago(numeroTarjeta: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.url}api/metodoDePago/eliminarMetodoDePago?numeroTarjeta=${numeroTarjeta}`).pipe(
      catchError(e => {
        Swal.fire(
          'Error al guardar la direccion',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }
}
