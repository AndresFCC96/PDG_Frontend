import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSubastasComponent } from './navbar-subastas.component';

describe('NavbarSubastasComponent', () => {
  let component: NavbarSubastasComponent;
  let fixture: ComponentFixture<NavbarSubastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSubastasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSubastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
