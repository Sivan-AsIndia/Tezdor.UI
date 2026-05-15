import { CommonModule } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarManager } from '../../../core/services/sidebar';
import { filter } from 'rxjs';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-horizontal-sidebar',
  templateUrl: './horizontal-sidebar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule]
})
export class HorizontalSidebarComponent implements OnInit {
  private readonly router = inject(Router);
  readonly sidebar = inject(SidebarManager);
  private themeService = inject(ThemeService);

  openMenu = signal<string | null>(null);
  activeMenu = signal<string | null>(null); 
  currentUrl = signal(this.router.url);

  menuRoutes: Record<string, string[]> = {
    productMenu:   ['/products', '/productCreate', '/productEdit', '/product'],
    purchaseMenu:  ['/purchase-order', '/purchase-invoice'],
    viewEmployees: ['/employees', '/employees/create', '/employee/edit', '/attendance', '/shifts', '/salary', '/petty-cash'],
    ledgerMenu:    ['/general-ledger-entries'],
  };

containerMode = this.themeService.containerMode; 

  ngOnInit(): void {
    this.detectActive(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.currentUrl.set(e.urlAfterRedirects);
        this.detectActive(e.urlAfterRedirects);
      });
  }

  detectActive(url: string): void {
    const key = this.getMatchingKey(url);
    this.activeMenu.set(key);
    this.openMenu.set(key); // active menu open வை
  }

  toggle(menu: string): void {
    this.openMenu.update(current => current === menu ? null : menu);
  }

  isOpen(menu: string): boolean {
    return this.openMenu() === menu;
  }

  // active route match மட்டும் — hover இல்லாம
  isParentActive(menu: string): boolean {
    return this.activeMenu() === menu;
  }

  isMenuActive(routes: string[]): boolean {
    return routes.some(r => this.matchRoute(this.currentUrl(), r));
  }

  private matchRoute(currentUrl: string, route: string): boolean {
    const clean = currentUrl.split('?')[0];
    return clean === route || clean.startsWith(route + '/');
  }

  private getMatchingKey(url: string): string | null {
    for (const [key, routes] of Object.entries(this.menuRoutes)) {
      if (routes.some(r => this.matchRoute(url, r))) return key;
    }
    return null;
  }

   @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideSidebar = target.closest('#sidebarnav');
    if (!clickedInsideSidebar) {
      this.openMenu.set('');
    }
  }
}