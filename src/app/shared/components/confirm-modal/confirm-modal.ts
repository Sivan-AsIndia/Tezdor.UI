import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

export type ModalType = 'delete' | 'warning' | 'success';
@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModalComponent {

  visible = signal(false);
  type = signal<ModalType>('delete');

  title = signal('');
  message = signal('');

  confirmText = signal('Confirm');

  confirmCallback: (() => void) | null = null;

  open(config: {
    type: ModalType;
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => void;
  }) {
    this.type.set(config.type);
    this.title.set(config.title);
    this.message.set(config.message);
    this.confirmText.set(config.confirmText || 'Confirm');
    this.confirmCallback = config.onConfirm || null;

    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  confirm() {
    this.confirmCallback?.();
    this.close();
  }
}
