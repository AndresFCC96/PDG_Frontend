import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ofertas } from 'src/app/feature/ofertas/shared/model/ofertas';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  private url: string = environment.UrlBase+"/";

  constructor(public httpClient: HttpClient) { }

  guardarOferta(producto: Ofertas): Observable<Ofertas>{
    return this.httpClient.post<Ofertas>(`${this.url}api/ofertas/guardarOferta`, producto).pipe(
      catchError(e => {
        Swal.fire(
          'Error al guardar la oferta',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  modificarOferta(producto: Ofertas): Observable<Ofertas>{
    return this.httpClient.put<Ofertas>(`${this.url}api/ofertas/actualizarOferta`, producto).pipe(
      catchError(e => {
        Swal.fire(
          'Error al guardar la oferta',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  consultarOfertasPorProducto(producto: number): Observable<Ofertas[]>{
    return this.httpClient.get<Ofertas[]>(`${this.url}api/ofertas/consultarOfertasPorProducto?id=${producto}`);
  }

  consultarOfertaMaximaPorProducto(producto: number): Observable<Ofertas>{
    return this.httpClient.get<Ofertas>(`${this.url}api/ofertas/consultarOfertaMaximaPorProducto?id=${producto}`);
  }
}
