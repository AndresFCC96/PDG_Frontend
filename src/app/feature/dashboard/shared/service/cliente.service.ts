import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Cliente } from '../model/cliente';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = environment.UrlBase+"/";

  constructor(public httpClient: HttpClient) { }

  consultarCliente(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.post<Cliente>(`${this.url}api/cliente/consultarCliente`, cliente).pipe(
      catchError(e => {
        Swal.fire(
          'Error al consultar el Cliente',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  consultarClientes(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.url}api/cliente/consultarClientes`).pipe(
      catchError(e => {
        Swal.fire(
          'Error al consultar el Cliente',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  guardarCliente(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.post<Cliente>(`${this.url}api/cliente/guardarCliente`, cliente).pipe(
      catchError(e => {
        Swal.fire(
          'Error al crear el Cliente',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.put<Cliente>(`${this.url}api/cliente/actualizarCliente`, cliente).pipe(
      catchError(e => {
        Swal.fire(
          'Error al modificar el Cliente',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }
}
