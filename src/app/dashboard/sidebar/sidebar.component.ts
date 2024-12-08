import { Component, OnInit, computed } from '@angular/core';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  collapsed = signal(false); // Controla si el menú está colapsado
  usuario:  User| null = null;

  menuItems = [
    { icon: 'bi-house-door', label: 'Inicio', link: '/sidebar/home' },
    { icon: 'fas fa-dragon', label: 'Dagrones', link: '/sidebar/dragones' },
    { icon: 'bi-people', label: 'Usuarios', link: '/sidebar/usuarios' },
  ];

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser(); // Obtener el usuario logueado
  }
  
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
  }
}
