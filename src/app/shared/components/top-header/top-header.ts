import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarManager } from '../../../core/services/sidebar';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.html',
  styleUrl: './top-header.css',
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopHeaderComponent implements OnInit, OnDestroy {

  private readonly sidebarService = inject(SidebarManager);
  private readonly authService = inject(AuthService);

  /* ── User info from AuthService ── */
  currentUser = this.authService.currentUser;
  userName = computed(() => this.currentUser()?.name ?? 'User');
  userEmail = computed(() => this.currentUser()?.email ?? '');
  userRole = computed(() => this.currentUser()?.role ?? 'Admin');

  /* ── Base signal ── */
  time = signal(new Date());

  private intervalId: any;

  /* ── Computed values ── */
  currentDayName = computed(() => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[this.time().getDay()];
  });

  currentDateShort = computed(() =>
    this.time().getDate().toString().padStart(2, '0')
  );

  currentMonthShort = computed(() => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[this.time().getMonth()];
  });

  currentAmPm = computed(() =>
    this.time().getHours() >= 12 ? 'PM' : 'AM'
  );

  currentTimeHM = computed(() => {
    const now = this.time();
    let h = now.getHours() % 12 || 12;
    let m = now.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  });

  currentTimeSec = computed(() =>
    `:${this.time().getSeconds().toString().padStart(2, '0')}`
  );

  /* ── Lifecycle ── */
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.time.set(new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  /* ── Actions ── */
  toggleSidebar() {
    this.sidebarService.toggle();
  }

  logout() {
    this.authService.logout();
  }
}
