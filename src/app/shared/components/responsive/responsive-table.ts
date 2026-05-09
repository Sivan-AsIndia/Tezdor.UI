import {
  Directive, ElementRef, Input,
  AfterViewChecked, inject, DestroyRef,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appResponsiveTable]',
  standalone: true,
})
export class ResponsiveTable implements AfterViewChecked, OnDestroy {

  @Input() hidePriority: number[] = [];
  @Input() breakpoints: { maxWidth: number; cols: number[] }[] = [];
  @Input() stickyLastCol: boolean = true;

  private el           = inject(ElementRef);
  private destroyRef   = inject(DestroyRef);
  private initialized  = false;
  private lastRowCount = 0;
  private overlay!: HTMLElement;
  private currentHidden: Set<number> = new Set();
  private resizeObserver!: ResizeObserver;

  constructor() {
    this.destroyRef.onDestroy(() => this.cleanup());
  }

  ngAfterViewChecked() {
    const table    = this.el.nativeElement as HTMLTableElement;
    const rows     = table.querySelectorAll('tbody tr');
    const rowCount = rows.length;

    if (rowCount === 0) return;

    if (!this.initialized) {
      this.initialized  = true;
      this.lastRowCount = rowCount;
      this.injectStickyStyles();
      this.createOverlay();
      this.addExpandButtons();
      this.setupResizeListener();
      setTimeout(() => this.recalculate(), 50);
      return;
    }

    if (rowCount !== this.lastRowCount) {
      this.lastRowCount = rowCount;
      this.addExpandButtons();
      setTimeout(() => this.recalculate(), 50);
    }
  }

  ngOnDestroy() { this.cleanup(); }

  private cleanup() {
    this.overlay?.remove();
    this.resizeObserver?.disconnect();
  }

  private injectStickyStyles() {
    const styleId = 'rt-sticky-global';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id    = styleId;
    style.textContent = `
      .v-table__wrapper { overflow-x: hidden !important; }

      .v-table__wrapper table thead th:last-child,
      .v-table__wrapper table tbody td:last-child {
        position: sticky;
        right: 0;
        z-index: 2;
        box-shadow: -2px 0 6px rgba(0,0,0,.06);
      }
      .v-table__wrapper table thead th:last-child {
        background: var(--color-background-secondary, #f5f5f5);
      }
      .v-table__wrapper table tbody td:last-child {
        background: var(--color-background-primary, #fff);
      }
      .v-table__wrapper table tbody tr:hover td:last-child {
        background: var(--color-background-secondary, #f5f5f5);
      }
    `;
    document.head.appendChild(style);
  }

  private setupResizeListener() {
    const table   = this.el.nativeElement as HTMLTableElement;
    const wrapper = this.getWrapper(table);

    this.resizeObserver = new ResizeObserver(() => this.recalculate());
    this.resizeObserver.observe(wrapper);

    const onResize = () => this.recalculate();
    window.addEventListener('resize', onResize);
    this.destroyRef.onDestroy(() => window.removeEventListener('resize', onResize));
  }

  private getWrapper(table: HTMLTableElement): HTMLElement {
    return (
      table.closest('.v-table__wrapper') ??
      table.parentElement ??
      table
    ) as HTMLElement;
  }

  private recalculate() {
    if (this.hidePriority.length > 0) this.autoHide();
    else                               this.applyBreakpoints(window.innerWidth);
  }

  private autoHide() {
    const table   = this.el.nativeElement as HTMLTableElement;
    const wrapper = this.getWrapper(table);

    this.showAllCols(table);

    const availableWidth = wrapper.clientWidth;
    if (availableWidth === 0) return;

    const wrapperRight = wrapper.getBoundingClientRect().right;
    const newHidden    = new Set<number>();

    for (const dataColIdx of this.hidePriority) {
      const overflows = table.scrollWidth > availableWidth;
      const domIdx  = dataColIdx + 1;
      const headers = table.querySelectorAll<HTMLElement>('thead th');
      const th      = headers[domIdx];
      const partiallyVisible = th
        ? th.getBoundingClientRect().right > wrapperRight + 1
        : false;

      if (!overflows && !partiallyVisible) break;

      newHidden.add(dataColIdx);
      this.setColVisibility(table, dataColIdx, false);
    }

    this.currentHidden = newHidden;
    this.syncExpandButton(table, newHidden.size > 0);
  }

