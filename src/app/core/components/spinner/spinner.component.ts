import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="page-overlay-wrapper" *ngIf="showSpinner | async" >
    <div class="bee-spinner"></div>
  </div> `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {

  showSpinner = this.spinnerService.spinner$;
  vi!:boolean

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.spinner$.subscribe(
      bol=>{this.vi=bol;console.log('spinner:',this.vi)}
    )
  }

}
