import { CommonModule } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { SidebarManager } from '../../../core/services/sidebar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule]
})
export class VerticalSidebarComponent {
  readonly sidebar = inject(SidebarManager);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentUser = this.authService.currentUser;
  readonly userName = computed(() => this.currentUser()?.name ?? 'User');
  readonly userRole = computed(() => this.currentUser()?.role ?? 'Admin');
  readonly userInitials = computed(() => {
    const name = this.currentUser()?.name ?? '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  });



  openMenu = signal<string | null>(null);
  hoveredMenu = signal<string | null>(null);
  isHovered = signal(false);
  currentUrl = signal(this.router.url);


menuRoutes: Record<string, string[]> = {
  'viewEmployees':  ['/employees'],
  'attendance' :['/attendance'],
  'salary' :['/salary'],
  'petty-cash' :['/petty-cash'],
  'productMenu':    ['/products'],
  'storeMenu':    ['/store'],
  'purchaseMenu':   ['/purchase-order'],
  'purchaseinvoice':   ['/purchase-invoice'],
  'general-ledger' : ['/general-ledger-entries'],
  'salesinvoice':   ['/sales-invoice'],
  'shifts': ['/shifts']
};

   ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.currentUrl.set(e.urlAfterRedirects);
        this.openMenu.set(this.getMatchingKey(e.urlAfterRedirects));
      });

    this.openMenu.set(this.getMatchingKey(this.currentUrl()));
  }


  onHover(val: boolean): void {
    this.isHovered.set(val);
  }

  onMenuHover(menu: string): void {
    this.hoveredMenu.set(menu);
  }

  onMenuLeave(): void {
    this.hoveredMenu.set(null);
  }

  toggle(menu: string): void {
    this.openMenu.update(current =>
      current === menu ? null : menu
    );
  }

  isOpen(menu: string): boolean {
    return this.openMenu() === menu;
  }

  isActive(routes: string[]): boolean {
    return routes.some(r => this.matchRoute(this.currentUrl(), r));
  }

  isHighlighted(menu: string): boolean {
    return (
      this.isOpen(menu) ||
      this.isActive(this.menuRoutes[menu]) ||
      this.hoveredMenu() === menu
    );
  }

private matchRoute(currentUrl: string, route: string): boolean {
  const clean = currentUrl.split('?')[0];
  return clean === route || clean.startsWith(route + '/');
}

  private getMatchingKey(currentUrl: string): string | null {
    for (const [key, routes] of Object.entries(this.menuRoutes)) {
      if (routes.some(r => this.matchRoute(currentUrl, r))) {
        return key;
      }
    }
    return null;
  }
  
  logout(): void {
    this.authService.logout();
  }
}
