import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/app/core/core.module';
import { ForoComponent } from './components/foro/foro.component';
import { SubastasComponent } from './components/subastas/subastas.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoService } from './shared/service/producto.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FirebaseUploadsService } from 'src/app/core/services/firebase-uploads.service';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ForoComponent,
    SubastasComponent,
    ListaProductosComponent,
    CrearProductoComponent,
    ProductoDetalleComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    CoreModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DashboardModule,
    MatChipsModule,
    MatSelectModule
  ], exports: [
    SubastasComponent
  ], providers: [ ProductoService, FirebaseUploadsService ]
})
export class ProductosModule { }
