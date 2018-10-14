import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

// Opciones HttpHeaders
const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  // URL para la api web (del backend)
  private productosUrl = 'http://localhost:8080/api/productos'

  constructor( private http: HttpClient) { }

   /**
   * Obtener todos los productos.
   */
  getProductos (){
    return this.http.get<Producto[]>(this.productosUrl).toPromise()
    .then(data => { return data; });
  }

  /**
   * Obtiene un producto por id
   * @param id
   */
  getProducto(id: number): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  addProducto (producto: Producto) {
    return this.http.post<Producto>(this.productosUrl, producto, httpOptions).toPromise()
    .then(data => { return data; });
  }

  deleteProducto (producto: Producto | number){
    const id = typeof producto === 'number' ? producto : producto.idProducto;
    const url = `${this.productosUrl}/${id}`;

    return this.http.delete<Producto>(url, httpOptions).toPromise()
    .then(data => { return data; });;
  }

  updateProducto (producto: Producto) {
    return this.http.put(this.productosUrl, producto, httpOptions).toPromise()
    .then(data => { return data; });;
  }




}
