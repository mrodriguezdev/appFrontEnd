import { Injectable } from '@angular/core';
// Importando librerias necesarias para mostrar los alerts
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) { }

  mostrarSuccess(texto:string, titulo: string){
    this.toastr.success(texto, titulo);
  }

  mostrarError(texto:string, titulo: string){
    this.toastr.error(texto, titulo);
  }
}
