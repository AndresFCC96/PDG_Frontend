import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMetodoDePagoComponent } from '../metodos-de-pago/components/add-metodo-de-pago/add-metodo-de-pago.component';
import { ListaMetodosComponent } from '../metodos-de-pago/components/lista-metodos/lista-metodos.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { CrearDireccionComponent } from './components/crear-direccion/crear-direccion.component';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';
import { ListaDireccionesComponent } from './components/lista-direcciones/lista-direcciones.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { NubeComponent } from './components/nube/nube.component';
import { OfertaProductoComponent } from './components/oferta-producto/oferta-producto.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { TipoSubastaComponent } from './components/tipo-subasta/tipo-subasta.component';

const routes: Routes = [
  {path: "userProfile", component: PerfilUsuarioComponent},
  {path: "editUserInfo", component: ModificarUsuarioComponent},
  {path: "direccionesList", component: ListaDireccionesComponent},
  {path: "addDireccion", component: CrearDireccionComponent},
  {path: "cloud", component: NubeComponent},
  {path: "paymentDetails", component: AddMetodoDePagoComponent},
  {path: "metodosList", component: ListaMetodosComponent},
  {path: "usuarioList", component: ListaUsuariosComponent},
  {path: "addCategoria", component: CrearCategoriaComponent},
  {path: "listaCategoria", component: ListaCategoriasComponent},
  {path: "tipoSubasta", component: TipoSubastaComponent},
  {path: "ofertaProductos/:producto", component: OfertaProductoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
