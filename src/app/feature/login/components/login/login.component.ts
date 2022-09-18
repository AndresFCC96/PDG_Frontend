import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/feature/dashboard/shared/service/cliente.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Cliente } from '../../../dashboard/shared/model/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: String;
  contraUsu: String;
  cliente: Cliente;

  constructor(
    private auth: Auth,
    private builder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router) { }
s
  ngOnInit(): void {
    if(localStorage.getItem('persona')){
      this.router.navigate(['']);
    }
    this.loginForm = this.builder.group  ({
      email: '',
      contra: '',
    });

  }

  handleLogin(): void{
    let email = this.loginForm.controls.email.value;
    let pass = this.loginForm.controls.contra.value;
    let cliente: Cliente = {
      email:email,
      contra: pass
    };

    this.clienteService.consultarCliente(cliente).subscribe(data => {
      if(data){
        environment.isLogged = true;
        localStorage.setItem('persona', JSON.stringify(data));
        this.router.navigate(['Dashboard/userProfile'], {
          queryParams: {
            data
          }
        });
      }
    })
  }

}
