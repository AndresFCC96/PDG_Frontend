import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Ofertas } from 'src/app/feature/ofertas/shared/model/ofertas';
import { Producto } from 'src/app/feature/productos/shared/model/producto';
import { OfertaService } from 'src/app/feature/productos/shared/service/oferta.service';
import { ProductoService } from 'src/app/feature/productos/shared/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta-producto',
  templateUrl: './oferta-producto.component.html',
  styleUrls: ['./oferta-producto.component.css']
})
export class OfertaProductoComponent implements OnInit {

  idProducto: number;
  producto: Producto;
  ofertas: Ofertas[];
  sizeOfertas: number;
  ofertaMaxima: Ofertas;
  page = 1;
  pageSize = 5;
  nombreGanador: string;
  ofertaGanadora: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private ofertaService: OfertaService) { }

  ngOnInit(): void {
    this.idProducto = Number(this.activatedRoute.snapshot.paramMap.get('producto'));
    this.consultarProducto(this.idProducto);
    this.consultarOfertasPorProducto(this.idProducto);
    // this.consultarOfertaMaximaPorProducto(this.idProducto);
  }

  consultarProducto(id: number) {
    this.productoService.consultarProductoPorId(id).subscribe(data =>{
      if(data){
        this.producto = data;
      }
    })
  }

  consultarOfertasPorProducto(id: number){
    this.ofertaService.consultarOfertasPorProducto(id).subscribe(ofertas => {
      if(ofertas){
        this.ofertas = ofertas;
        this.sizeOfertas = this.ofertas.length;
      }
    })

    if(this.sizeOfertas === undefined){
      this.sizeOfertas = 0;
    }
  }

  cerrarbajasta(producto: Producto, oferta: Ofertas){
    this.ofertaGanadora = oferta.valorOferta;
    this.nombreGanador = oferta.nombreClienteOferta;
    producto.clienteGanador = oferta.clienteOferta;
    producto.valoracionAutor = this.ofertaGanadora;
    producto.estado = 'C';
    oferta.estado = 'G';
    this.productoService.modificarProducto(producto).subscribe(prod => {
      if(prod){
        this.ofertaService.modificarOferta(oferta).subscribe();
        Swal.fire(
          'Felicidades!',
          'Subasta cerrada con exito, y el ganador fue ' + this.nombreGanador + ' con una oferta de ' + this.ofertaGanadora,
          'success'
        )
      }
    })
  };

}
