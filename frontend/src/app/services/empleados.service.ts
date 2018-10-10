import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

// Opciones HttpHeaders
const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {

  // URL para la api web (del backend)
  private empleadosUrl = 'http://localhost:8080/api/empleados'

  constructor( private http: HttpClient) { }

   /**
   * Obtener todos los clientes.
   */
  getEmpleados (){
    return this.http.get<Empleado[]>(this.empleadosUrl).toPromise()
    .then(data => { return data; });
  }

  /**
   * Obtiene un empleado por id
   * @param id
   */
  getEmpleado(id: number): Observable<Empleado> {
    const url = `${this.empleadosUrl}/${id}`;
    return this.http.get<Empleado>(url);
  }

  addEmpleado (empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.empleadosUrl, empleado, httpOptions);
  }

  deleteEmpleado (empleado: Empleado | number): Observable<Empleado> {
    const id = typeof empleado === 'number' ? empleado : empleado.id;
    const url = `${this.empleadosUrl}/${id}`;

    return this.http.delete<Empleado>(url, httpOptions);
  }

  updateEmpleado (empleado: Empleado): Observable<any> {
    return this.http.put(this.empleadosUrl, empleado, httpOptions);
  }




}