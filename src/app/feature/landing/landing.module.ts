import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosModule } from '../productos/productos.module';
import { LoginModule } from '../login/login.module';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarrouselComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LoginModule,
    ProductosModule,
    CoreModule,
    FormsModule
  ],
  exports: [
    ProductosComponent,
    CarrouselComponent
  ]
})
export class LandingModule { }
