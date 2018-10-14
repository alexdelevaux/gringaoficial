import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Venta } from '../../models/venta';
import { MessageService } from "primeng/components/common/messageservice";
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {


  ventas: Venta[];

  venta: Venta = {
    id: null,
    idEmpleado: null,
    total: null,
    createdAt: null,
    updatedAt: null,
    observaciones: ""
  }


  ventaElegida: Venta;

  nuevaVenta: boolean;

  ventaSeleccionado: Venta;

  displayDialog: boolean;

  constructor( private ventasService: VentasService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.ventasService.getVentas().then(ventas => this.ventas = ventas);
  }

  abrirDialogo() {
    this.nuevaVenta = true;
    this.displayDialog = true;
  }

  borrar(venta: Venta) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar este venta?',
      header: '¡ATENCION!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No'
      ,
      accept: () => {
        this.messageService.add({
            severity: "error",
            summary: "¡Venta borrada!",
            life: 3000,
            detail: `Se ha borrado a ${ venta.id }`,
            key: "borraVenta" // CLAVE
          });

          this.ventasService.deleteVenta(venta.id);
          this.ventasService.getVentas().then(ventas => this.ventas = ventas);
      }
  });

  }

  actualizar(venta: Venta) {
    this.venta = venta;
    this.nuevaVenta = false;
    this.displayDialog = true;

  }

  save() {
    console.log(this.venta);


    if (this.nuevaVenta) {
      this.ventasService.addVenta(this.venta);  // Aqui se guarda en la DB
      this.messageService.add({
        severity: "info",
        summary: "¡Nueva venta creada!",
        life: 3000,
        detail: `Venta: ${ this.venta.id }`,
        key: "nuevaVenta" // CLAVE
    });
    }
    else {
      this.ventasService.updateVenta(this.venta);
      this.messageService.add({
        severity: "success",
        summary: "Venta actualizada!",
        life: 3000,
        detail: `Se actualizó la venta ${ this.venta.id}`,
        key: "cambioVenta" // CLAVE
    });
    }


    // Aqui se dispara el Toast

  this.displayDialog = false;
   let ventas = [...this.ventas];
        if (this.nuevaVenta)
            ventas.push(this.venta);
        else
            ventas[this.ventas.indexOf(this.ventaSeleccionado)] = this.venta;

        this.ventas = ventas;
        this.venta = null


  }
}
