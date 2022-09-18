import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMetodosComponent } from './modificar-metodos.component';

describe('ModificarMetodosComponent', () => {
  let component: ModificarMetodosComponent;
  let fixture: ComponentFixture<ModificarMetodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMetodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMetodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
