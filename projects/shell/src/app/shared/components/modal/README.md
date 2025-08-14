# Modal Component System

A comprehensive, reusable modal component system built with Angular, PrimeNG, and Tailwind CSS. This system provides a flexible way to display different types of modals (info, success, warning, error, danger) with full dark mode support and responsive design.

## Features

- 🎨 **Multiple Modal Types**: Info, Success, Warning, Error, Danger
- 🌙 **Dark Mode Support**: Seamless integration with the application's theme system
- 📱 **Responsive Design**: Works perfectly on all screen sizes
- ⚡ **Service-Based**: Easy programmatic modal management
- 🎭 **Animations**: Smooth enter/exit animations
- ♿ **Accessibility**: Keyboard navigation and ARIA support
- 🔧 **Customizable**: Flexible button configurations and styling
- 📚 **TypeScript**: Full type safety and IntelliSense support

## Quick Start

### 1. Import the SharedModule

```typescript
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [SharedModule],
  // ...
})
export class YourModule { }
```

### 2. Add Modal Container to Your App

Add the modal container to your main app component or layout:

```html
<!-- app.component.html -->
<router-outlet></router-outlet>
<app-modal-container></app-modal-container>
```

### 3. Use the Modal Service

```typescript
import { Component } from '@angular/core';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showConfirmation()">Delete Item</button>
  `
})
export class ExampleComponent {
  constructor(private modalService: ModalService) {}

  async showConfirmation() {
    try {
      const result = await this.modalService.showConfirmation(
        'Confirm Deletion',
        'Are you sure you want to delete this item? This action cannot be undone.',
        'Delete',
        'Cancel'
      );
      
      if (result.action === 'confirm') {
        // User confirmed - proceed with deletion
        console.log('Item deleted');
      }
    } catch (error) {
      console.error('Modal error:', error);
    }
  }
}
```

## Modal Types

### Info Modal
```typescript
const result = await this.modalService.showInfo(
  'Information',
  'This is an informational message.'
);
```

### Success Modal
```typescript
const result = await this.modalService.showSuccess(
  'Success!',
  'Your operation completed successfully.'
);
```

### Warning Modal
```typescript
const result = await this.modalService.showWarning(
  'Warning',
  'This action may have consequences.'
);
```

### Error Modal
```typescript
const result = await this.modalService.showError(
  'Error',
  'An error occurred while processing your request.'
);
```

### Danger Modal
```typescript
const result = await this.modalService.showDanger(
  'Dangerous Action',
  'This action is irreversible.'
);
```

## Custom Modal Configuration

```typescript
import { ModalButton, ModalConfig } from './shared/components/modal';

const customButtons: ModalButton[] = [
  { label: 'Save Draft', action: 'custom', customAction: 'save_draft', style: 'secondary' },
  { label: 'Discard', action: 'custom', customAction: 'discard', style: 'danger' },
  { label: 'Continue', action: 'cancel', style: 'primary' }
];

const config: ModalConfig = {
  type: 'warning',
  title: 'Unsaved Changes',
  description: 'You have unsaved changes. What would you like to do?',
  buttons: customButtons,
  showCloseButton: true,
  closableOnBackdrop: false,
  width: '500px',
  maxWidth: '90vw'
};

const result = await this.modalService.open(config);
```

## Button Styles

- `primary`: Blue button (default)
- `secondary`: Gray button
- `danger`: Red button
- `success`: Green button
- `warning`: Amber button

## Button Actions

- `confirm`: Triggers onConfirm event and closes modal
- `cancel`: Triggers onCancel event and closes modal
- `close`: Triggers onClose event and closes modal
- `custom`: Triggers onCustomAction event with customAction value

## Modal Result

All modal methods return a Promise that resolves with a `ModalResult` object:

```typescript
interface ModalResult {
  action: 'confirm' | 'cancel' | 'close' | 'custom';
  customAction?: string; // Only present when action is 'custom'
}
```

## Direct Component Usage

You can also use the modal component directly in templates:

```html
<app-modal
  [visible]="showModal"
  [config]="modalConfig"
  (visibleChange)="showModal = $event"
  (onConfirm)="handleConfirm()"
  (onCancel)="handleCancel()"
  (onClose)="handleClose()"
  (onCustomAction)="handleCustomAction($event)"
></app-modal>
```

## Dark Mode

The modal system automatically adapts to your application's dark mode. It uses the `:host-context(.dark-theme)` selector to apply dark mode styles when the `dark-theme` class is present on a parent element.

## Accessibility

- **Keyboard Navigation**: ESC key closes modals
- **Focus Management**: Proper focus trapping and restoration
- **ARIA Labels**: Screen reader support
- **Color Contrast**: WCAG compliant color schemes

## Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Flexible Layout**: Adapts to different screen sizes
- **Touch Friendly**: Large touch targets for mobile

## Examples

See `modal-example.component.ts` for comprehensive usage examples of all modal types and configurations.

## API Reference

### ModalService Methods

- `open(config: ModalConfig): Promise<ModalResult>`
- `showInfo(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult>`
- `showSuccess(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult>`
- `showWarning(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult>`
- `showError(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult>`
- `showDanger(title: string, description: string, buttons?: ModalButton[]): Promise<ModalResult>`
- `showConfirmation(title: string, description: string, confirmText?: string, cancelText?: string): Promise<ModalResult>`
- `close(modalId: string, result: ModalResult): void`
- `closeAll(): void`

### Properties

- `openModalCount: number` - Number of currently open modals
- `hasOpenModals: boolean` - Whether any modals are open
- `modals$: Observable<ModalInstance[]>` - Observable of all modal instances