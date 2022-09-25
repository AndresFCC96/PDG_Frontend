import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = environment.UrlBase+"/";

  constructor(public httpClient: HttpClient) { }

  consultarCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.url}api/categoria/consultarCategorias`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.post<Categoria>(`${this.url}api/categoria/guardarCategoria`, categoria).pipe(
      catchError(e => {
        Swal.fire(
          'Error al crear la categoria',
          e.error,
          'error',
        );
        return throwError(e);
      })
    );
  }

  modificarCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.put<Categoria>(`${this.url}api/categoria/modificarCategoria`, categoria).pipe(
      catchError(e => {
        Swal.fire(
          'Error al modificar la categoria',
          e.error,
          'error',
        );
        return throwError(e);
      })
    );
  }
}
