import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictocaptionService } from '../../../core/services/pictocaption.service';
import { AiResult } from '../../../core/interfaces/ai-result';
import { ImageFormComponent } from '../image-form/image-form.component';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule, ImageFormComponent],
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  imageHistory: AiResult[] = [];
  deletedImages: AiResult[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  editingItem: AiResult | null = null;
  showDeleted: boolean = false;

  constructor(private pictocaptionService: PictocaptionService) {}

  ngOnInit() {
    this.loadHistory();
    this.loadDeletedImages();
  }

  loadHistory() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.pictocaptionService.getHistory().subscribe({
      next: (data) => {
        this.imageHistory = data.sort((a, b) => 
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading history:', error);
        this.errorMessage = 'Error al cargar el historial';
        this.isLoading = false;
      }
    });
  }

  loadDeletedImages() {
    console.log('Cargando análisis eliminados...');
    this.pictocaptionService.getDeletedHistory().subscribe({
      next: (data) => {
        console.log('Análisis eliminados recibidos:', data);
        this.deletedImages = data.sort((a, b) => 
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        console.log('Total análisis eliminados:', this.deletedImages.length);
      },
      error: (error) => {
        console.error('Error loading deleted images:', error);
      }
    });
  }

  toggleDeletedSection() {
    this.showDeleted = !this.showDeleted;
  }

  restoreItem(item: AiResult) {
    if (confirm('¿Estás seguro de que quieres restaurar este análisis?')) {
      this.pictocaptionService.restoreImage(item.id!).subscribe({
        next: () => {
          this.loadHistory();
          this.loadDeletedImages();
        },
        error: (error) => {
          console.error('Error restoring item:', error);
          this.errorMessage = 'Error al restaurar el elemento';
        }
      });
    }
  }

  editItem(item: AiResult) {
    this.editingItem = { ...item }; // Crear una copia para evitar mutaciones
  }

  deleteItem(item: AiResult) {
    if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      this.pictocaptionService.deleteImage(item.id!).subscribe({
        next: () => {
          this.loadHistory();
          this.loadDeletedImages();
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.errorMessage = 'Error al eliminar el elemento';
        }
      });
    }
  }

  onFormSave() {
    this.editingItem = null;
    this.loadHistory();
  }

  onFormCancel() {
    this.editingItem = null;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('es-ES');
  }
}