import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { MetodoDePago } from 'src/app/feature/metodos-de-pago/shared/model/MetodoDePago';

import Swal from 'sweetalert2';
import { MetodoDePagoService } from '../../shared/service/metodo-de-pago.service';

@Component({
  selector: 'app-lista-metodos',
  templateUrl: './lista-metodos.component.html',
  styleUrls: ['./lista-metodos.component.css']
})
export class ListaMetodosComponent implements OnInit {

  cliente: Cliente;
  loggeado = false;
  metodos: MetodoDePago[];
  sizeMetodos: number;
  page = 1;
  pageSize = 10;

  constructor(private metodosService: MetodoDePagoService,
    private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('persona')){
      this.router.navigate(['']);
    }
    this.cliente = this.obtenerCliente();
    this.obtenerMetodosPorCliente();
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

  obtenerMetodosPorCliente(): void{
    this.metodosService.consultarMetodosDePagoPorCliente(this.cliente.cedula).subscribe(data => {
      this.metodos = data;
      this.sizeMetodos = this.metodos.length;
    })

    if(this.sizeMetodos === undefined){
      this.sizeMetodos = 0;
    }
  }

  borrarMetodo(metodo: MetodoDePago): void{
    this.metodosService.eliminarrMetodoDePago(metodo.numeroTarjeta).subscribe(data => {
      Swal.fire(
        'Felicidades',
        'metodo eliminado con exito',
        'success'
      );
      this.router.navigate(['/metodosList']);
    })
  }
}
