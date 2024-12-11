import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  correo: string;
  contrasena: string;
  imagen: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: boolean;
  usuarios: Usuario[];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ApiResponse>('http://127.0.0.1:8000/api/usuarios')
      .subscribe(response => {
        if (response.status && response.usuarios) {
          this.usuarios = response.usuarios;
          this.filteredUsuarios = [...this.usuarios];
        }
      });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsuarios.length / this.itemsPerPage);
  }

  get paginatedUsers(): Usuario[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsuarios.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSearch(searchTerm: string) {
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }
}
