import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEmpleadoComponent } from './nuevo-empleado.component';

describe('NuevoEmpleadoComponent', () => {
  let component: NuevoEmpleadoComponent;
  let fixture: ComponentFixture<NuevoEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
