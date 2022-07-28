import { Injectable } from '@angular/core';
import { login } from '../../models/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/models/response.interface';
import { ListaClientesI } from '../../models/listadoclientes.interface';
import { ClienteI } from '../../models/cliente.interface';
import { DomicilioI } from '../../models/domicilio.interface'
import { DocumentosI } from '../../models/documentos.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // Creando variable de nuestra url de la api
  urlApi: string = "http://localhost:9000/api/";

  // Inyectando libreria httpClient en nuestro constructor
  constructor(private httpClient: HttpClient) { }

  // Funcion para ingresar a la app
  ingresarByUsuario(form: login): Observable<ResponseI> {
    let dir = this.urlApi + 'login';
    console.log(form)
    return this.httpClient.post<ResponseI>(dir, form);
  }

  // Metodo para registrar un cliente 
  registrarCliente(form: ClienteI): Observable<Object> {
    let dir = this.urlApi + 'registrarCliente';

    return this.httpClient.post<Object>(dir, form);
  }

  // Metodo para registrar domicilios de un cliente
  registrarDomicilio(form: DomicilioI): Observable<Object> {
    let dir = this.urlApi + 'registrarDomicilio';

    return this.httpClient.post<Object>(dir, form);
  }

  // Metodo para registrar domicilios de un cliente
  registrarDocumento(form: DocumentosI): Observable<Object> {
    let dir = this.urlApi + 'registrarDocumento';

    return this.httpClient.post<Object>(dir, form);
  }


  // Metodo para obtener todos los clientes
  obtenerClientes(): Observable<ListaClientesI[]> {
    let dir = this.urlApi + 'listadoclientes';
    return this.httpClient.get<ListaClientesI[]>(dir);
  }

  // Metodo para obtener los datos del cliente
  obtenerCliente(idcliente: string): Observable<ClienteI> {
    let dir = this.urlApi + 'infoCliente/' + idcliente;
    return this.httpClient.get<ClienteI>(dir);
  }

  // Metodo para obtener los domicilios de un cliente
  obtenerDomicilio(idcliente: string): Observable<DomicilioI> {
    let dir = this.urlApi + 'infoClienteDom/' + idcliente;
    return this.httpClient.get<DomicilioI>(dir);
  }

  // Metodo para obtener los documentos de un cliente
  obtenerDocumento(idcliente: string): Observable<DocumentosI> {
    let dir = this.urlApi + 'infoClienteDoc/' + idcliente;
    return this.httpClient.get<DocumentosI>(dir);
  }

  // Metodo para actualizar informacion de un cliente 
  actualizarCliente(form: ClienteI, idcliente: string): Observable<ResponseI> {
    let dir = this.urlApi + 'modificarCliente/' + idcliente;
    return this.httpClient.put<ResponseI>(dir, form);
  }

  // Metodo para actualizar domicilios de un cliente
  actualizarDomicilio(form: DomicilioI, idcliente: string): Observable<DomicilioI> {
    let dir = this.urlApi + 'modificarDomicilio/' + idcliente;
    return this.httpClient.put<DomicilioI>(dir, form);
  }

  // Metodo para actualizar documentos de un cliente
  actualizarDocumentos(form: DocumentosI, idcliente: string): Observable<DocumentosI> {
    let dir = this.urlApi + 'modificarDocumento/' + idcliente;
    return this.httpClient.put<DocumentosI>(dir, form);
  }

  // Metodo para eliminar un cliente
  eliminarCliente(idcliente: string) {
    let dir = this.urlApi + 'eliminarCliente/' + idcliente;

    return this.httpClient.delete(dir);
  }

  // Metodo para eliminar el documento de un cliente
  eliminarDocumento(idcliente: string) {
    let dir = this.urlApi + 'eliminarDocumento/' + idcliente;

    return this.httpClient.delete(dir);
  }

  // Metodo para eliminar un cliente
  eliminarDomicilio(idcliente: string) {
    let dir = this.urlApi + 'eliminarDomicilio/' + idcliente;

    return this.httpClient.delete(dir);
  }
}