  private applyBreakpoints(width: number) {
    const table     = this.el.nativeElement as HTMLTableElement;
    const newHidden = this.getColsForWidth(width);
    this.currentHidden = newHidden;

    const headers   = table.querySelectorAll<HTMLElement>('thead th');
    const totalCols = headers.length; // includes rt-expand-th at 0

    for (let domIdx = 1; domIdx < totalCols; domIdx++) {
      if (this.stickyLastCol && domIdx === totalCols - 1) {
        this.setThVisibility(headers, domIdx, true);
        this.setTdVisibility(table, domIdx, true);
        continue;
      }
      const dataColIdx = domIdx - 1;
      const hide       = newHidden.has(dataColIdx);
      this.setThVisibility(headers, domIdx, !hide);
      this.setTdVisibility(table, domIdx, !hide);
    }

    this.syncExpandButton(table, newHidden.size > 0);
  }

  private getColsForWidth(width: number): Set<number> {
    if (this.breakpoints.length === 0) return new Set();
    const sorted = [...this.breakpoints].sort((a, b) => b.maxWidth - a.maxWidth);
    for (const bp of sorted) {
      if (width <= bp.maxWidth) return new Set(bp.cols);
    }
    return new Set();
  }

  private setColVisibility(table: HTMLTableElement, dataColIdx: number, visible: boolean) {
    const domIdx  = dataColIdx + 1;
    const headers = table.querySelectorAll<HTMLElement>('thead th');
    if (this.stickyLastCol && domIdx === headers.length - 1) return;
    this.setThVisibility(headers, domIdx, visible);
    this.setTdVisibility(table, domIdx, visible);
  }

  private setThVisibility(headers: NodeListOf<HTMLElement>, domIdx: number, visible: boolean) {
    if (headers[domIdx]) {
      headers[domIdx].style.display = visible ? 'table-cell' : 'none';
    }
  }

  private setTdVisibility(table: HTMLTableElement, domIdx: number, visible: boolean) {
    table.querySelectorAll<HTMLElement>('tbody tr').forEach(row => {
      const cells = row.querySelectorAll<HTMLElement>('td');
      if (cells[domIdx]) {
        cells[domIdx].style.display = visible ? 'table-cell' : 'none';
      }
    });
  }

  private showAllCols(table: HTMLTableElement) {
    const headers   = table.querySelectorAll<HTMLElement>('thead th');
    const totalCols = headers.length;
    for (let domIdx = 1; domIdx < totalCols; domIdx++) {
      if (this.stickyLastCol && domIdx === totalCols - 1) continue;
      this.setThVisibility(headers, domIdx, true);
      this.setTdVisibility(table, domIdx, true);
    }
  }
  private syncExpandButton(table: HTMLTableElement, visible: boolean) {
    table.querySelectorAll<HTMLElement>('.rt-expand-th, .rt-expand-td').forEach(el => {
      el.style.display = visible ? 'table-cell' : 'none';
    });
    if (!visible && this.overlay?.style.display === 'flex') this.closePopup();
  }

