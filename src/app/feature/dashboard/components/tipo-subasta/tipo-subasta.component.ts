import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-subasta',
  templateUrl: './tipo-subasta.component.html',
  styleUrls: ['./tipo-subasta.component.css']
})
export class TipoSubastaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  definirTipoDeSubasta(opcion:number){
    localStorage.removeItem('tipoDeSubasta');
    opcion === 1
    ? localStorage.setItem('tipoDeSubasta', 'S')
    : localStorage.setItem('tipoDeSubasta', 'B');
  }

}
