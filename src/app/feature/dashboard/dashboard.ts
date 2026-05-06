import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class DashboardComponent implements AfterViewInit{

ngAfterViewInit() {
 window.initDashboard();
}

}
