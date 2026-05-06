import { CommonModule } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { SidebarManager } from '../../../core/services/sidebar';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule]
})
export class VerticalSidebarComponent {
  readonly sidebar = inject(SidebarManager);
  private readonly authService = inject(AuthService);

  readonly currentUser = this.authService.currentUser;
  readonly userName = computed(() => this.currentUser()?.name ?? 'User');
  readonly userRole = computed(() => this.currentUser()?.role ?? 'Admin');
  readonly userInitials = computed(() => {
    const name = this.currentUser()?.name ?? '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  });

  logout(): void {
    this.authService.logout();
  }
}
