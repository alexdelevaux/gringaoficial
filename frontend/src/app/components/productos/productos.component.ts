import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { MessageService } from "primeng/components/common/messageservice";
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  productos: Producto[];

  producto: Producto = {
    id: null,
    producto: "",
    estado: "",
    precioVenta: null,
    observaciones: "",
    createdAt: null,
    updatedAt: null
  }


  productoElegido: Producto;

  nuevoProducto: boolean;

  productoSeleccionado: Producto;

  displayDialog: boolean;

  constructor( private productosService: ProductosService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.productosService.getProductos().then(productos => this.productos = productos);
  }

  abrirDialogo() {
    this.nuevoProducto = true;
    this.displayDialog = true;
  }

  borrar(producto: Producto) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar este producto?',
      header: '¡ATENCION!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No'
      ,
      accept: () => {
        this.messageService.add({
            severity: "error",
            summary: "¡Producto borrado!",
            life: 3000,
            detail: `Se ha borrado a ${ producto.producto }`,
            key: "cambioProducto" // CLAVE
          });

          this.productosService.deleteProducto(producto.id);
          this.productosService.getProductos().then(productos => this.productos = productos);
      }
  });

  }

  actualizar(producto: Producto) {
    this.producto = producto;
    this.nuevoProducto = false;
    this.displayDialog = true;

  }

  save() {
    console.log(this.producto);


    if (this.nuevoProducto) {
      this.productosService.addProducto(this.producto);  // Aqui se guarda en la DB
      this.messageService.add({
        severity: "info",
        summary: "¡Nuevo producto creado!",
        life: 3000,
        detail: `Producto: ${ this.producto.producto }`,
        key: "nuevoProducto" // CLAVE
    });
    }
    else {
      this.productosService.updateProducto(this.producto);
      this.messageService.add({
        severity: "success",
        summary: "¡Producto actualizado!",
        life: 3000,
        detail: `Se actualizó el producto ${ this.producto.producto}`,
        key: "cambioProducto" // CLAVE
    });
    }


    // Aqui se dispara el Toast

  this.displayDialog = false;
   let productos = [...this.productos];
        if (this.nuevoProducto)
            productos.push(this.producto);
        else
            productos[this.productos.indexOf(this.productoSeleccionado)] = this.producto;

        this.productos = productos;
        this.producto = null


  }
}
