import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetodosDePagoRoutingModule } from './metodos-de-pago-routing.module';
import { MetodoDePagoService } from './shared/service/metodo-de-pago.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScriptService } from './shared/service/script.service';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MetodosDePagoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule
  ],
  providers: [ MetodoDePagoService, ScriptService ]
})
export class MetodosDePagoModule { }
