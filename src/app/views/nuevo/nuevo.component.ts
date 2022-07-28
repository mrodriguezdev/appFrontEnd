import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/apiRest/api.service'
import { ClienteI } from '../../models/cliente.interface';
import { DomicilioI } from '../../models/domicilio.interface'
import { DocumentosI } from '../../models/documentos.interface'
import { AlertsService } from '../../services/alerts/alerts.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {


  // Variable donde almacenaremos los campos del formulario de cliente
  nuevoFormCli = new FormGroup({
    NOMBRE: new FormControl(''),
    APELLIDO: new FormControl(''),
    RAZSOC: new FormControl(''),
    TELEFONO: new FormControl(''),
    FECH_REGISTRO: new FormControl(''),
    FECH_MODI: new FormControl(''),
    IDUSUARIO: new FormControl('')
  });


  // Variable donde almacenaremos los campos del formulario domicilios
  nuevoFormDom = new FormGroup({
    DIRECCION: new FormControl(''),
    DEPARTAMENTO: new FormControl(''),
    MUNICIPIO: new FormControl(''),
    IDCLIENTE: new FormControl('')
  });

  // Variable donde almacenaremos los campos del formulario documentos
  nuevoFormDoc = new FormGroup({
    TIPDOCU: new FormControl(''),
    NODOCU: new FormControl(''),
    IDCLIENTE: new FormControl('')
  });

  // Inyectando librerias a nuestro constructor y nuestro servicio
  constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService, private toastr: AlertsService) { }

  ngOnInit(): void {
  }


  // Metodo para registrar un nuevo cliente 
  nuevoCliente(form: ClienteI) {

    this.apiService.registrarCliente(form).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
    this.toastr.mostrarSuccess("Se registro el cliente correctamente!", "OK");
  }

  // Metodo para agregar un domicilio a un cliente
  nuevoDomicilio(form: DomicilioI) {
    this.apiService.registrarDomicilio(form).subscribe(data => {
      console.log(data);
    }, error => console.log(error));

    this.toastr.mostrarSuccess("Se registro el domicilio correctamente!", "OK");
  }

  // Metodo para agregar un documento a un cliente
  nuevoDocumento(form: DocumentosI) {
    this.apiService.registrarDocumento(form).subscribe(data => {
      console.log(data);
    }, error => console.log(error));

    this.toastr.mostrarSuccess("Se registro el documento correctamente!", "OK");
  }

  // Metodo que devuelve el Id de cliente nuevo
  maxId() { }

  // Metodo para regresar al listado de clientes
  irAListado() {
    this.router.navigate(['dashboard']);
  }


}
