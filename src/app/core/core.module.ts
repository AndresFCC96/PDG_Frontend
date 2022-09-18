import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';
import { FooterComponent } from './components/footer/footer.component';
import { FooterSubastasComponent } from './components/footer-subastas/footer-subastas.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarSubastasComponent } from './components/navbar-subastas/navbar-subastas.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';



@NgModule({
  declarations: [ComingsoonComponent,
    FooterComponent, FooterSubastasComponent, HeaderComponent,
    NavbarComponent, NavbarSubastasComponent, SpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],exports: [
    ComingsoonComponent, FooterComponent, FooterSubastasComponent, HeaderComponent,
    NavbarComponent, NavbarSubastasComponent, SpinnerComponent
  ], providers: [ SpinnerService ]
})
export class CoreModule { }
