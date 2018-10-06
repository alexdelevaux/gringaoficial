import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

// Opciones HttpHeaders para todos. Solo asigno que es tipo JSON
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private customersUrl = 'http://localhost:8080/api/customers';  // URL para la api web (del backend)

  constructor( private http: HttpClient ) { }

  /**
   * Obtener todos los clientes.
   */
  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
  }
  /* Otra opcion
    getHeroes( ) {
      return this.http.get( this.heroesURL ).pipe(map ( res => res.json()));
    }
  */

  /**
   * Obtiene un cliente por id
   * @param id
   */
  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url);
  }
  /*Otra opción
    getHeroe( key$: string) {
    let url = `${this.heroeURL}/${ key$ }.json`;
    return this.http.get( url ).pipe(map ( res => res.json()));
  }

  */

  addCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, httpOptions);
  }

  deleteCustomer (customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions);
  }

  updateCustomer (customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }
}
