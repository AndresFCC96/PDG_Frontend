import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSubastaComponent } from './tipo-subasta.component';

describe('TipoSubastaComponent', () => {
  let component: TipoSubastaComponent;
  let fixture: ComponentFixture<TipoSubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoSubastaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
