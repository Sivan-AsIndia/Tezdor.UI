import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class AppComponent {
  protected readonly title = signal('TezdorAngular_Project');
}
