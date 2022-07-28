import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/apiRest/api.service';
import { Router } from '@angular/router';
import { ListaClientesI } from '../../models/listadoclientes.interface';
import { throwIfEmpty } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Variable clientes
  clientes: ListaClientesI[];

  // Inyectando el servicio en nuestro constructor y el Router
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.obtenerClientes().subscribe(data => {
      console.log(data);
      this.clientes = data;
    })
  }

  // Metodo para registrar un nuevo cliente
  registrarCliente() {
    this.router.navigate(['nuevo']);
  }

  // Metodo para actualizar la informacion de un clientes 
  actualizarCliente(idcliente: string) {
    this.router.navigate(['actualizar', idcliente!]);
  }

}