  private createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'rt-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    Object.assign(this.overlay.style, {
      display:        'none',
      position:       'fixed',
      inset:          '0',
      zIndex:         '9999',
      background:     'rgba(0,0,0,0.38)',
      alignItems:     'center',
      justifyContent: 'center',
    });

    const popup = document.createElement('div');
    popup.className = 'rt-popup';
    Object.assign(popup.style, {
      background:    '#fff',
      borderRadius:  '12px',
      border:        '0.5px solid #e0e0e0',
      width:         '360px',
      maxWidth:      '92vw',
      maxHeight:     '80vh',
      boxSizing:     'border-box',
      overflow:      'hidden',
      display:       'flex',
      flexDirection: 'column',
      fontFamily:    'inherit',
      boxShadow:     '0 8px 32px rgba(0,0,0,.18)',
    });

    const header = document.createElement('div');
    Object.assign(header.style, {
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '14px 18px 12px',
      borderBottom:   '0.5px solid #e0e0e0',
      background:     '#f8f9fa',
      flexShrink:     '0',
    });

    const title = document.createElement('p');
    title.className = 'rt-popup-title';
    Object.assign(title.style, {
      margin: '0', fontSize: '14px', fontWeight: '600', color: '#111',
    });
    title.textContent = 'Details';
    const closeBtn = document.createElement('button');
    closeBtn.type  = 'button';
    closeBtn.setAttribute('aria-label', 'Close');
    Object.assign(closeBtn.style, {
      width:          '32px',
      height:         '32px',
      borderRadius:   '50%',
      border:         'none',
      background:     '#efefef',
      cursor:         'pointer',
      display:        'inline-flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '0',
      flexShrink:     '0',
      transition:     'background 0.15s, transform 0.15s',
    });

    const ns  = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width',   '14');
    svg.setAttribute('height',  '14');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'display:block;';

    const line1 = document.createElementNS(ns, 'line');
    line1.setAttribute('x1', '4');  line1.setAttribute('y1', '4');
    line1.setAttribute('x2', '20'); line1.setAttribute('y2', '20');
    line1.setAttribute('stroke', '#444');
    line1.setAttribute('stroke-width', '2.2');
    line1.setAttribute('stroke-linecap', 'round');

    const line2 = document.createElementNS(ns, 'line');
    line2.setAttribute('x1', '20'); line2.setAttribute('y1', '4');
    line2.setAttribute('x2', '4');  line2.setAttribute('y2', '20');
    line2.setAttribute('stroke', '#444');
    line2.setAttribute('stroke-width', '2.2');
    line2.setAttribute('stroke-linecap', 'round');

    svg.appendChild(line1);
    svg.appendChild(line2);
    closeBtn.appendChild(svg);

    closeBtn.onmouseenter = () => {
      closeBtn.style.background = '#e0e0e0';
      closeBtn.style.transform  = 'scale(1.08)';
    };
    closeBtn.onmouseleave = () => {
      closeBtn.style.background = '#efefef';
      closeBtn.style.transform  = 'scale(1)';
    };
    closeBtn.onclick = () => this.closePopup();

    header.appendChild(title);
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.className = 'rt-popup-body';
    Object.assign(body.style, {
      padding:   '16px 18px',
      display:   'grid',
      gap:       '14px',
      overflowY: 'auto',
      flex:      '1',
    });

    popup.appendChild(header);
    popup.appendChild(body);
    this.overlay.appendChild(popup);
    document.body.appendChild(this.overlay);

    this.overlay.addEventListener('click', e => {
      if (e.target === this.overlay) this.closePopup();
    });

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') this.closePopup(); };
    document.addEventListener('keydown', onKey);
    this.destroyRef.onDestroy(() => document.removeEventListener('keydown', onKey));
  }

  private openPopup(row: HTMLElement, rowTitle: string) {
    const table   = this.el.nativeElement as HTMLTableElement;
    const headers = table.querySelectorAll<HTMLElement>('thead th');
    const cells   = row.querySelectorAll<HTMLElement>('td');

    const title = this.overlay.querySelector('.rt-popup-title') as HTMLElement;
    title.textContent = rowTitle || 'Details';

    const body = this.overlay.querySelector('.rt-popup-body') as HTMLElement;
    body.innerHTML = '';

    [...this.currentHidden]
      .sort((a, b) => a - b)
      .forEach(dataColIdx => {
        const domIdx = dataColIdx + 1;
        const hdr    = headers[domIdx];
        const cell   = cells[domIdx];
        if (!cell || !hdr) return;

        const labelText = hdr.textContent?.trim() || '';
        if (!labelText) return;

        const field = document.createElement('div');
        Object.assign(field.style, {
          display:       'flex',
          flexDirection: 'column',
          gap:           '4px',
          paddingBottom: '12px',
          borderBottom:  '1px dashed #f0f0f0',
        });

        const label = document.createElement('span');
        Object.assign(label.style, {
          fontSize:      '10.5px',
          color:         '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight:    '600',
        });
        label.textContent = labelText;

        const value = document.createElement('span');
        Object.assign(value.style, {
          fontSize:   '13.5px',
          color:      '#111',
          lineHeight: '1.5',
        });
        value.innerHTML = cell.innerHTML;

        field.appendChild(label);
        field.appendChild(value);
        body.appendChild(field);
      });

    this.overlay.style.display = 'flex';
  }

  private closePopup() {
    this.overlay.style.display = 'none';
    const table = this.el.nativeElement as HTMLTableElement;
    table.querySelectorAll<HTMLElement>('.rt-toggle-btn')
      .forEach(btn => this.applyBtnDefault(btn));
  }

  private createPlusIcon(): SVGSVGElement {
    const ns  = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 36 36');
    svg.setAttribute('width',   '26');
    svg.setAttribute('height',  '26');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'display:block;flex-shrink:0;';

    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', '18'); circle.setAttribute('cy', '18'); circle.setAttribute('r', '15');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'var(--color-primary, #1976d2)');
    circle.setAttribute('stroke-width', '2.2');

    const vBar = document.createElementNS(ns, 'rect');
    vBar.setAttribute('x', '16.5'); vBar.setAttribute('y', '10');
    vBar.setAttribute('width', '3'); vBar.setAttribute('height', '16');
    vBar.setAttribute('rx', '1.2');
    vBar.setAttribute('fill', 'var(--color-primary, #1976d2)');

    const hBar = document.createElementNS(ns, 'rect');
    hBar.setAttribute('x', '10'); hBar.setAttribute('y', '16.5');
    hBar.setAttribute('width', '16'); hBar.setAttribute('height', '3');
    hBar.setAttribute('rx', '1.2');
    hBar.setAttribute('fill', 'var(--color-primary, #1976d2)');

    svg.appendChild(circle);
    svg.appendChild(vBar);
    svg.appendChild(hBar);
    return svg;
  }

  private applyBtnDefault(btn: HTMLElement) {
    btn.style.opacity   = '0.5';
    btn.style.transform = 'scale(1)';
  }

  private applyBtnActive(btn: HTMLElement) {
    btn.style.opacity   = '1';
    btn.style.transform = 'scale(1.12)';
  }

  private addExpandButtons() {
    const table = this.el.nativeElement as HTMLTableElement;
    if (!table.querySelector('.rt-expand-th')) {
      const thead = table.querySelector('thead tr');
      if (thead) {
        const th = document.createElement('th');
        th.className     = 'rt-expand-th';
        th.style.cssText = 'width:40px;min-width:40px;padding:4px;text-align:center;display:none;';
        thead.prepend(th);
      }
    }

    table.querySelectorAll('tbody tr').forEach(row => {
      if ((row as HTMLElement).querySelector('.rt-expand-td')) return;

      const tds      = (row as HTMLElement).querySelectorAll('td');
      const rowLabel = tds[0]?.textContent?.trim() || 'Row details';

      const td = document.createElement('td');
      td.className     = 'rt-expand-td';
      td.style.cssText = 'width:40px;min-width:40px;text-align:center;padding:4px;vertical-align:middle;display:none;';

      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'rt-toggle-btn';
      btn.setAttribute('aria-label', `View details for ${rowLabel}`);
      btn.style.cssText = [
        'border:none',
        'background:transparent',
        'cursor:pointer',
        'padding:0',
        'display:inline-flex',
        'align-items:center',
        'justify-content:center',
        'opacity:0.5',
        'transition:opacity 0.15s,transform 0.15s',
      ].join(';');

      btn.appendChild(this.createPlusIcon());

      btn.onmouseenter = () => {
        if (btn.style.transform !== 'scale(1.12)') btn.style.opacity = '0.8';
      };
      btn.onmouseleave = () => {
        if (btn.style.transform !== 'scale(1.12)') btn.style.opacity = '0.5';
      };

      btn.onclick = () => {
        const isOpen    = this.overlay.style.display === 'flex';
        const isThisBtn = btn.style.transform === 'scale(1.12)';

        table.querySelectorAll<HTMLElement>('.rt-toggle-btn')
          .forEach(b => this.applyBtnDefault(b));
        this.overlay.style.display = 'none';

        if (!isOpen || !isThisBtn) {
          this.applyBtnActive(btn);
          this.openPopup(row as HTMLElement, rowLabel);
        }
      };

      td.appendChild(btn);
      (row as HTMLElement).prepend(td); 
    });
  }
}