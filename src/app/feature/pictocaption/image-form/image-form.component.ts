import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PictocaptionService } from '../../../core/services/pictocaption.service';
import { AiResult } from '../../../core/interfaces/ai-result';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit, OnChanges {
  @Input() editingItem: AiResult | null = null;
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  imageUrl: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private pictocaptionService: PictocaptionService) {}

  ngOnInit() {
    this.loadEditingData();
  }

  ngOnChanges() {
    this.loadEditingData();
  }

  private loadEditingData() {
    if (this.editingItem) {
      this.imageUrl = this.editingItem.inputData;
      this.errorMessage = '';
    } else {
      this.imageUrl = '';
      this.errorMessage = '';
    }
  }

  onSubmit() {
    if (!this.imageUrl.trim()) {
      this.errorMessage = 'Por favor ingresa una URL de imagen';
      return;
    }

    if (!this.isValidUrl(this.imageUrl)) {
      this.errorMessage = 'Por favor ingresa una URL válida';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const operation = this.editingItem 
      ? this.pictocaptionService.updateImage(this.editingItem.id!, this.imageUrl)
      : this.pictocaptionService.describeImage(this.imageUrl);

    operation.subscribe({
      next: (result) => {
        console.log('Operación exitosa:', result);
        this.resetForm();
        this.onSave.emit();
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Error al procesar la imagen';
        this.isLoading = false;
      }
    });
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
    } catch {
      return false;
    }
  }

  resetForm() {
    this.imageUrl = '';
    this.isLoading = false;
    this.errorMessage = '';
  }

  cancel() {
    this.resetForm();
    this.onCancel.emit();
  }
}