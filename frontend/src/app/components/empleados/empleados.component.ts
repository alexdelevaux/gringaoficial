import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleado';
import { MessageService } from 'primeng/components/common/messageservice';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  nuevoID: number;

  nombreTEST = 'TESTING';

  empleado: Empleado = {
    idEmpleado: this.nuevoID,
    nombre: this.nombreTEST,
    apellido: '',
    usuario: '',
    contrasena: '',
    rol: '',
    estado: '',
    observaciones: ''
  };

  yearFilter: number;

  yearTimeout: any;

  blockSpace: RegExp = /[^\s]/;

  cols: any[];

  roles: any[];

  rolesFiltros: any[];

  estados: any[];

  estadosFiltros: any[];

  empleadoElegido: Empleado;

  nuevoEmpleado: boolean;

  empleadoSeleccionado: Empleado;

  displayDialog: boolean;

  empleados: Empleado[];

  ids: number[] = [];

  obtenerIDS() {
    for (let index = 0; index < this.empleados.length; index++) {
      const element = this.empleados[index].idEmpleado;
      this.ids.push(element);
    }
    console.log(this.ids);
  }



  constructor( private empleadosService: EmpleadosService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.empleadosService.getEmpleados().then(empleados => {
      this.empleados = empleados;
      console.log('Valor de this.empleados: ', this.empleados);
      for (let i = 0; i < this.empleados.length; i++) {
        const id = this.empleados[i].idEmpleado;
        this.ids.push(id);
      }
      console.log('IDS: ', this.ids);
      this.nuevoID = Math.max(...this.ids);
      console.log(this.nuevoID);
      this.nuevoID += 1;
      console.log('Nuevo ID', this.nuevoID);

      this.empleado = {
        idEmpleado: this.nuevoID,
        nombre: '',
        apellido: '',
        usuario: '',
        contrasena: '',
        rol: '',
        estado: '',
        observaciones: ''
      };

    } );
    // console.log(this.obtenerIDS());


    this.cols = [
      { field: 'idEmpleado', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'usuario', header: 'Usuario' },
      { field: 'rol', header: 'Rol' },
      { field: 'estado', header: 'Estado' },
      { field: 'observaciones', header: 'Observaciones' },
      { field: 'opciones', header: 'Opciones' }
    ];

    this.roles = [
      { label: 'Vendedor', value: 'v' },
      { label: 'Admin', value: 'a' },
    ];

    this.rolesFiltros = [
      { label: 'Todos', value: null},
      { label: 'Admin', value: 'a' },
      { label: 'Vendedor', value: 'v' },
    ];

    this.estados = [
      { label: 'Activo', value: 'a' },
      { label: 'Inactivo', value: 'i' },
    ];

    this.estadosFiltros = [
      {label: 'Todos', value: null},
      { label: 'Activo', value: 'a' },
      { label: 'Inactivo', value: 'i' },
    ];


  } // Fin del ngOnInit()

  abrirDialogo() {
    this.nuevoEmpleado = true;
    this.displayDialog = true;
    console.log('))))))))))))))NUEVOID((((((((((((((((', this.nuevoID);
  }

  /**
   * borrar
   * @param empleado
   * Recibe un empleado como parámetro, pide confirmación mediante un diálogo
   * Si acepto, ejecuta el método deleteEmpleados().
   * TODO: Una vez que el empleado se borra, deberia borrarse de la tabla. Esto actualmente no ocurre
   * TODO: Se debería poder pasar el id también. Hacer esto a futuro.
   */
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
            severity: 'error',
            summary: '¡Empleado/a borrado/a!',
            life: 3000,
            detail: `Se ha borrado a ${ empleado.nombre} ${empleado.apellido}`,
            key: 'cambioEmpleado' // CLAVE
          });

          this.empleadosService.deleteEmpleado(empleado.idEmpleado);
          this.empleadosService.getEmpleados().then(empleados => this.empleados = empleados);
      }
  });

  }

  actualizar(empleado: Empleado) {
    this.empleado = empleado;
    this.nuevoEmpleado = false;
    this.displayDialog = true;
  }

  onYearChange(event, dt) {
    if (this.yearTimeout) {
        clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
        dt.filter(event.value, 'year', 'gt');
    }, 250);
}

  /**
   * Guarda un empleado en la base de datos.
   * * Controla si es un empleado nuevo o no, mediante la variable nuevoEmpelado
   * * En caso de serlo, hace un addEmpleado, y sino, un updateEmpleado
   */
  save() {
    console.log(this.empleado);
    if (this.nuevoEmpleado) {
      this.empleadosService.addEmpleado(this.empleado);  // Aqui se guarda en la DB
      this.messageService.add({ // Valores del toast
        severity: 'info',
        summary: '¡Nuevo empleado creado!',
        life: 3000,
        detail: `Nombre: ${ this.empleado.nombre} ${this.empleado.apellido}`,
        key: 'nuevoEmpleado' // CLAVE
    });
    } else {
      this.empleadosService.updateEmpleado(this.empleado); // Aqui se guarda en la DB
      this.messageService.add({ // Valores del toast
        severity: 'success',
        summary: '¡Empleado actualizado!',
        life: 3000,
        detail: `Se actualizó el/la empleado/a ${ this.empleado.nombre} ${this.empleado.apellido}`,
        key: 'cambioEmpleado' // CLAVE
    });
    }


    // Aqui se dispara el Toast

  this.displayDialog = false;
   let empleados = [...this.empleados];
        if (this.nuevoEmpleado) {
          empleados.push(this.empleado);
        } else {
          empleados[this.empleados.indexOf(this.empleadoSeleccionado)] = this.empleado;
        }

        this.empleados = empleados;
        this.empleado = {
          idEmpleado: this.nuevoID,
          nombre: '',
          apellido: '',
          usuario: '',
          contrasena: '',
          rol: '',
          estado: '',
          observaciones: ''
        };


  }
}
