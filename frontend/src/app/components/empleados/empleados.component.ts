import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleado';
import { MessageService } from "primeng/components/common/messageservice";


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  providers: [MessageService],
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {


  empleados: Empleado[];

  empleado: Empleado = {
    id: null,
    nombre: "",
    apellido: "",
    usuario: "",
    contrasena: "",
    rol: "",
    estado: "",
    observaciones: ""
  }

  nuevoEmpleado: boolean;

  empleadoSeleccionado: Empleado;

  displayDialog: boolean;

  constructor( private empleadosService: EmpleadosService, private messageService: MessageService) { }

  ngOnInit() {
    this.empleadosService.getEmpleados().then(empleados => this.empleados = empleados);
  }

  abrirDialogo() {
    this.nuevoEmpleado = true;
    this.displayDialog = true;
  }

  save() {
    console.log(this.empleado);

    // Aqui se guarda en la DB
    this.empleadosService.addEmpleado(this.empleado);

    // Aqui se dispara el Toast
    this.messageService.add({
      severity: "info",
      summary: "¡Nuevo empleado creado!",
      life: 3000,
      detail: `Nombre: ${ this.empleado.nombre} ${this.empleado.apellido}`,
      key: "nuevoEmpleado" // CLAVE
  });
  this.displayDialog = false;
   let empleados = [...this.empleados];
        if (this.nuevoEmpleado)
            empleados.push(this.empleado);
        else
            empleados[this.empleados.indexOf(this.empleadoSeleccionado)] = this.empleado;

        this.empleados = empleados;
        this.empleado = {
          id: null,
    nombre: "",
    apellido: "",
    usuario: "",
    contrasena: "",
    rol: "",
    estado: "",
    observaciones: ""
        };


  }
}
