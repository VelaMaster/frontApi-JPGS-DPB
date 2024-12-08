import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { signal, computed } from '@angular/core';

export type MenuItem = {
  icon: string;
  label: string;
  link: string;
};

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent {
  // Variable que almacena el usuario logueado
  loggedInUser: any = null;

  // Menú de navegación, con una señal para mantener la reactividad
  menuItems = signal<MenuItem[]>([
    { icon: 'bi-house-door', label: 'Inicio', link: '/sidebar/home' },
    { icon: 'bi-controller', label: 'Dragones', link: '/sidebar/dragones' },
    { icon: 'bi-person', label: 'Usuarios', link: '/sidebar/list' },
  ]);

  // Señal para el estado de si el sidenav está colapsado o no
  sideNavCollapsed = signal(false);

  // Propiedad para manejar el cambio de estado de colapso
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  // Cálculo del tamaño de la imagen de perfil dependiendo del estado del sidenav
  profilePicsSize = computed(() => this.sideNavCollapsed() ? '32px' : '100px');

  // Método para manejar el logout
  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedInUser = null;
  }

  // Método ngOnInit para cargar el usuario desde localStorage
  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      this.loggedInUser = JSON.parse(loggedInUser);
    }
  }
}
