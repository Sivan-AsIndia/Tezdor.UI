import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './core/services/theme';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class AppComponent {
  protected readonly title = signal('TezdorAngular_Project');
    private themeService = inject(ThemeService);
 ngOnInit(): void {
    const saved = this.themeService.loadTheme();
    this.themeService.applyTheme(saved); 
  }
}
