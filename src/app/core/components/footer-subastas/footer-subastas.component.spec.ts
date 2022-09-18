import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSubastasComponent } from './footer-subastas.component';

describe('FooterSubastasComponent', () => {
  let component: FooterSubastasComponent;
  let fixture: ComponentFixture<FooterSubastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSubastasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSubastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
