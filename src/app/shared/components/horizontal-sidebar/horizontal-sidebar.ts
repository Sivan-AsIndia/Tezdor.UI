import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarManager } from '../../../core/services/sidebar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-horizontal-sidebar',
  templateUrl: './horizontal-sidebar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule]
})
export class HorizontalSidebarComponent implements OnInit {
  private readonly router = inject(Router);
  readonly sidebar = inject(SidebarManager);

  openMenu = signal<string | null>(null);
  hoveredMenu = signal<string | null>(null);
  isHovered = signal(false);
  currentUrl = signal(this.router.url);

  menuRoutes: Record<string, string[]> = {
    category:       ['/product/categorylist', '/product/list-model', '/product/list3'],
    createEmployee: ['/employee/create', '/employee/stepper', '/product/create-category'],
    viewEmployee:   ['/employee/view', '/product/view-model', '/employee/view1', '/vendor'],
    viewEmployees:  ['/employees', '/employees/create', '/employee/edit'],
    productMenu:    ['/products', '/productCreate', '/productEdit', '/product/view', '/product'],
  };

 private readonly menuColorMap: Record<string, { active: string; text: string; hover: string,before:string }> = {
  category:       { active: 'active-bg-indigo',   text: 'text-indigo',   hover: 'indigo-hover-bg', before:'indigo-hover-bg'},
  createEmployee: { active: 'active-bg-warning',  text: 'text-warning',  hover: 'warning-hover-bg' ,before: 'warning-hover-bg'},
  viewEmployee:   { active: 'active-bg-primary',  text: 'text-primary',  hover: 'primary-hover-bg' ,before: 'primary-hover-bg'},
  productMenu:    { active: 'active-bg-secondary',  text: 'text-secondary',  hover: 'secondary-hover-bg' ,before: 'secondary-hover-bg'  }, // ← same as viewEmployee
  viewEmployees:  { active: 'active-bg-success',  text: 'text-success',  hover: 'success-hover-bg', before: 'success-hover-bg' },
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

  getMenuClasses(menu: string): Record<string, boolean> {
    const highlighted = this.isHighlighted(menu);
    const cfg = this.menuColorMap[menu];

    return {
      'active':        highlighted,
      [cfg.active]:    highlighted,
      [cfg.text]:      highlighted,
      [cfg.hover]:     true,
    };
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
    this.openMenu.update(current => current === menu ? null : menu);
  }

  isOpen(menu: string): boolean {
    return this.openMenu() === menu;
  }

  isMenuActive(routes: string[]): boolean {
    return routes.some(r => this.matchRoute(this.currentUrl(), r));
  }

  isHighlighted(menu: string): boolean {
    return (
      this.isOpen(menu) ||
      this.isMenuActive(this.menuRoutes[menu]) ||
      this.hoveredMenu() === menu
    );
  }

  private matchRoute(currentUrl: string, route: string): boolean {
    const clean = currentUrl.split('?')[0];
    return clean === route || clean.startsWith(route + '/');
  }

  private getMatchingKey(currentUrl: string): string | null {
    for (const [key, routes] of Object.entries(this.menuRoutes)) {
      if (routes.some(r => this.matchRoute(currentUrl, r))) return key;
    }
    return null;
  }
}