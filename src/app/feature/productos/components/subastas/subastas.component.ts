import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { Producto } from 'src/app/feature/productos/shared/model/producto';
import { ProductoService } from 'src/app/feature/productos/shared/service/producto.service';

@Component({
  selector: 'app-subastas',
  templateUrl: './subastas.component.html',
  styleUrls: ['./subastas.component.css']
})
export class SubastasComponent implements OnInit {

  loggeado: boolean;
  nombre: string;
  productos: Producto[];
  opcion: number = 1;
  productosSize: number = 0;

  filtros = [
    { opcion: "Filtro por default", value: 1},
    { opcion: "Filtrar por mas reciente", value: 2},
    { opcion: "Filtrar por mas antiguo", value: 3},
    { opcion: "Filtrar de mayor a menor precio", value: 4},
    { opcion: "Filtrar de menor a mayor precio", value: 5}
  ]

  constructor(private productoService: ProductoService,
              private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('persona')){
      this.loggeado = true;
    }
    this.cargarProductos();
  }

  opcionSeleccionada(value: number){
    let valor = (event.target as HTMLInputElement).value;

    console.log(valor);

    if( valor === '1'){
      this.cargarProductos()
    }else if(valor === '2'){
      this.filtrarPorMayorAntiguedad()
    }else if( valor === '3'){
      this.filtrarPorMenorAntiguedad()
    }else if( valor === '4'){
      this.filtrarPorMayorValoracion()
    }else if( valor === '5' ){
      this.filtrarPorMenorValoracion()
    }

  }

  cerrarSesion(){
    localStorage.clear();
    window.location.reload();
  }

  cargarProductos(): void{
    this.productoService.consultarProductos().subscribe(
      productos => {
        this.productos = productos;
        (productos.length != undefined && productos.length > 0) ? this.productosSize = this.productos.length : this.productosSize = 0;

      }
    )
  }

  filtrarPorMenorValoracion(): void{
    this.productoService.consultarProductosPorValoracionMenor().subscribe(
      productos => {
        this.productos = productos;
      }
    )
  }

  filtrarPorMayorValoracion(): void{
    this.productoService.consultarProductosPorValoracionMayor().subscribe(
      productos => {
        this.productos = productos;
      }
    )
  }

  filtrarPorMenorAntiguedad(): void{
    this.productoService.consultarProductosPorMasReciente().subscribe(
      productos => {
        this.productos = productos;
      }
    )
  }

  filtrarPorMayorAntiguedad(): void{
    this.productoService.consultarProductosPorMasAntiguo().subscribe(
      productos => {
        this.productos = productos;
      }
    )
  }

  filtrarPorNombre(): void{
    if(this.nombre){
      this.productoService.consultarProductoPorNombre(this.nombre).subscribe(
        producto => {
          this.productos = producto
        }
      )
    }
  }

  limpiarFiltros(): void{
    this.cargarProductos();
  }

  detalleProducto(producto: Producto): void{
    this.router.navigate(['/productDetail/',producto.nombre], {
      queryParams: {
          nombre: producto.nombre,
      },
  });
  }
}
