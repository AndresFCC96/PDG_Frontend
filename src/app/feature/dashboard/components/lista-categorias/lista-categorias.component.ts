import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Categoria } from '../../shared/model/categoria';
import { CategoriaService } from '../../shared/service/categoria.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  categorias: Categoria[];
  sizeCategorias: number;
  page = 1;
  pageSize = 4;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaService.consultarCategorias().subscribe(categorias => {
      if(categorias){
        this.categorias = categorias;
        this.sizeCategorias = this.categorias.length;
      }
    })

    if(this.sizeCategorias === undefined){
      this.sizeCategorias = 0;
    }
  }

  async cambiarNombreCategoria(categoria: Categoria) {
    const { value: nombreCategoria } = await Swal.fire({
      title: 'Modificar nombre',
      input: 'text',
      inputLabel: 'Ingresa el nombre de la categoria',
      inputValue: categoria.nombre,
      showCancelButton: true,
      inputValidator: (nombreCategoria) => {
        if (!nombreCategoria) {
          return 'Por favor escribe el nombre de la categoria!';
        }
      }
    })

    if (nombreCategoria) {
      categoria.nombre = nombreCategoria;
      console.log(categoria);
      this.categoriaService.modificarCategoria(categoria).subscribe(categoriaModificada => { if(categoriaModificada){Swal.fire('Felicidades', 'El nombre de la categoria se ha modificado con exito', 'success'), this.obtenerCategorias()} })
    }
  }

  eliminarCategoria(categoria: Categoria) {
    categoria.estado = 'I';
    this.categoriaService.modificarCategoria(categoria).subscribe(data => {if(data){Swal.fire('Felicidades', 'La categoria se ha inactivado con exito', 'success'), this.obtenerCategorias()}})
  }

}
