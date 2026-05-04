import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlmService } from '../../../core/services/glm.service';
import { AiResult } from '../../../core/interfaces/ai-result';

@Component({
  selector: 'app-glm-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './glm-form.component.html',
  styleUrls: ['./glm-form.component.scss']
})
export class GlmFormComponent implements OnInit, OnChanges {
  @Input() editingItem: AiResult | null = null;
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  prompt: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private glmService: GlmService) {}

  ngOnInit() {
    this.loadEditingData();
  }

  ngOnChanges() {
    this.loadEditingData();
  }

  private loadEditingData() {
    if (this.editingItem) {
      this.prompt = this.editingItem.inputData;
      this.errorMessage = '';
    } else {
      this.prompt = '';
      this.errorMessage = '';
    }
  }

  onSubmit() {
    if (!this.prompt.trim()) {
      this.errorMessage = 'Por favor ingresa un prompt';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const operation = this.editingItem 
      ? this.glmService.updateChat(this.editingItem.id!, this.prompt)
      : this.glmService.chat(this.prompt);

    operation.subscribe({
      next: (result) => {
        console.log('Operación exitosa:', result);
        this.resetForm();
        this.onSave.emit();
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Error al procesar la solicitud';
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.prompt = '';
    this.isLoading = false;
    this.errorMessage = '';
  }

  insertQuestionMarks(textarea: HTMLTextAreaElement) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = this.prompt.substring(start, end);
    
    // Si hay texto seleccionado, lo envolvemos con signos de interrogación
    if (selectedText) {
      const newText = this.prompt.substring(0, start) + '¿' + selectedText + '?' + this.prompt.substring(end);
      this.prompt = newText;
      
      // Posicionar el cursor después del signo de cierre
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(end + 2, end + 2);
      });
    } else {
      // Si no hay texto seleccionado, insertamos los signos y posicionamos el cursor en el medio
      const newText = this.prompt.substring(0, start) + '¿?' + this.prompt.substring(end);
      this.prompt = newText;
      
      // Posicionar el cursor entre los signos de interrogación
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 1, start + 1);
      });
    }
  }

  cancel() {
    this.resetForm();
    this.onCancel.emit();
  }
}