import { Injectable, signal } from '@angular/core';
import { Toast } from '../models/toast';

@Injectable({ providedIn: 'root' })
export class ToastNotifier {

  private readonly _toasts = signal<Toast[]>([]);
  toasts = this._toasts.asReadonly();

  private counter = 0;

  show(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const id = ++this.counter;

    const toast: Toast = { id, message, type, duration };

    this._toasts.update(t => [...t, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error', 5000);
  }

  warning(msg: string) {
    this.show(msg, 'warning');
  }

  info(msg: string) {
    this.show(msg, 'info');
  }

  remove(id: number) {
    this._toasts.update(t => t.filter(x => x.id !== id));
  }

  clear() {
    this._toasts.set([]);
  }
}