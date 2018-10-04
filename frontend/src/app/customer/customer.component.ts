import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent  implements OnInit {

  customers: Customer[];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
     this.getCustomers();
  }

  getCustomers() {
    return this.customerService.getCustomers()
               .subscribe(
                 customers => {
                  console.log(customers);
                  this.customers = customers
                 }
                );
 }
}
