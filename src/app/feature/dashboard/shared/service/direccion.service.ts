import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Direccion } from '../model/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  private url: string = environment.UrlBase+"/";

  constructor(public httpClient: HttpClient) { }

  consultarDireccionesPorCliente(cedula: number): Observable<Direccion[]>{
    return this.httpClient.get<Direccion[]>(`${this.url}api/direccion/consultarDireccionesPorCedula?cedula=${cedula}`);
  }

  guardarDireccion(direccion: Direccion): Observable<Direccion>{
    return this.httpClient.post<Direccion>(`${this.url}api/direccion/guardarDireccion`, direccion).pipe(
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
