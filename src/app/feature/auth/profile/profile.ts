import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);

  readonly currentUser = this.authService.currentUser;
  readonly userName = computed(() => this.currentUser()?.name ?? 'User');
  readonly userEmail = computed(() => this.currentUser()?.email ?? '');
  readonly userInitials = computed(() => {
    const name = this.currentUser()?.name ?? '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  });
}
