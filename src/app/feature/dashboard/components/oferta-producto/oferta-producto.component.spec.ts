import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaProductoComponent } from './oferta-producto.component';

describe('OfertaProductoComponent', () => {
  let component: OfertaProductoComponent;
  let fixture: ComponentFixture<OfertaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
