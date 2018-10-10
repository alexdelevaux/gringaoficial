import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[];

  constructor( private empleadosService: EmpleadosService) { }

  ngOnInit() {
    this.empleadosService.getEmpleados().then(empleados => this.empleados = empleados);
  }

}
