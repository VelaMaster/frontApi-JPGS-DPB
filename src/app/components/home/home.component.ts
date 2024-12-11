import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Dragon {
  id: number;
  nombre: string;
  rareza: string;
  elemento: string;
  imagen: string;
  descripcion: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dragons: Dragon[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // Modals
  showViewModal: boolean = false;
  showEditModal: boolean = false;
  selectedDragon: Dragon | null = null;

  // Datos de edición
  editData = {
    nombre: '',
    rareza: '',
    elemento: '',
    descripcion: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<Dragon[]>('http://127.0.0.1:8000/api/dragons').subscribe(data => {
      this.dragons = data;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.dragons.length / this.itemsPerPage);
  }

  get paginatedDragons(): Dragon[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.dragons.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  viewDragon(dragon: Dragon) {
    this.selectedDragon = dragon;
    this.showViewModal = true;
  }

  editDragon(dragon: Dragon) {
    this.selectedDragon = dragon;
    // Cargar datos del dragón a editar
    this.editData = {
      nombre: dragon.nombre,
      rareza: dragon.rareza,
      elemento: dragon.elemento,
      descripcion: dragon.descripcion
    };
    this.showEditModal = true;
  }

  deleteDragon(dragon: Dragon) {
    const confirmar = window.confirm(`¿Deseas eliminar el dragón "${dragon.nombre}"?`);
    if (confirmar) {
      this.http.delete(`http://127.0.0.1:8000/api/dragons/${dragon.id}`).subscribe(() => {
        this.loadData();
      });
    }
  }

  saveEdit() {
    if (this.selectedDragon) {
      const updatedDragon = {
        nombre: this.editData.nombre,
        rareza: this.editData.rareza,
        elemento: this.editData.elemento,
        descripcion: this.editData.descripcion
      };

      this.http.put(`http://127.0.0.1:8000/api/dragons/${this.selectedDragon.id}`, updatedDragon)
        .subscribe(() => {
          this.showEditModal = false;
          this.loadData();
        });
    }
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedDragon = null;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedDragon = null;
  }
}
