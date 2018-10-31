import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modulos de PrimeNG
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {KeyFilterModule} from 'primeng/keyfilter';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';


// Servicios

import { AppRoutingModule } from './app-routing/app-routing.module';


import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { BarranavComponent } from './components/barranav/barranav.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { HomeGringaComponent } from './components/home-gringa/home-gringa.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    AddCustomerComponent,
    EmpleadosComponent,
    BarranavComponent,
    ProductosComponent,
    VentasComponent,
    ProveedoresComponent,
    HomeGringaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    KeyFilterModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
