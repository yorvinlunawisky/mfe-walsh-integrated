import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ModalExampleComponent } from './components/modal/modal-example.component';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    ModalComponent,
    ModalContainerComponent,
    ModalExampleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeToggleComponent,
    ModalComponent,
    ModalContainerComponent,
    ModalExampleComponent
  ]
})
export class SharedModule { }