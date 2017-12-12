import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEstacionamientoComponent } from './buscar-estacionamiento.component';

describe('BuscarEstacionamientoComponent', () => {
  let component: BuscarEstacionamientoComponent;
  let fixture: ComponentFixture<BuscarEstacionamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarEstacionamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarEstacionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
