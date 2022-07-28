import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando todos los componentes para configurar las rutas
import { NuevoComponent } from './views/nuevo/nuevo.component'
import { ActualizarComponent } from './views/actualizar/actualizar.component'
import { DashboardComponent } from './views/dashboard/dashboard.component'


// Creando las rutas para que aputen a sus respectivos componentes
const routes: Routes = [
  { path:'', redirectTo:'dashboard', pathMatch: 'full' },
  { path:'dashboard', component: DashboardComponent},
  { path:'nuevo', component: NuevoComponent},
  { path:'actualizar/:idcliente', component: ActualizarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Exportando nuestros componentes 
export const routingComponents = [
  NuevoComponent, ActualizarComponent, DashboardComponent
]