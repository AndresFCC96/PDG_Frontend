import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { Direccion } from '../../shared/model/direccion';
import { DireccionService } from '../../shared/service/direccion.service';


@Component({
  selector: 'app-lista-direcciones',
  templateUrl: './lista-direcciones.component.html',
  styleUrls: ['./lista-direcciones.component.css']
})
export class ListaDireccionesComponent implements OnInit {

  cliente: Cliente;
  loggeado = false;
  direcciones: Direccion[];
  sizeDirecciones: number;
  page = 1;
  pageSize = 5;

  constructor(private direccionesService:DireccionService,
    private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('persona')){
      this.router.navigate(['']);
    }
    this.cliente = this.obtenerCliente();
    this.obtenerDireccionesPorCliente();
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

  obtenerDireccionesPorCliente(): void{
    this.direccionesService.consultarDireccionesPorCliente(this.cliente.cedula).subscribe(data => {
      this.direcciones = data;
      this.sizeDirecciones = this.direcciones.length;
    })

    if(this.sizeDirecciones === undefined){
      this.sizeDirecciones = 0;
    }
  }
}
