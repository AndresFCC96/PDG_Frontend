import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { add } from 'date-fns';
import { interval, Subscription, takeWhile } from 'rxjs';
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
  date: Date;
  subscription$: Subscription;
  fechaActual: string;
  estadoSubastasProximas: boolean = false;
  labelSubastas: string = 'Proximas subastas';

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
    this.obtenerCategorias();
    this.counter();
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date, 'dd/MM/YYYY');
    this.fechaActual = formattedDate;
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  private counter() {
    // fecha cualquiera inicializada con dos horas
    this.date = new Date('2000-01-01 02:00:00');
    // contador de las veces que el interval debe emitir
    let segundosEnHoras = 2 * 60 * 60;
    // interval que emite cada segundo
    this.subscription$ = interval(1000)
      // tomar un valor mientras aun queden segundos en la cuenta
      .pipe(takeWhile(() => segundosEnHoras-- > 0))
      .subscribe({
        // restar un segundo a la fecha actual
        next: () => (this.date = add(this.date, { seconds: -1 })),
        // cuando la cuenta termine reiniciar el contador
        complete: () => this.counter(),
      });
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

  // 1 opcion para las subastas del dia actual, 2 para las subastas de otros dias
  calcularProductosMostrados(size: number, opcion: number){
    let contador = size;
    if(opcion === 1){
      for (let index = 0; index < this.productos.length; index++) {
        if(this.productos[index].fechaSubida !== this.fechaActual ){contador--;
          // console.log(this.productos[index].fechaSubida, this.fechaActual);
          // console.log(this.productos[index].fechaSubida === this.fechaActual);
        };
      }
    }else{
      const index = [];
      for (let index = 0; index < this.productos.length; index++) {
        var parts = this.productos[index].fechaSubida.split('/');
        var d1 = Number(parts[2] + parts[1] + parts[0]);
        parts = this.fechaActual.split('/');
        var d2 = Number(parts[2] + parts[1] + parts[0]);
        if((this.productos[index].fechaSubida === this.fechaActual) || d1 < d2){
          contador--;
          this.productos[index].estado = 'C';
        };

      };
    }
    // console.log(contador);

    this.productosSize = contador;
  }

  compararFechas(fecha: string): boolean{
    let fechaLocal = Date.parse(this.fechaActual);
    let fechaParametro = Date.parse(fecha);
    if(fechaLocal > fechaParametro ){
      this.productosSize = this.productosSize--;
      return true;
    }else{
      return false;
    }
  }

  activarProximos(){
    if(this.estadoSubastasProximas === true){
      this.estadoSubastasProximas = false;
      this.labelSubastas = 'Proximas subastas';
      this.calcularProductosMostrados(this.productos.length, 1);
      this.cargarProductos();
    }else{
      this.estadoSubastasProximas = true;
      this.labelSubastas = 'Subastas del dia';
      this.calcularProductosMostrados(this.productos.length, 2);
    };
  }

  cargarProductos(): void{
    this.productoService.consultarProductos().subscribe(
      productos => {
        if(productos){
          this.productos = productos;
          // (productos.length != undefined && productos.length > 0) ? this.productosSize = this.productos.length : this.productosSize = 0;
          this.calcularProductosMostrados(this.productos.length, 1);
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
    console.log(this.nombre);

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
          this.productos = producto;
          // this.productosSize = this.productos.length;
          console.log(this.productos);
      },
      err => {
        console.log(err)
          Swal.fire({
            title: err.error,
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
    )
  }

  limpiarFiltros(): void{
    this.cargarProductos();
  }

  detalleProducto(producto: Producto): void{
    this.router.navigate(['/productDetail',producto.nombre], {
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
    this.categorias.forEach(categoria => {if(categoria.nombre !== 'Arte' && categoria.nombre !== 'Cripto' && categoria.nombre !== 'Tecnología' && categoria.nombre !== 'Antiguedades' && categoria.nombre !== 'Ropa y diseño de modas'){categorias.push( categoria.nombre), this.productosSize = 0}});
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
