import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggeado: boolean;

  constructor(private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('persona')){
      this.loggeado = true;
    }
  }

  cerrarSesion(){
    localStorage.clear();
    this.route.navigate(['']);
    // window.location.reload();
  }

}
