import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/feature/dashboard/shared/model/cliente';
import { MetodoDePago } from 'src/app/feature/metodos-de-pago/shared/model/MetodoDePago';
import Swal from 'sweetalert2';
import { MetodoDePagoService } from '../../shared/service/metodo-de-pago.service';
import { ScriptService } from '../../shared/service/script.service';

@Component({
  selector: 'app-add-metodo-de-pago',
  templateUrl: './add-metodo-de-pago.component.html',
  styleUrls: ['./add-metodo-de-pago.component.css'],
})
export class AddMetodoDePagoComponent implements OnInit {

  metodoDePagoForm: FormGroup;
  cliente: Cliente;
  loggeado = false;

  mes: number;
  year: number;

  constructor(
    private builder: FormBuilder,
    private metodoDePagoService: MetodoDePagoService,
    private router: Router,
    private scriptService: ScriptService
  ) {}

  ngOnInit(): void {
    this.metodoDePagoForm = this.builder.group({
      id_cliente: '',
      numero_tarjeta: '',
      nombre_tarjeta: '',
      mes: '',
      year: '',
      ccv: '',
    });
    this.cliente = this.obtenerCliente();
    this.cargaJSTarjeta();

  }

  obtenerCliente(): Cliente {
    let data: string;
    let cliente: Cliente;
    data = localStorage.getItem('persona');
    if (data) {
      cliente = JSON.parse(data);
      this.loggeado = true;
    }
    return cliente;
  }

  guardarMetodoDePago(): void {
    let id_clienteM = this.cliente.cedula;
    let numero_tarjetaM = this.metodoDePagoForm.controls.numero_tarjeta.value;
    let nombre = this.metodoDePagoForm.controls.nombre_tarjeta.value;
    let mesM = this.metodoDePagoForm.controls.mes.value;
    let yearM = this.metodoDePagoForm.controls.year.value;
    let ccvM = this.metodoDePagoForm.controls.ccv.value;
    let metodoDePago: MetodoDePago = {
      idCliente: id_clienteM,
      numeroTarjeta: numero_tarjetaM,
      nombre: nombre,
      mes: mesM,
      year: yearM,
      ccv: ccvM,
    };
    console.log(metodoDePago);
    console.log(metodoDePago.ccv);

    this.metodoDePagoService
      .guardarMetodoDePago(metodoDePago)
      .subscribe((data) => {
        if (data) {
          Swal.fire(
            'Excelente!',
            'Metodo de pago creado con exito!',
            'success'
          );
          this.router.navigate(['/metodosList']);
        }
      });
  }

  cargaJSTarjeta() {
    this.scriptService.loadScript({id: 'my-script', url : 'assets/js/add-metodo-de-pago.js'})
    .then(data => {
        console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  obtenerMes(event: any){
    this.metodoDePagoForm.controls.mes.setValue(event.target.value);
  }

  obtenerYear(event: any){
    this.metodoDePagoForm.controls.year.setValue(event.target.value);
  }

  imprimirMes(){
    console.log(this.metodoDePagoForm.controls.numero_tarjeta.value);
    console.log(this.metodoDePagoForm.controls.nombre_tarjeta.value);
    console.log(this.metodoDePagoForm.controls.mes.value);
    console.log(this.metodoDePagoForm.controls.year.value);
    console.log(this.metodoDePagoForm.controls.ccv.value);

  }
}
