import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posicionX: number;
  posicionY: number;
  rutaActual: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.posicionRutas();
  }

  posicionRutas(){
    this.rutaActual = this.router.url;
    if(this.rutaActual == '/Dashboard/userProfile'){
      this.posicionX = 90;
      this.posicionY = 20;
    }

    if(this.rutaActual == '/Dashboard/editUserInfo'){
      this.posicionX = 90;
      this.posicionY = 20;
    }

    if(this.rutaActual == '/addProduct'){
      this.posicionX = 90;
      this.posicionY = 20;
    }

    if(this.rutaActual == '/Dashboard/addDireccion'){
      this.posicionX = 90;
      this.posicionY = 20;
    }

    if(this.rutaActual == '/Dashboard/direccionesList'){
      this.posicionX = 80;
      this.posicionY = 10;
    }

    if(this.rutaActual == '/listProduct'){
      this.posicionX = 80;
      this.posicionY = 20;
    }

    if(this.rutaActual == '/Dashboard/paymentDetails'){
      this.posicionX = 90;
      this.posicionY = 20;
    }

    if(this.rutaActual == '/Dashboard/metodosList'){
      this.posicionX = 80;
      this.posicionY = 20;
    }


  }

}
