import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalConfig, ModalType, ModalButton } from '../components/modal/modal.component';

export interface ModalInstance {
  id: string;
  config: ModalConfig;
  visible: boolean;
  resolve?: (result: ModalResult) => void;
}

export interface ModalResult {
  action: 'confirm' | 'cancel' | 'close' | 'custom';
  customAction?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalsSubject = new BehaviorSubject<ModalInstance[]>([]);
  public modals$ = this.modalsSubject.asObservable();
  private modalCounter = 0;

  constructor() { }

  /**
   * Opens a modal with the specified configuration
   * @param config Modal configuration
   * @returns Promise that resolves with the user's action
   */
  open(config: ModalConfig): Promise<ModalResult> {
    return new Promise((resolve) => {
      const modalId = `modal-${++this.modalCounter}`;
      const modalInstance: ModalInstance = {
        id: modalId,
        config: { ...config },
        visible: true,
        resolve
      };

      const currentModals = this.modalsSubject.value;
      this.modalsSubject.next([...currentModals, modalInstance]);
    });
  }

  /**
   * Closes a modal by ID
   * @param modalId The ID of the modal to close
   * @param result The result to resolve with
   */
  close(modalId: string, result: ModalResult): void {
    const currentModals = this.modalsSubject.value;
    const modalIndex = currentModals.findIndex(m => m.id === modalId);
    
    if (modalIndex !== -1) {
      const modal = currentModals[modalIndex];
      if (modal.resolve) {
        modal.resolve(result);
      }
      
      const updatedModals = currentModals.filter(m => m.id !== modalId);
      this.modalsSubject.next(updatedModals);
    }
  }

  /**
   * Closes all open modals
   */
  closeAll(): void {
    const currentModals = this.modalsSubject.value;
    currentModals.forEach(modal => {
      if (modal.resolve) {
        modal.resolve({ action: 'close' });
      }
    });
    this.modalsSubject.next([]);
  }

  /**
   * Convenience method to show an info modal
   */
  showInfo(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult> {
    return this.open({
      type: 'info',
      title,
      description,
      buttons
    });
  }

  /**
   * Convenience method to show a success modal
   */
  showSuccess(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult> {
    return this.open({
      type: 'success',
      title,
      description,
      buttons
    });
  }

  /**
   * Convenience method to show a warning modal
   */
  showWarning(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult> {
    return this.open({
      type: 'warning',
      title,
      description,
      buttons
    });
  }

  /**
   * Convenience method to show an error modal
   */
  showError(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult> {
    return this.open({
      type: 'error',
      title,
      description,
      buttons
    });
  }

  /**
   * Convenience method to show a danger modal
   */
  showDanger(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult> {
    return this.open({
      type: 'danger',
      title,
      description,
      buttons
    });
  }

  /**
   * Convenience method to show a confirmation modal
   */
  showConfirmation(
    title: string, 
    description: string, 
    confirmText: string = 'Confirm', 
    cancelText: string = 'Cancel'
  ): Promise<ModalResult> {
    return this.open({
      type: 'warning',
      title,
      description,
      buttons: [
        { label: cancelText, action: 'cancel', style: 'secondary' },
        { label: confirmText, action: 'confirm', style: 'danger' }
      ]
    });
  }

  /**
   * Gets the current number of open modals
   */
  get openModalCount(): number {
    return this.modalsSubject.value.length;
  }

  /**
   * Checks if any modals are currently open
   */
  get hasOpenModals(): boolean {
    return this.openModalCount > 0;
  }
}