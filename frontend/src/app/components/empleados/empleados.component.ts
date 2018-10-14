import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleado';
import { MessageService } from "primeng/components/common/messageservice";
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  providers: [MessageService, ConfirmationService],
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


  empleadoElegido: Empleado;

  nuevoEmpleado: boolean;

  empleadoSeleccionado: Empleado;

  displayDialog: boolean;

  constructor( private empleadosService: EmpleadosService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.empleadosService.getEmpleados().then(empleados => this.empleados = empleados);
  }

  abrirDialogo() {
    this.nuevoEmpleado = true;
    this.displayDialog = true;
  }

  borrar(empleado: Empleado) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar este empleado?',
      header: '¡ATENCION!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No'
      ,
      accept: () => {
        this.messageService.add({
            severity: "error",
            summary: "¡Empleado/a borrado/a!",
            life: 3000,
            detail: `Se ha borrado a ${ empleado.nombre} ${empleado.apellido}`,
            key: "cambioEmpleado" // CLAVE
          });

          this.empleadosService.deleteEmpleado(empleado.id);
          this.empleadosService.getEmpleados().then(empleados => this.empleados = empleados);
      }
  });

  }

  actualizar(empleado: Empleado) {
    this.empleado = empleado;
    this.nuevoEmpleado = false;
    this.displayDialog = true;

  }

  save() {
    console.log(this.empleado);


    if (this.nuevoEmpleado) {
      this.empleadosService.addEmpleado(this.empleado);  // Aqui se guarda en la DB
      this.messageService.add({
        severity: "info",
        summary: "¡Nuevo empleado creado!",
        life: 3000,
        detail: `Nombre: ${ this.empleado.nombre} ${this.empleado.apellido}`,
        key: "nuevoEmpleado" // CLAVE
    });
    }
    else {
      this.empleadosService.updateEmpleado(this.empleado);
      this.messageService.add({
        severity: "success",
        summary: "¡Empleado actualizado!",
        life: 3000,
        detail: `Se actualizó el/la empleado/a ${ this.empleado.nombre} ${this.empleado.apellido}`,
        key: "cambioEmpleado" // CLAVE
    });
    }


    // Aqui se dispara el Toast

  this.displayDialog = false;
   let empleados = [...this.empleados];
        if (this.nuevoEmpleado)
            empleados.push(this.empleado);
        else
            empleados[this.empleados.indexOf(this.empleadoSeleccionado)] = this.empleado;

        this.empleados = empleados;
        this.empleado = null


  }
}
