import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente;
  cedula: number;
  sizeClientes: number;
  page = 1;
  pageSize = 5;

  constructor(private clienteService: ClienteService,
    private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('persona')){
      this.router.navigate(['']);
    }
    this.cliente = this.obtenerCliente();
    this.cedula = this.cliente.cedula;
    this.obtenerClientes();
  }

  obtenerCliente(): Cliente {
    let data: string;
    let cliente: Cliente;
    data = localStorage.getItem('persona');
    if(data){
      cliente = JSON.parse(data);
    }
    return cliente;
  }

  obtenerClientes(){
    this.clienteService.consultarClientes().subscribe(clientes => {
      clientes ? this.clientes = clientes : alert('No hay clientes que mostrar');
      this.sizeClientes = this.clientes.length;
    })

    if(this.sizeClientes === undefined){
      this.sizeClientes = 0;
    }
  }

  cambiarPermisosUsuario(cliente:Cliente){
    Swal.fire({
      title: '¿Seguro que quiere cambiar los permisos de este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Moficar',
      denyButtonText: `No modificar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        cliente.rol === 'A' ? cliente.rol = 'C' : cliente.rol = 'A';
        this.clienteService.actualizarCliente(cliente).subscribe(data => { if(data){Swal.fire('Felicidades!', 'Usuario modificado con exito', 'success'), this.obtenerClientes();}});
        this.obtenerClientes();
      } else if (result.isDenied) {
        Swal.fire('Alerta', 'No se modifico ningun usuario', 'info')
      }
    })
  }

  inhabilitarsUsuario(clienteAInactivar:Cliente){
    Swal.fire({
      title: '¿Seguro que quiere cambiar los permisos de este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Moficar',
      denyButtonText: `No modificar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAInactivar.estado === 'A' ? clienteAInactivar.estado = 'I' : clienteAInactivar.estado = 'A';
        console.log(clienteAInactivar);

        this.clienteService.actualizarCliente(clienteAInactivar).subscribe(data => { if(data){Swal.fire('Felicidades!', 'Usuario modificado con exito', 'success'), this.obtenerClientes();}});
        this.obtenerClientes();
      } else if (result.isDenied) {
        Swal.fire('Alerta', 'No se modifico ningun usuario', 'info')
      }
    })
  }
}
