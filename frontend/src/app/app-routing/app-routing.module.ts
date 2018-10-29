import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGringaComponent } from '../components/home-gringa/home-gringa.component';
import { CustomerComponent } from '../customer/customer.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { EmpleadosComponent } from '../components/empleados/empleados.component';
import { ProductosComponent } from '../components/productos/productos.component';
import { VentasComponent } from '../components/ventas/ventas.component';

const routes: Routes = [
  {
    path: 'empleados', component: EmpleadosComponent
  },
  {
    path: 'productos', component: ProductosComponent
  },
  {
    path: 'ventas', component: VentasComponent
  },
  {
    path: 'home', component: HomeGringaComponent
  },
   /* {
     path: 'customers',
     component: CustomerComponent
   },
   {
     path: 'customer/add',
     component: AddCustomerComponent
   },
   {
     path: 'customers/:id',
     component: CustomerDetailsComponent
   }, */
   {
     path: '',
     redirectTo: 'home',
     pathMatch: 'full'
   },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
