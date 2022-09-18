import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/feature/dashboard/shared/service/cliente.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  cliente: Cliente;
  logupForm: FormGroup;

  constructor(
    public auth: Auth,
    private builder: FormBuilder,
    public clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('persona')){
      this.router.navigate(['']);
    }
    this.logupForm = this.builder.group({
      nombre: '',
      apellidos: '',
      cedula: '',
      email: '',
      telefono: '',
      contra: '',
      recontra: '',
    });
  }

  handleLogup(){
    let nombre = this.logupForm.controls.nombre.value;
    let apellidos = this.logupForm.controls.apellidos.value;
    let cedula = this.logupForm.controls.cedula.value;
    let telefono = this.logupForm.controls.telefono.value;
    let email = this.logupForm.controls.email.value;
    let pass = this.logupForm.controls.contra.value;
    let repass = this.logupForm.controls.recontra.value;
    let cliente: Cliente = {
      nombre:nombre,
      apellidos:apellidos,
      cedula:cedula,
      email:email,
      telefono:telefono,
      contra: pass,
      recontra: repass
    };

    cliente.contra === cliente.recontra
    ?
    this.clienteService.guardarCliente(cliente).subscribe(data => {
      if(data){
        Swal.fire(
          'Excelente!',
          'Te has registrado con exito!',
          'success'
        )
        localStorage.setItem('persona', JSON.stringify(data));
        this.router.navigate(['/Dashboard/userProfile']);
      }
    })
    :
    Swal.fire(
      'Error al crear el Cliente',
      'Las contraseñas no coinciden',
      'error'
    )
  }

}
