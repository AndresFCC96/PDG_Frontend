import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { FirebaseUploadsService } from 'src/app/core/services/firebase-uploads.service';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { Producto } from 'src/app/feature/productos/shared/model/producto';
import { ProductoService } from 'src/app/feature/productos/shared/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  cliente: Cliente;
  loggeado = false;
  productos: Producto[];
  sizeProductos: number;
  ruta:string;
  page = 1;
  pageSize = 10;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private firebaseUploadsService: FirebaseUploadsService
  ) { }

  ngOnInit(): void {
    if(!localStorage.getItem('persona')){
      this.router.navigate(['']);
    }
    this.cliente = this.obtenerCliente();
    this.obtenerListaDeProductosPorAutor();
  }

  obtenerCliente(): Cliente {
    let data: string;
    let cliente: Cliente;
    data = localStorage.getItem('persona');
    if(data){
      cliente = JSON.parse(data);
      this.loggeado = true;
    }
    return cliente;
  }

  obtenerListaDeProductosPorAutor(){
    let autor = this.cliente.nombre + ' ' + this.cliente.apellidos;
    this.productoService.consultarProductoPorAutor(autor).subscribe(data => {
        this.productos = data;
        this.sizeProductos = this.productos.length;
    })

    if(this.sizeProductos === undefined){
      this.sizeProductos = 0;
    }
  }

  descargarArchivoProducto(producto: Producto){
    const storage = getStorage();
    const httpsReference = ref(storage, `Productos/${producto.nombre}/Archivo/${producto.archivo}`);
    getDownloadURL(httpsReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.download(url, producto.archivo);
        this.ruta=url;
      })
    }

    download(url: string, nombre: string): void {
      this.firebaseUploadsService
        .download(url)
        .subscribe(blob => {
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl
          a.download = nombre;
          a.click();
          URL.revokeObjectURL(objectUrl);
        })
    }
}
