import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlmService } from '../../../core/services/glm.service';
import { AiResult } from '../../../core/interfaces/ai-result';
import { GlmFormComponent } from '../glm-form/glm-form.component';

@Component({
  selector: 'app-glm-list',
  standalone: true,
  imports: [CommonModule, GlmFormComponent],
  templateUrl: './glm-list.component.html',
  styleUrls: ['./glm-list.component.scss']
})
export class GlmListComponent implements OnInit {
  @ViewChild('chatCarousel') chatCarousel!: ElementRef;
  
  chatHistory: AiResult[] = [];
  deletedChats: AiResult[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  editingItem: AiResult | null = null;
  showModal: boolean = false;
  selectedChat: AiResult | null = null;
  showDeleted: boolean = false;

  constructor(private glmService: GlmService) {}

  ngOnInit() {
    this.loadHistory();
    this.loadDeletedHistory();
  }

  loadHistory() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.glmService.getHistory().subscribe({
      next: (data) => {
        this.chatHistory = data.sort((a, b) => 
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

  loadDeletedHistory() {
    console.log('Cargando conversaciones eliminadas...');
    this.glmService.getDeletedHistory().subscribe({
      next: (data) => {
        console.log('Conversaciones eliminadas recibidas:', data);
        this.deletedChats = data.sort((a, b) => 
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        console.log('Total conversaciones eliminadas:', this.deletedChats.length);
      },
      error: (error) => {
        console.error('Error loading deleted history:', error);
      }
    });
  }

  editItem(item: AiResult) {
    this.editingItem = { ...item }; // Crear una copia para evitar mutaciones
  }

  deleteItem(item: AiResult) {
    if (confirm('¿Estás seguro de que quieres eliminar este chat?')) {
      this.glmService.deleteChat(item.id!).subscribe({
        next: () => {
          this.loadHistory();
          this.loadDeletedHistory();
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.errorMessage = 'Error al eliminar el elemento';
        }
      });
    }
  }

  restoreItem(item: AiResult) {
    if (confirm('¿Estás seguro de que quieres restaurar esta conversación?')) {
      this.glmService.restoreChat(item.id!).subscribe({
        next: () => {
          this.loadHistory();
          this.loadDeletedHistory();
        },
        error: (error) => {
          console.error('Error restoring item:', error);
          this.errorMessage = 'Error al restaurar el elemento';
        }
      });
    }
  }

  toggleDeletedSection() {
    this.showDeleted = !this.showDeleted;
  }

  onFormSave() {
    this.editingItem = null;
    this.loadHistory();
    this.loadDeletedHistory();
  }

  onFormCancel() {
    this.editingItem = null;
  }

  viewFullResponse(chat: AiResult) {
    this.selectedChat = chat;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedChat = null;
  }

  scrollLeft() {
    if (this.chatCarousel) {
      this.chatCarousel.nativeElement.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    if (this.chatCarousel) {
      this.chatCarousel.nativeElement.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('es-ES');
  }
}