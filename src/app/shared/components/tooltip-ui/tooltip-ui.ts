import { CommonModule } from '@angular/common';
import { Component, input} from '@angular/core';


@Component({
  selector: 'app-tooltip-ui',
  imports: [CommonModule],
  template: `
<div class="tooltip-box"
     [style.background]="background()"
     [style.--arrow-color]="arrowColor()">

  <i class="ti"
     [class]="icon()"
     [style.color]="iconColor()">
  </i>

  <span>{{ text() }}</span>

</div>
  `,
  styles: [`
    .tooltip-box {
      color: #fff;
      padding: 10px 14px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      position: relative;
    }

.tooltip-box::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: var(--arrow-color) transparent transparent transparent;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.1));
}
  `]
})
export class TooltipUiComponent {

  text = input<string>('');
  icon = input<string>('ti-link');
  background = input<string>('linear-gradient(135deg, #6a5af9, #8b5cf6)');
  arrowColor = input<string>('#7c5cff');
  iconColor = input<string>('#fff');

}
