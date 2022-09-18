import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { SubastasComponent } from './components/subastas/subastas.component';

const routes: Routes = [
  {path:"", component: SubastasComponent},
  {path:"addProduct", component: CrearProductoComponent},
  {path:"listProduct", component: ListaProductosComponent},
  {path:"productDetail/:nombre", component: ProductoDetalleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
