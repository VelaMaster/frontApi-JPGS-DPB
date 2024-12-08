import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OpcionesComponent } from './dashboard/opciones/opciones.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DragonsComponent } from './dragons/dragons.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'home', component: HomeComponent }, // home
  { path: 'option', component: OpcionesComponent }, // home
  {path: 'sidebar',
    component: SidebarComponent,
    children: [
      { path: 'option', component: OpcionesComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dragones', component: DragonsComponent },


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // x defecto
  { path: '**', redirectTo: '/login' }, // login errors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
