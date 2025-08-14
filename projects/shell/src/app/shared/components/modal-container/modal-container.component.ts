import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService, ModalInstance, ModalResult } from '../../services/modal.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  modals: ModalInstance[] = [];
  private destroy$ = new Subject<void>();

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.modals$
      .pipe(takeUntil(this.destroy$))
      .subscribe(modals => {
        this.modals = modals;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onModalConfirm(modalId: string): void {
    this.modalService.close(modalId, { action: 'confirm' });
  }

  onModalCancel(modalId: string): void {
    this.modalService.close(modalId, { action: 'cancel' });
  }

  onModalClose(modalId: string): void {
    this.modalService.close(modalId, { action: 'close' });
  }

  onModalCustomAction(modalId: string, customAction: string): void {
    this.modalService.close(modalId, { action: 'custom', customAction });
  }

  onVisibilityChange(modalId: string, visible: boolean): void {
    if (!visible) {
      this.modalService.close(modalId, { action: 'close' });
    }
  }

  trackByModalId(index: number, modal: ModalInstance): string {
    return modal.id;
  }
}