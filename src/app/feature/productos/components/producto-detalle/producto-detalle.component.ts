import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { ScriptService } from 'src/app/feature/metodos-de-pago/shared/service/script.service';
import { Ofertas } from 'src/app/feature/ofertas/shared/model/ofertas';
import Swal from 'sweetalert2';
import { Producto } from '../../shared/model/producto';
import { OfertaService } from '../../shared/service/oferta.service';
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
  cliente: Cliente;
  comparacio: boolean = false;
  precioCliente: number = 0;
  cedulaClienteActual: number;

  constructor(
    protected jsServiceLoader: ScriptService,
    protected productoService: ProductoService,
    private activatedRouter: ActivatedRoute,
    private ofertaService: OfertaService,
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((data) => {
      this.nombre = data.nombre;
    });
    this.cargarProducto();
    this.cargaPaginaProducto();
    this.cliente = this.obtenerCliente();
  }

  ngOnDestroy(): void {
    this.jsServiceLoader.removeScript('detalleProducto');
  }

  subirLaCuenta(valor: number){
    this.precioCliente = this.precioCliente + valor;
  }

  obtenerCliente(): Cliente {
    let data: string;
    let cliente: Cliente;
    data = localStorage.getItem('persona');
    if (data) {
      cliente = JSON.parse(data);
      this.cedulaClienteActual = cliente.cedula;
    }
    return cliente;
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

  ofertar(productoParamatro: Producto) {
    let total = productoParamatro.valoracionAutor + this.precioCliente;
    let oferta: Ofertas = {
      clienteOferta: this.cliente.cedula,
      clienteResponsable: productoParamatro.clienteResponsable,
      nombreClienteOferta: this.cliente.nombre + ' ' + this.cliente.apellidos,
      valorOferta: total,
      producto: productoParamatro.idproducto,
      estado: 'O'
    }
    console.log(oferta.nombreClienteOferta);


    this.ofertaService.guardarOferta(oferta).subscribe(oferta => {
        if(oferta){
          if(productoParamatro.valoracionAutor < (productoParamatro.valoracionAutor + this.precioCliente) && this.producto.tipoDeSubasta === 'S'){
            productoParamatro.valoracionAutor = (productoParamatro.valoracionAutor + this.precioCliente)
            this.productoService.modificarProducto(productoParamatro).subscribe();
          };
          Swal.fire(
            'Felicidades!',
            'Has hecho una oferta de ' + (productoParamatro.valoracionAutor) + ' pesos',
            'success'
          );
      }
    })
    // if(this.precioCliente === 0){
    // }else{
    //   this.ofertaService.guardarOferta()
    //   this.producto.valoracionAutor < this.precioCliente
    //   ?
    //   Swal.fire(
    //     'Estas pagando mas de lo que el autor pide',
    //     'Te sobran ' + mayor,
    //     'info'
    //   )
    //   // console.log('mayor ' + mayor)
    //   :
    //   Swal.fire(
    //     'Estas pagando menos de lo que el autor pide',
    //     'Debes ' + menor,
    //     'info'
    //   )
    // }
  }


}
