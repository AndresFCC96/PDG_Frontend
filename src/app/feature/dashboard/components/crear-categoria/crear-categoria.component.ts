import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Categoria } from '../../shared/model/categoria';
import { CategoriaService } from '../../shared/service/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  categoriaForm: FormGroup;

  constructor(private builder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoriaForm = this.builder.group({
      categoria: '',
    });
  }

  crearCategoria(){
    let nombreCategoria = this.categoriaForm.controls.categoria.value;
    let categoriaACrear: Categoria = {
      nombre: nombreCategoria,
      estado: 'A'
    };
    this.categoriaService.crearCategoria(categoriaACrear).subscribe(
      cate => {
        if(cate){
          Swal.fire(
            'Felicidades',
            'Categoria ' + categoriaACrear.nombre + ' creada con exito!',
            'success'
          );
          this.router.navigate(['/listaCategoria']);
        }
      }
    )
  }

}
