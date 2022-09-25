import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { ClienteService } from 'src/app/feature/dashboard/shared/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css'],
})
export class ModificarUsuarioComponent implements OnInit {
  userForm: FormGroup;
  loggeado = false;
  cliente: Cliente;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('persona')) {
      this.router.navigate(['']);
    }
    this.userForm = this.builder.group({
      nombre: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      apellidos: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      cedula: '',
      email: '',
      telefono: '',
      contra: '',
      recontra: '',
    });
    this.cliente = this.obtenerCliente();
  }

  obtenerCliente(): Cliente {
    let data: string;
    let cliente: Cliente;
    data = localStorage.getItem('persona');
    if (data) {
      cliente = JSON.parse(data);
      this.loggeado = true;
    }
    return cliente;
  }

  actualizarDatos(): void {
    let nombre;
    let apellidos;
    let cedula = this.cliente.cedula;
    let telefono;
    let email;
    let pass;
    let repass;

    if (
      this.userForm.controls.nombre.value === '' ||
      this.userForm.controls.nombre.value === undefined
    ) {
      nombre = this.cliente.nombre;
    } else {
      nombre = this.userForm.controls.nombre.value;
    }
    if (
      this.userForm.controls.apellidos.value === '' ||
      this.userForm.controls.apellidos.value === undefined
    ) {
      apellidos = this.cliente.apellidos;
    } else {
      apellidos = this.userForm.controls.apellidos.value;
    }
    if (
      this.userForm.controls.telefono.value === '' ||
      this.userForm.controls.telefono.value === undefined
    ) {
      telefono = this.cliente.telefono;
    } else {
      telefono = this.userForm.controls.telefono.value;
    }
    if (
      this.userForm.controls.email.value === '' ||
      this.userForm.controls.email.value === undefined
    ) {
      email = this.cliente.email;
    } else {
      email = this.userForm.controls.email.value;
    }
    if (
      this.userForm.controls.contra.value === '' ||
      this.userForm.controls.contra.value === undefined
    ) {
      pass = this.cliente.contra;
    } else {
      pass = this.userForm.controls.contra.value;
    }
    if (
      this.userForm.controls.recontra.value === '' ||
      this.userForm.controls.recontra.value === undefined
    ) {
      repass = this.cliente.recontra;
    } else {
      repass = this.userForm.controls.recontra.value;
    }

    let cliente: Cliente = {
      nombre: nombre,
      apellidos: apellidos,
      cedula: cedula,
      email: email,
      telefono: telefono,
      contra: pass,
      recontra: repass,
      rol: 'C'
    };

    console.log(cliente);

    cliente.contra === cliente.recontra
      ? this.clienteService.actualizarCliente(cliente).subscribe((data) => {
          if (data) {
            Swal.fire(
              'Excelente!',
              'Has modificado tus datos con exito!',
              'success'
            );
            localStorage.setItem('persona', JSON.stringify(data));
            this.router.navigate(['userProfile']);
          }
        })
      : Swal.fire(
          'Error al modificar el Cliente',
          'Las contraseñas no coinciden',
          'error'
        );
  }
}
