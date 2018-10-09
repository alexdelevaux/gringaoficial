import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpleadoComponent } from './detalle-empleado.component';

describe('DetalleEmpleadoComponent', () => {
  let component: DetalleEmpleadoComponent;
  let fixture: ComponentFixture<DetalleEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
