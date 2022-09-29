import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Categoria } from 'src/app/feature/dashboard/shared/model/categoria';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { CategoriaService } from 'src/app/feature/dashboard/shared/service/categoria.service';
import { Producto } from 'src/app/feature/productos/shared/model/producto';
import { ProductoService } from 'src/app/feature/productos/shared/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  loginForm: FormGroup;
  cliente: Cliente;
  producto: Producto;
  categorias: Categoria[];
  loggeado = false;
  rutaFoto: string;
  rutaArchivo: string;
  foto: any;
  archivo: any;
  paso: number = 1;
  tipoDeSubasta: string;


  constructor(
    private builder: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      nombre: '',
      categoria: '',
      descripcion: '',
      valoracionAutor: '',
      fecha: '',
      tiempo: ''
    });
    this.cliente = this.obtenerCliente();
    this.tipoDeSubasta = localStorage.getItem('tipoDeSubasta');
    this.obtenerCategorias();

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

  obtenerCategorias() {
    this.categoriaService.consultarCategorias().subscribe(categorias => {
      if(categorias){
        this.categorias = categorias;
      }
    })
  }

  obtenerMes(event: any){
    this.tipoDeSubasta = event.target.value;
  }

  guardarProducto(): void {
    const datepipe: DatePipe = new DatePipe('en-US')
    let nombre = this.loginForm.controls.nombre.value;
    let autor = this.cliente.nombre + ' ' + this.cliente.apellidos;
    let categoria = this.loginForm.controls.categoria.value;
    let descripcion = this.loginForm.controls.descripcion.value;
    let fecha = this.loginForm.controls.fecha.value;
    let tiempo = this.loginForm.controls.tiempo.value;
    let valoracionAutor = this.loginForm.controls.valoracionAutor.value;
    let formattedDate = datepipe.transform(fecha, 'dd/MM/YYYY');
    console.log(this.cliente.cedula);

    let producto: Producto = {
      nombre: nombre,
      autor: autor,
      categoria: categoria,
      foto: this.rutaFoto,
      archivo: this.rutaArchivo,
      tipoDeSubasta: this.tipoDeSubasta,
      fechaSubida: formattedDate,
      tiempo: tiempo,
      descripcion: descripcion,
      valoracionAutor: valoracionAutor,
      clienteResponsable: this.cliente.cedula
    }
    console.log(producto);

    this.productoService.guardarProducto(producto).subscribe((data) => {
      if (data) {
        Swal.fire('Excelente!', 'Producto creado con exito!', 'success');
        localStorage.removeItem('tipoDeSubasta')
        this.router.navigate(['Subastas']);
      }
    });
  }

  obtenerFoto(event: any) {
    this.foto = event.target.files[0];

    if (this.loginForm.controls.nombre.value != '') {
      const storage = getStorage();
      const imgRef = ref(
        storage,
        `Productos/${this.loginForm.controls.nombre.value}/Imagen/${this.loginForm.controls.nombre.value}`
      );
      const uploadTask = uploadBytesResumable(imgRef, this.foto);
      var url: string = '';

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('El porcentaje de subida es de ' + progress + '%');
          switch (snapshot.state) {
            case 'paused':
              // console.log('La carga se ha pausado');
              break;
            case 'running':
              // console.log('La carga esta activa');
              break;
          }
        },
        (error) => {
          Swal.fire('Error', 'No se pudo cargar la foto', 'error');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            this.rutaFoto = downloadURL;
          });
        }
      );
    } else {
      Swal.fire(
        'Error',
        'Debe colocarle un nombre al producto primero',
        'error'
      );
    }
  }

  obtenerArchivo(event: any) {
    this.archivo = event.target.files[0];
    this.rutaArchivo = this.archivo.name;
    const storage = getStorage();
    const imgRef = ref(
      storage,
      `Productos/${this.loginForm.controls.nombre.value}/Archivo/${this.archivo.name}`
    );
    const uploadTask = uploadBytesResumable(imgRef, this.foto);
    var url: string = '';

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // alert('El porcentaje de subida es de ' + progress + '%');
        switch (snapshot.state) {
          case 'paused':
            // console.log('La carga se ha pausado');
            break;
          case 'running':
            // console.log('La carga esta activa');
            break;
        }
      },
      (error) => {
        Swal.fire('Error', 'No se pudo cargar la foto', 'error');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          this.rutaArchivo = this.archivo.name;
          console.log(this.archivo.name);

        });
      }
    );
  }

  subirArchivo() {
    let resetData = new FormData();
    resetData.set('archivo', this.archivo);
  }

  anterior() {
    this.paso > 1 ? (this.paso -= 1) : (this.paso = 1);
  }

  siguiente() {
    this.paso < 3 ? (this.paso += 1) : (this.paso = 2);
  }
}
