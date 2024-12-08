import { Component, OnInit, computed } from '@angular/core';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  collapsed = signal(false); // Controla si el menú está colapsado
  username = ''; // Nombre del usuario
  menuItems = [
    { icon: 'bi-house-door', label: 'Inicio', link: '/sidebar/home' },
    { icon: 'fas fa-dragon', label: 'Pokemones', link: '/sidebar/dragones' },
    { icon: 'bi-people', label: 'Usuarios', link: '/sidebar/usuarios' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.username = user.name || 'Usuario'; // Asigna el nombre del usuario
    } else {
      this.router.navigate(['/login']); // Redirige al login si no hay usuario
    }
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
  }
}
