import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

// Opciones HttpHeaders
const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class VentasService {

  // URL para la api web (del backend)
  private ventasUrl = 'http://localhost:8080/api/ventas'

  constructor( private http: HttpClient) { }

   /**
   * Obtener todas los ventas.
   */
  getVentas (){
    return this.http.get<Venta[]>(this.ventasUrl).toPromise()
    .then(data => { return data; });
  }

  /**
   * Obtiene un producto por id
   * @param id
   */
  getVenta(id: number): Observable<Venta> {
    const url = `${this.ventasUrl}/${id}`;
    return this.http.get<Venta>(url);
  }

  addVenta (venta: Venta) {
    return this.http.post<Venta>(this.ventasUrl, venta, httpOptions).toPromise()
    .then(data => { return data; });
  }

  deleteVenta (venta: Venta | number){
    const id = typeof venta === 'number' ? venta : venta.id;
    const url = `${this.ventasUrl}/${id}`;

    return this.http.delete<Venta>(url, httpOptions).toPromise()
    .then(data => { return data; });;
  }

  updateVenta (venta: Venta) {
    return this.http.put(this.ventasUrl, venta, httpOptions).toPromise()
    .then(data => { return data; });;
  }




}
