import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMetodoDePagoComponent } from '../metodos-de-pago/components/add-metodo-de-pago/add-metodo-de-pago.component';
import { ListaMetodosComponent } from '../metodos-de-pago/components/lista-metodos/lista-metodos.component';
import { CrearDireccionComponent } from './components/crear-direccion/crear-direccion.component';
import { ListaDireccionesComponent } from './components/lista-direcciones/lista-direcciones.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { NubeComponent } from './components/nube/nube.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  {path: "userProfile", component: PerfilUsuarioComponent},
  {path: "editUserInfo", component: ModificarUsuarioComponent},
  {path: "direccionesList", component: ListaDireccionesComponent},
  {path: "addDireccion", component: CrearDireccionComponent},
  {path: "cloud", component: NubeComponent},
  {path: "paymentDetails", component: AddMetodoDePagoComponent},
  {path: "metodosList", component: ListaMetodosComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
