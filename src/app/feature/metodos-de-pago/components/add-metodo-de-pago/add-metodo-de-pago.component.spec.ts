import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMetodoDePagoComponent } from './add-metodo-de-pago.component';

describe('AddMetodoDePagoComponent', () => {
  let component: AddMetodoDePagoComponent;
  let fixture: ComponentFixture<AddMetodoDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMetodoDePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMetodoDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
