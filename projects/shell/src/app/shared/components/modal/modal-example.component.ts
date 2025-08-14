import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalButton } from './modal.component';

@Component({
  selector: 'app-modal-example',
  template: `
    <div class="p-6 space-y-4">
      <h2 class="text-2xl font-bold mb-6">Modal Examples</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Info Modal -->
        <button 
          class="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          (click)="showInfoModal()"
        >
          Show Info Modal
        </button>

        <!-- Success Modal -->
        <button 
          class="p-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          (click)="showSuccessModal()"
        >
          Show Success Modal
        </button>

        <!-- Warning Modal -->
        <button 
          class="p-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          (click)="showWarningModal()"
        >
          Show Warning Modal
        </button>

        <!-- Error Modal -->
        <button 
          class="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          (click)="showErrorModal()"
        >
          Show Error Modal
        </button>

        <!-- Confirmation Modal -->
        <button 
          class="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          (click)="showConfirmationModal()"
        >
          Show Confirmation
        </button>

        <!-- Custom Modal -->
        <button 
          class="p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          (click)="showCustomModal()"
        >
          Show Custom Modal
        </button>
      </div>

      <!-- Results Display -->
      <div class="mt-8 p-4 bg-gray-100 rounded-lg" *ngIf="lastResult">
        <h3 class="font-semibold mb-2">Last Modal Result:</h3>
        <pre class="text-sm">{{ lastResult | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    :host-context(.dark-theme) {
      .bg-gray-100 {
        @apply bg-gray-800 text-gray-200;
      }
    }
  `]
})
export class ModalExampleComponent {
  lastResult: any = null;

  constructor(private modalService: ModalService) {}

  async showInfoModal() {
    try {
      const result = await this.modalService.showInfo(
        'Information',
        'This is an informational message to provide you with important details about the current operation.'
      );
      this.lastResult = result;
    } catch (error) {
      console.error('Modal error:', error);
    }
  }

  async showSuccessModal() {
    try {
      const result = await this.modalService.showSuccess(
        'Success!',
        'Your operation has been completed successfully. All changes have been saved.'
      );
      this.lastResult = result;
    } catch (error) {
      console.error('Modal error:', error);
    }
  }

  async showWarningModal() {
    try {
      const result = await this.modalService.showWarning(
        'Warning',
        'This action may have unintended consequences. Please review your changes before proceeding.'
      );
      this.lastResult = result;
    } catch (error) {
      console.error('Modal error:', error);
    }
  }

  async showErrorModal() {
    try {
      const result = await this.modalService.showError(
        'Error Occurred',
        'An unexpected error has occurred while processing your request. Please try again or contact support if the problem persists.'
      );
      this.lastResult = result;
    } catch (error) {
      console.error('Modal error:', error);
    }
  }

  async showConfirmationModal() {
    try {
      const result = await this.modalService.showConfirmation(
        'Confirm Action',
        'Are you sure you want to delete this item? This action cannot be undone.',
        'Delete',
        'Cancel'
      );
      this.lastResult = result;
    } catch (error) {
      console.error('Modal error:', error);
    }
  }

  async showCustomModal() {
    const customButtons: ModalButton[] = [
      { label: 'Save Draft', action: 'custom', customAction: 'save_draft', style: 'secondary' },
      { label: 'Discard', action: 'custom', customAction: 'discard', style: 'danger' },
      { label: 'Continue Editing', action: 'cancel', style: 'primary' }
    ];

    try {
      const result = await this.modalService.open({
        type: 'warning',
        title: 'Unsaved Changes',
        description: 'You have unsaved changes that will be lost if you leave this page. What would you like to do?',
        buttons: customButtons,
        closableOnBackdrop: false
      });
      this.lastResult = result;
    } catch (error) {
      console.error('Modal error:', error);
    }
  }
}