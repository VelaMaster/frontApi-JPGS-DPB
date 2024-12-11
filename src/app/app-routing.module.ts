import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }, // home
  { path: 'users', component: UserListComponent },
  { path: 'user-list', component: UserListComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // x defecto
  { path: '**', redirectTo: '/login' }, // login errors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
