import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { CategoriaService } from 'src/app/feature/dashboard/shared/service/categoria.service';
import { Producto } from 'src/app/feature/productos/shared/model/producto';
import { ProductoService } from 'src/app/feature/productos/shared/service/producto.service';
import Swal from 'sweetalert2';
import { Categoria } from '../../shared/model/categoria';

@Component({
  selector: 'app-subastas',
  templateUrl: './subastas.component.html',
  styleUrls: ['./subastas.component.css']
})
export class SubastasComponent implements OnInit {

  loggeado: boolean;
  nombre: string;
  productos: Producto[];
  categorias: Categoria[];
  opcion: number = 1;
  productosSize: number = 0;
  categoriaSeleccionada: string;

  filtros = [
    { opcion: "Filtro por default", value: 1},
    { opcion: "Filtrar por mas reciente", value: 2},
    { opcion: "Filtrar por mas antiguo", value: 3},
    { opcion: "Filtrar de mayor a menor precio", value: 4},
    { opcion: "Filtrar de menor a mayor precio", value: 5}
  ]

  constructor(private productoService: ProductoService,
              private categoriaService: CategoriaService,
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
        if(productos){
          this.productos = productos;
          (productos.length != undefined && productos.length > 0) ? this.productosSize = this.productos.length : this.productosSize = 0;
        }
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

  filtrarPorCategoria(categoria: string){
    console.log(categoria);

    this.productoService.consultarProductoPorCategoria(categoria).subscribe(
      producto => {
        if(producto){
          this.productos = producto;
        }
      }
    )
    Swal.fire({
      title: 'No existen productos en la categoria ' + categoria,
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://raw.githubusercontent.com/gist/brudnak/aba00c9a1c92d226f68e8ad8ba1e0a40/raw/e1e4a92f6072d15014f19aa8903d24a1ac0c41a4/nyan-cat.gif")
        left top
        no-repeat
      `
    })
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

  obtenerCategorias() {
    this.categoriaService.consultarCategorias().subscribe(categorias => {
      if(categorias){
        this.categorias = categorias;
      }
    })
  }

  async seleccionarCategoriaFiltro(){
    const categorias = [];
    this.obtenerCategorias();
    this.categorias.forEach(categoria => {if(categoria.nombre !== 'Arte' && categoria.nombre !== 'Cripto' && categoria.nombre !== 'Tecnologia' && categoria.nombre !== 'Antiguedades' && categoria.nombre !== 'Ropa y diseño de modas'){categorias.push( categoria.nombre)}});
    const { value: valor } = await Swal.fire({
      title: 'Seleccionar una categoria',
      input: 'select',
      inputOptions: {categorias},
      inputPlaceholder: 'A continuacion selecciona la categoria ',
      showCancelButton: true
    })

    if (valor) {
      this.filtrarPorCategoria(categorias[valor]);
    }
  }
}
