import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';
import { ClienteService } from 'src/app/feature/dashboard/shared/service/cliente.service';
import { FirebaseUploadsService } from 'src/app/core/services/firebase-uploads.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  cliente: Cliente;
  loggeado = false;
  file: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private clienteService: ClienteService,
              private firebaseUploadService: FirebaseUploadsService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('persona')) {
      this.router.navigate(['']);
    }
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

  obtenerFoto(event: any) {
    this.file = event.target.files[0];
    const storage = getStorage();
    const imgRef = ref(storage,`Usuarios/${this.cliente.nombre + this.cliente.apellidos + this.cliente.cedula}`);
    const uploadTask = uploadBytesResumable(imgRef, this.file);
    var url: string = '';

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        alert('El porcentaje de subida es de ' + progress + '%');
        switch (snapshot.state) {
          case 'paused':
            console.log('La carga se ha pausado');
            break;
          case 'running':
            console.log('La carga esta activa');
            break;
        }
      },
      (error) => {
        Swal.fire(
          'Error',
          'No se pudo cargar la foto',
          'error'
        )
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.actualizarFotoCliente(downloadURL);
        });
      }
    );
  };

  actualizarFotoCliente(url: string): void {
    this.cliente.foto = url;
    this.clienteService.actualizarCliente(this.cliente).subscribe((data) => {
          if (data) {
            Swal.fire(
              'Excelente!',
              'Foto modificada con exito!',
              'success'
            );
            localStorage.setItem('persona', JSON.stringify(data));
            this.router.navigate(['userProfile']);
          }
        });
  }
}
