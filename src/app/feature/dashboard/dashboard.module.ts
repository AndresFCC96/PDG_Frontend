import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { AddMetodoDePagoComponent } from '../metodos-de-pago/components/add-metodo-de-pago/add-metodo-de-pago.component';
import { ListaMetodosComponent } from '../metodos-de-pago/components/lista-metodos/lista-metodos.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MetodosDePagoComponent } from './components/metodos-de-pago/metodos-de-pago.component';
import { ModificarMetodosComponent } from './components/modificar-metodos/modificar-metodos.component';
import { CoreModule } from 'src/app/core/core.module';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { ListaDireccionesComponent } from './components/lista-direcciones/lista-direcciones.component';
import { CrearDireccionComponent } from './components/crear-direccion/crear-direccion.component';
import { NubeComponent } from './components/nube/nube.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { FirebaseUploadsService } from 'src/app/core/services/firebase-uploads.service';
import { MetodoDePagoService } from '../metodos-de-pago/shared/service/metodo-de-pago.service';
import { ScriptService } from '../metodos-de-pago/shared/service/script.service';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';


@NgModule({
  declarations: [
    PerfilUsuarioComponent,
    ModificarUsuarioComponent,
    MetodosDePagoComponent,
    AddMetodoDePagoComponent,
    ListaDireccionesComponent,
    CrearDireccionComponent,
    NubeComponent,
    ListaMetodosComponent,
    ModificarMetodosComponent,
    DashboardComponent,
    ListaUsuariosComponent,
    CrearCategoriaComponent,
    ListaCategoriasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
    CoreModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [
    PerfilUsuarioComponent, DashboardComponent
  ], providers: [ SpinnerService, FirebaseUploadsService, MetodoDePagoService, ScriptService ]
})
export class DashboardModule { }
