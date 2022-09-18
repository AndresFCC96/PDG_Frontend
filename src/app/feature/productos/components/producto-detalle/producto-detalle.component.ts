import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptService } from 'src/app/feature/metodos-de-pago/shared/service/script.service';
import Swal from 'sweetalert2';
import { Producto } from '../../shared/model/producto';
import { ProductoService } from '../../shared/service/producto.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent implements OnInit {

  nombre: string;
  producto: Producto;
  query: Producto[];
  precioCliente: number;

  constructor(
    protected jsServiceLoader: ScriptService,
    protected productoService: ProductoService,
    private activatedRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((data) => {
      this.nombre = data.nombre;
    });
    this.cargarProducto();
    this.cargaPaginaProducto();
  }

  ngOnDestroy(): void {
    this.jsServiceLoader.removeScript('detalleProducto');
  }

  cargarProducto() {
    this.productoService.consultarProductoPorNombre(this.nombre).subscribe(producto => {
      if(producto){
        this.query = producto;
        this.producto = this.query[0];
      }
    })
  }

  cargaPaginaProducto() {
    this.jsServiceLoader
      .loadScript({ id: 'detalleProducto', url: 'assets/js/script.js' })
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }

  comparacion() {
    const mayor: number = (this.precioCliente - this.producto.valoracionAutor);
    const menor: number = this.producto.valoracionAutor - this.precioCliente;

    console.log(this.precioCliente);

    if(!this.precioCliente){
      Swal.fire(
        'Error',
        'Debes de proporcionar un valor para comparar',
        'error'
      )
    }else{
      this.producto.valoracionAutor < this.precioCliente
      ?
      Swal.fire(
        'Estas pagando mas de lo que el autor pide',
        'Te sobran ' + mayor,
        'info'
      )
      // console.log('mayor ' + mayor)
      :
      Swal.fire(
        'Estas pagando menos de lo que el autor pide',
        'Debes ' + menor,
        'info'
      )
      // console.log('menor ' + menor)
    }

  }
}
