import { Component, OnInit } from '@angular/core';
// Importando librerias 
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteI } from '../../models/cliente.interface';
import { DomicilioI } from '../../models/domicilio.interface'
import { DocumentosI } from '../../models/documentos.interface'
import { ApiService } from '../../services/apiRest/api.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AlertsService } from '../../services/alerts/alerts.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  datosCliente: ClienteI[];
  datosDomicilio: DomicilioI[];
  datosDocumentos: DocumentosI[];
  bloquearCampo = true;

  // Variable donde almacenaremos los campos del formulario de cliente
  actualizarFormCli = new FormGroup({
    NOMBRE: new FormControl(''),
    APELLIDO: new FormControl(''),
    RAZSOC: new FormControl(''),
    TELEFONO: new FormControl(''),
    FECH_REGISTRO: new FormControl(''),
    FECH_MODI: new FormControl(''),
    IDUSUARIO: new FormControl('')
  });


  // Variable donde almacenaremos los campos del formulario domicilios
  actualizarFormDom = new FormGroup({
    DIRECCION: new FormControl(''),
    DEPARTAMENTO: new FormControl(''),
    MUNICIPIO: new FormControl(''),
    IDCLIENTE: new FormControl('')
  });

  // Variable donde almacenaremos los campos del formulario documentos
  actualizarFormDoc = new FormGroup({
    TIPDOCU: new FormControl(''),
    NODOCU: new FormControl(''),
    IDCLIENTE: new FormControl('')
  });

  // Inyectando librerias a nuestro constructor y nuestro servicio
  constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService, private toastr: AlertsService) { }

  ngOnInit(): void {
    // Obteniendo y asignando variable de nuestra id de cliente a actualizar
    let id: string = this.activeRoute.snapshot.paramMap.get('idcliente')!;

    this.apiService.obtenerCliente(id).subscribe((data: any) => {
      this.datosCliente = data;
      this.actualizarFormCli.patchValue({
        'NOMBRE': this.datosCliente[0].NOMBRE,
        'APELLIDO': this.datosCliente[0].APELLIDO,
        'RAZSOC': this.datosCliente[0].RAZSOC,
        'TELEFONO': this.datosCliente[0].TELEFONO,
        'FECH_REGISTRO': this.datosCliente[0].FECH_REGISTRO,
        'FECH_MODI': this.datosCliente[0].FECH_MODI,
        'IDUSUARIO': this.datosCliente[0].IDUSUARIO
      });
    })

    this.apiService.obtenerDomicilio(id).subscribe((data: any) => {
      this.datosDomicilio = data;
      this.actualizarFormDom.patchValue({
        'DIRECCION': this.datosDomicilio[0].DIRECCION,
        'DEPARTAMENTO': this.datosDomicilio[0].DEPARTAMENTO,
        'MUNICIPIO': this.datosDomicilio[0].MUNICIPIO,
        'IDCLIENTE': this.datosDomicilio[0].IDCLIENTE
      });
    })

    this.apiService.obtenerDocumento(id).subscribe((data: any) => {
      this.datosDocumentos = data;
      this.actualizarFormDoc.patchValue({
        'TIPDOCU': this.datosDocumentos[0].TIPDOCU,
        'NODOCU': this.datosDocumentos[0].NODOCU,
        'IDCLIENTE': this.datosDocumentos[0].IDCLIENTE
      });
      console.log(this.actualizarFormDoc.value);
    })

  }

  // Metodo para actualizar informacion de un cliente
  actualizarCliente(form: ClienteI) {

    let id: string = this.activeRoute.snapshot.paramMap.get('idcliente')!;

    this.apiService.actualizarCliente(form, id).subscribe(data => {
      console.log(data);
      this.bloquearCampo = false;
    }, error => console.log(error));
    this.toastr.mostrarSuccess("El cliente se actualizo correctamente!", "OK");

  }

  // Metodo para actualizar domicilios de un cliente
  actualizarDomicilio(form: DomicilioI) {
    let id: string = this.activeRoute.snapshot.paramMap.get('idcliente')!;

    this.apiService.actualizarDomicilio(form, id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
    this.toastr.mostrarSuccess("El domicilio se actualizo correctamente!", "OK");

  }

  // Metodo para actualizar documentos de un cliente 
  actualizarDocumento(form: DocumentosI) {
    let id: string = this.activeRoute.snapshot.paramMap.get('idcliente')!;

    this.apiService.actualizarDocumentos(form, id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));

    this.toastr.mostrarSuccess("El documento se actualizo correctamente!", "OK");
  }

  // Metodo para eliminar cliente
  eliminarCliente() {
    let id: string = this.activeRoute.snapshot.paramMap.get('idcliente')!;
    console.log(id);

    let datos: ClienteI = this.actualizarFormCli.value;
    this.apiService.eliminarCliente(id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));

    this.toastr.mostrarSuccess("El cliente se elimino correctamente!", "OK");
  }

  // Metodo para eliminar el documento de un cliente
  eliminarDocumento() {
    let id: string = this.activeRoute.snapshot.paramMap.get('idcliente')!;
    console.log(id);

    let datos: DocumentosI = this.actualizarFormCli.value;
    this.apiService.eliminarDocumento(id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));

    this.toastr.mostrarSuccess("El documento se elimino correctamente!", "OK");
  }

  // Metodo para eliminar un cliente
  eliminarDomicilio() {
    let id: string = this.activeRoute.snapshot.paramMap.get('idcliente')!;
    console.log(id);

    let datos: DomicilioI = this.actualizarFormDom.value;
    this.apiService.eliminarDomicilio(id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));

    this.toastr.mostrarSuccess("El domicilio se elimino correctamente!", "OK");
  }

  // Metodo para regresar al listado de clientes
  irAListado() {
    this.router.navigate(['dashboard']);
  }

}
