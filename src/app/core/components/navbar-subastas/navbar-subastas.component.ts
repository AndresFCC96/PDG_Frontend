import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-subastas',
  templateUrl: './navbar-subastas.component.html',
  styleUrls: ['./navbar-subastas.component.css']
})
export class NavbarSubastasComponent implements OnInit {

  loggeado: boolean;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('persona')){
      this.loggeado = true;
    }
  }

  cerrarSesion(){
    localStorage.clear();
    window.location.reload();
  }
}
