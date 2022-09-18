import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import Swal from 'sweetalert2';
import { Direccion } from '../../shared/model/direccion';
import { DireccionService } from '../../shared/service/direccion.service';

@Component({
  selector: 'app-crear-direccion',
  templateUrl: './crear-direccion.component.html',
  styleUrls: ['./crear-direccion.component.css']
})
export class CrearDireccionComponent implements OnInit {

  direccionForm: FormGroup;
  cliente: Cliente;
  loggeado = false;

  constructor(private builder: FormBuilder,
    private direccionService: DireccionService,
    private router: Router) { }

  ngOnInit(): void {
    this.direccionForm = this.builder.group({
      direccion: '',
    });
    this.cliente = this.obtenerCliente();
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

  guardarDireccion(): void{
    let datosDireccion = this.direccionForm.controls.direccion.value;
    let direccion: Direccion = {
      idDireccion: 1,
      direccion: datosDireccion,
      cedulaCliente: this.cliente.cedula,
      estado: 'A'
    };
    this.direccionService.guardarDireccion(direccion).subscribe(data => {
      if(data){
        Swal.fire(
          'Excelente!',
          'Direccion creado con exito!',
          'success'
        )
        this.router.navigate(['/direccionesList']);
      }
    })
  }
}
