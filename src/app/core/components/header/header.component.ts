import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cliente: Cliente;
  loggeado = false;
  rol: string = '';

  constructor() { }

  ngOnInit(): void {
    this.cliente = this.obtenerCliente();
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

  cerrarSesion(){
    localStorage.clear();
    window.location.reload();
  }
}
