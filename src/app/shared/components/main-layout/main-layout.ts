import { AfterViewInit, Component, computed, inject, OnInit } from '@angular/core';
import { VerticalSidebarComponent } from '../vertical-sidebar/vertical-sidebar';
import { ThemeComponent } from '../theme/theme';
import { HorizontalSidebarComponent } from '../horizontal-sidebar/horizontal-sidebar';
import { TopHeaderComponent } from '../top-header/top-header';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../toast/toast';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../../../core/services/theme';
declare var window: any;
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,CommonModule,ThemeComponent,
    VerticalSidebarComponent,HorizontalSidebarComponent,
    TopHeaderComponent,ToastComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayoutComponent implements OnInit, AfterViewInit{

  constructor(private router: Router) {}
  private themeService = inject(ThemeService);
containerMode = this.themeService.containerMode; 
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
  window.InitAppMin();
    // window.initSidebar();
}

}
