import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
