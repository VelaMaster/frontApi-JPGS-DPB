import { Component, OnInit } from '@angular/core';
import { DragonService } from '../services/dragon.service';
import { Dragon } from '../models/dragon.model';

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styleUrl: './dragons.component.css'
})
export class DragonsComponent {
  displayedColumns: string[] = ['id', 'imagen', 'nombre', 'rareza', 'elemento', 'acciones'];
  dataSource: Dragon[] = []; // Lista de dragones
  originalDataSource: Dragon[] = []; // Lista original sin modificar
  searchTerm: string = ''; 
  currentPage: number = 0;
  pageSize: number = 8;
  
  constructor(private dragonService: DragonService) {}

  ngOnInit(): void {
    this.loadDragons();
  }

  // Cargar los dragones desde el servicio
  loadDragons(): void {
    this.dragonService.getDragons().subscribe((data) => {
      console.log('Datos recibidos:', data); // Verifica los datos aquí
      this.originalDataSource = data; // Guardamos los datos originales
      this.dataSource = [...this.originalDataSource]; // Inicializamos la lista visible
    }, (error) => {
      console.error('Error al obtener los dragones:', error);
    });
  }
  

  // Filtrar dragones
  filterDragons(): void {
    if (!this.searchTerm) {
      this.dataSource = [...this.originalDataSource]; // Restaurar datos originales
    } else {
      this.dataSource = this.originalDataSource.filter(dragon =>
        dragon.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        dragon.id.toString().includes(this.searchTerm)
      );
    }
  }

  // Eliminar un dragón
  deleteDragon(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este dragón?')) {
      this.dragonService.deleteDragon(id).subscribe(() => {
        this.dataSource = this.dataSource.filter(dragon => dragon.id !== id);
      });
    }
  }

  // Editar un dragón
  editDragon(dragon: Dragon): void {
    // Para actualizar un dragón, puedes usar un formulario o un componente de edición.
    // Asegúrate de crear una lógica para eso según tu preferencia.
    this.dragonService.updateDragon(dragon).subscribe(updatedDragon => {
      const index = this.dataSource.findIndex(d => d.id === updatedDragon.id);
      if (index !== -1) {
        this.dataSource[index] = updatedDragon;
      }
    });
  }

  // Cambiar de página
  changePage(direction: number): void {
    this.currentPage += direction;
    this.loadDragons();
  }

  // Obtener el número total de páginas
  getTotalPages(): number {
    return Math.ceil(this.dataSource.length / this.pageSize);
  }
}
