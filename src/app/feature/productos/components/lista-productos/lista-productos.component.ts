import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { FirebaseUploadsService } from 'src/app/core/services/firebase-uploads.service';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { Ofertas } from 'src/app/feature/ofertas/shared/model/ofertas';
import { Producto } from 'src/app/feature/productos/shared/model/producto';
import { ProductoService } from 'src/app/feature/productos/shared/service/producto.service';
import Swal from 'sweetalert2';
import { OfertaService } from '../../shared/service/oferta.service';

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
  rol: string = '';
  ofertaMaxima: Ofertas;
  nombreGanador: string;
  ofertaGanadora: number;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private firebaseUploadsService: FirebaseUploadsService,
    private ofertaService: OfertaService
  ) { }

  ngOnInit(): void {
    if(!localStorage.getItem('persona')){
      this.router.navigate(['']);
    }
    this.cliente = this.obtenerCliente();
    this.obtenerListaDeProductos();
  }

  obtenerCliente(): Cliente {
    let data: string;
    let cliente: Cliente;
    data = localStorage.getItem('persona');
    if(data){
      cliente = JSON.parse(data);
      this.loggeado = true;
      this.rol = cliente.rol;
    }
    return cliente;
  }

  obtenerListaDeProductos(){
    let autor = this.cliente.nombre + ' ' + this.cliente.apellidos;

    this.cliente.rol === 'C'
    ? this.productoService.consultarProductoPorCliente(this.cliente.cedula).subscribe(data => {
        this.productos = data;
        this.sizeProductos = this.productos.length;
    })
    : this.productoService.consultarProductos().subscribe(listaProductos => {
      this.productos = listaProductos;
      this.sizeProductos = this.productos.length;
    })

    if(this.sizeProductos === undefined){
      this.sizeProductos = 0;
    }
  }

  mandarProducto(producto: Producto){
    this.router.navigate(['/ofertaProductos/',producto.idproducto], {
      queryParams: {
          producto: producto.idproducto,
      },
    });
  }


  // consultarOfertaMaximaPorProducto(id: number){
  // }

  cerrarSubasta(producto: Producto){
    console.log(producto);

    this.ofertaService.consultarOfertaMaximaPorProducto(producto.idproducto).subscribe(ofertas => {
      if(ofertas){
        this.ofertaMaxima = ofertas;
        this.ofertaMaxima.estado = 'G';
        this.ofertaGanadora = ofertas.valorOferta;
        this.nombreGanador = ofertas.nombreClienteOferta;
        producto.clienteGanador = this.ofertaMaxima.clienteOferta;
        producto.valoracionAutor = this.ofertaMaxima.valorOferta;
        producto.estado = 'C';
        this.productoService.modificarProducto(producto).subscribe(prod => {
          if(prod){
            this.ofertaService.modificarOferta(this.ofertaMaxima).subscribe();
            Swal.fire(
              'Felicidades!',
              'Subasta cerrada con exito, y el ganador fue ' + this.nombreGanador + ' con una oferta de ' + this.ofertaGanadora,
              'success'
            )
          }
        })
      }
    })
  };

}
