import { Directive, ElementRef, HostListener, inject, input, signal } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipUiComponent } from './tooltip-ui';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {

  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef);

  /* ✅ Signal Inputs */
  text = input<string>('', { alias: 'appTooltip' });
  tooltipIcon = input<string>('ti-link');
  tooltipBg = input<string>('linear-gradient(135deg, #6a5af9, #8b5cf6)');
  tooltipArrow = input<string>('#7c5cff');
  tooltipIconColor = input<string>('#fff');

  private overlayRef: OverlayRef | null = null;
  private readonly isOpen = signal(false);

  // 🟢 SHOW
  @HostListener('mouseenter')
  show() {
    if (this.isOpen()) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false
    });

    const portal = new ComponentPortal(TooltipUiComponent);
    const tooltipRef = this.overlayRef.attach(portal);

    tooltipRef.setInput('text', this.text());
    tooltipRef.setInput('icon', this.tooltipIcon());
    tooltipRef.setInput('background', this.tooltipBg());
    tooltipRef.setInput('arrowColor', this.tooltipArrow());
    tooltipRef.setInput('iconColor', this.tooltipIconColor());

    this.isOpen.set(true);
  }

  // 🔴 HIDE
  @HostListener('mouseleave')
  hide() {
    this.dispose();
  }

  private dispose() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.isOpen.set(false);
    }
  }
}