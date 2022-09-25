import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Producto } from '../model/producto';

@Injectable()
export class ProductoService {

  private url: string = environment.UrlBase+"/";

  constructor(public httpClient: HttpClient) { }

  consultarProductos(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductos`);
  }

  consultarProductoPorCategoria(categoria: string): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductosPorCategoria?categoria=${categoria}`);
  }

  consultarProductoPorNombre(nombre: string): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductoPorNombre?nombre=${nombre}`);
  }

  consultarProductoPorAutor(autor: string): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductosPorAutor?autor=${autor}`);
  }

  consultarProductosPorMasAntiguo(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductosMasAntiguos`);
  }

  consultarProductosPorMasReciente(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductosMasRecientes`);
  }

  consultarProductosPorValoracionMenor(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductosMenorPrecio`);
  }

  consultarProductosPorValoracionMayor(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.url}api/producto/consultarProductosMayorPrecio`);
  }

  guardarProducto(producto: Producto): Observable<Producto>{
    return this.httpClient.post<Producto>(`${this.url}api/producto/guardarProducto`, producto).pipe(
      catchError(e => {
        Swal.fire(
          'Error al guardar el producto',
          e.error,
          'error'
        );
        return throwError(e);
      })
    );
  }







}
