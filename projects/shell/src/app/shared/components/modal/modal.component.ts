import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export type ModalType = 'info' | 'success' | 'warning' | 'error' | 'danger';

export interface ModalButton {
  label: string;
  action: 'confirm' | 'cancel' | 'close' | 'custom';
  style?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  customAction?: string;
  disabled?: boolean;
}

export interface ModalConfig {
  type: ModalType;
  title: string;
  description: string;
  buttons?: ModalButton[];
  showCloseButton?: boolean;
  closableOnBackdrop?: boolean;
  width?: string;
  maxWidth?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void => *', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('* => void', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('backdropAnimation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('200ms ease-out')),
      transition('* => void', animate('150ms ease-in'))
    ])
  ]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Input() config: ModalConfig = {
    type: 'info',
    title: '',
    description: '',
    showCloseButton: true,
    closableOnBackdrop: true
  };

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onCustomAction = new EventEmitter<string>();

  private keydownListener?: (event: KeyboardEvent) => void;

  ngOnInit() {
    this.setupKeyboardListeners();
  }

  ngOnDestroy() {
    this.removeKeyboardListeners();
  }

  private setupKeyboardListeners() {
    this.keydownListener = (event: KeyboardEvent) => {
      if (this.visible && event.key === 'Escape') {
        this.handleClose();
      }
    };
    document.addEventListener('keydown', this.keydownListener);
  }

  private removeKeyboardListeners() {
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener);
    }
  }

  get modalIcon(): string {
    const iconMap = {
      info: 'pi-info-circle',
      success: 'pi-check-circle',
      warning: 'pi-exclamation-triangle',
      error: 'pi-times-circle',
      danger: 'pi-exclamation-triangle'
    };
    return iconMap[this.config.type] || 'pi-info-circle';
  }

  get modalIconColor(): string {
    const colorMap = {
      info: 'text-blue-500',
      success: 'text-emerald-500',
      warning: 'text-amber-500',
      error: 'text-red-500',
      danger: 'text-red-500'
    };
    return colorMap[this.config.type] || 'text-blue-500';
  }

  get defaultButtons(): ModalButton[] {
    switch (this.config.type) {
      case 'success':
      case 'info':
        return [{ label: 'OK', action: 'close', style: 'primary' }];
      case 'warning':
      case 'error':
      case 'danger':
        return [
          { label: 'Cancel', action: 'cancel', style: 'secondary' },
          { label: 'Confirm', action: 'confirm', style: 'danger' }
        ];
      default:
        return [{ label: 'OK', action: 'close', style: 'primary' }];
    }
  }

  get buttons(): ModalButton[] {
    return this.config.buttons || this.defaultButtons;
  }

  handleBackdropClick() {
    if (this.config.closableOnBackdrop !== false) {
      this.handleClose();
    }
  }

  handleClose() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onClose.emit();
  }

  handleButtonClick(button: ModalButton) {
    switch (button.action) {
      case 'confirm':
        this.onConfirm.emit();
        this.handleClose();
        break;
      case 'cancel':
        this.onCancel.emit();
        this.handleClose();
        break;
      case 'close':
        this.handleClose();
        break;
      case 'custom':
        if (button.customAction) {
          this.onCustomAction.emit(button.customAction);
        }
        break;
    }
  }

  getButtonClasses(button: ModalButton): string {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const styleMap = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      success: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
      warning: 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500'
    };

    const style = button.style || 'primary';
    const disabledClasses = button.disabled ? 'opacity-50 cursor-not-allowed' : '';
    
    return `${baseClasses} ${styleMap[style]} ${disabledClasses}`;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}