import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarManager {

  isCollapsed = signal(this.getInitial());
  isHovered   = signal(false);  

  private getInitial(): boolean {
    const settings = localStorage.getItem('userSettings');
    if (!settings) return false;
    try {
      return JSON.parse(settings)?.SidebarType === 'mini-sidebar';
    } catch {
      return false;
    }
  }

  toggle() {
    this.isCollapsed.update(v => !v);
  }

  set(value: boolean) {
    this.isCollapsed.set(value);
  }

  get isExpanded(): boolean {
    return !this.isCollapsed() || this.isHovered();
  }
}