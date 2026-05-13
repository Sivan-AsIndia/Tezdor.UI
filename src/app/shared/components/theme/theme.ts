import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarManager } from '../../../core/services/sidebar';
import { ThemeService, ThemeSettings } from '../../../core/services/theme';

interface FontOption {
  name: string;
  value: string;
}

interface WeightOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-theme',
  templateUrl: './theme.html',
  imports: [CommonModule],
})
export class ThemeComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  primaryColor   = '#0085db';
  secondaryColor = '#051a2c';
  iconColor      = '#64748b';
  headingColor   = '#000000';
  isDarkMode = false;
  layoutMode = 'box';
  selectedMenuFont    = 'Plus Jakarta Sans';
  selectedHeadingFont = 'Plus Jakarta Sans';
  selectedNumberFont  = 'Plus Jakarta Sans';
  selectedOtherFont   = 'Plus Jakarta Sans';
  selectedFontSize    = '22px';
  selectedFontWeight  = '600';
  selectedLineHeight  = 1.6;
  shadowLevel       = 15;
  borderRadiusLevel = 8;
  buttonRadiusLevel = 8;
  selectedBg: string | null           = null;
  selectedProfilePhoto: string | null = null;
containerMode: 'fluid' | 'fixed' = 'fluid'; 
  openSections: Record<string, boolean> = {
    themeColors:     true,
    secondaryColors: true,
    layout:          true,
    fontFamily:      true,
    fontSizeStyle:   true,
    themeMode:       true,
    sidebarBg:       true,
    iconColors:      true,
    headingColors:   true,
    shadowRadius:    true,
    profileImage:    true,
     container:       true, 
  };

  defaultPrimaryPresets   = ['#0085db', '#f97316', '#ef4444', '#8b5cf6', '#10b981', '#fb3cf9'];
  defaultSecondaryPresets = ['#fa896b', '#305faa', '#31f3c2', '#9ac500', '#bd0068', '#00bebe'];
  defaultIconPresets      = ['#64748b', '#f97316', '#ef4444', '#8b5cf6', '#10b981', '#fb3cf9'];
  defaultHeadingPresets   = ['#00af43', '#ff27a5', '#c2a500', '#b8530b', '#ef4444', '#8b5cf6'];

  primaryPresets:   string[] = [];
  secondaryPresets: string[] = [];
  iconPresets:      string[] = [];
  headingPresets:   string[] = [];

  fonts: FontOption[] = [
    { name: 'Inter',       value: 'Inter, sans-serif' },
    { name: 'Roboto',      value: 'Roboto, sans-serif' },
    { name: 'Poppins',     value: 'Poppins, sans-serif' },
    { name: 'Nunito',      value: 'Nunito, sans-serif' },
    { name: 'Georgia',     value: 'Georgia, serif' },
    { name: 'Times',       value: 'Times New Roman, serif' },
    { name: 'Courier',     value: 'Courier New, monospace' },
    { name: 'Montserrat',  value: 'Montserrat, sans-serif' },
    { name: 'Lato',        value: 'Lato, sans-serif' },
    { name: 'Open Sans',   value: 'Open Sans, sans-serif' },
    { name: 'Raleway',     value: 'Raleway, sans-serif' },
    { name: 'Plus',        value: 'Plus Jakarta Sans'},

  ];

headingFontSizes = [20, 22, 24, 26, 28, 30, 32];
otherFontSizes   = [12, 13, 14, 15, 16, 18];

selectedHeadingFontSize = '22';
selectedOtherFontSize   = '14';

  fontWeights: WeightOption[] = [
    { label: 'Light',   value: '300' },
    { label: 'Regular', value: '400' },
    { label: 'Medium',  value: '500' },
    { label: 'Bold',    value: '600' },
    { label: 'Bolder',  value: '700' },
  ];

  backgrounds = [
    'https://dreamspos.dreamstechnologies.com/html/template/assets/img/theme/bg-01.jpg',
    'https://dreamspos.dreamstechnologies.com/html/template/assets/img/theme/bg-02.jpg',
    'https://dreamspos.dreamstechnologies.com/html/template/assets/img/theme/bg-03.jpg',
    'https://dreamspos.dreamstechnologies.com/html/template/assets/img/theme/bg-04.jpg',
    'https://dreamspos.dreamstechnologies.com/html/template/assets/img/theme/bg-05.jpg',
    'https://dreamspos.dreamstechnologies.com/html/template/assets/img/theme/bg-06.jpg',
  ];

  profileImages = Array.from({ length: 10 }, (_, i) =>
    `https://picsum.photos/seed/user${i + 1}/100/100`
  );

  public sidebarService = inject(SidebarManager);
  public themeService   = inject(ThemeService);



  ngOnInit(): void {
    this.loadSavedTheme();
  }

  // ── Load ─────────────────────────────────────────
  private loadSavedTheme(): void {
    this.primaryPresets = [
      ...this.defaultPrimaryPresets,
      ...this.themeService.loadCustomColors('custom-primary-colors')
        .filter(c => !this.defaultPrimaryPresets.map(x => x.toLowerCase()).includes(c.toLowerCase())),
    ];
    this.secondaryPresets = [
      ...this.defaultSecondaryPresets,
      ...this.themeService.loadCustomColors('custom-secondary-colors')
        .filter(c => !this.defaultSecondaryPresets.map(x => x.toLowerCase()).includes(c.toLowerCase())),
    ];
    this.iconPresets = [
      ...this.defaultIconPresets,
      ...this.themeService.loadCustomColors('custom-icon-colors')
        .filter(c => !this.defaultIconPresets.map(x => x.toLowerCase()).includes(c.toLowerCase())),
    ];
    this.headingPresets = [
      ...this.defaultHeadingPresets,
      ...this.themeService.loadCustomColors('custom-heading-colors')
        .filter(c => !this.defaultHeadingPresets.map(x => x.toLowerCase()).includes(c.toLowerCase())),
    ];

    const saved = this.themeService.loadTheme();
    this.applyFromSettings(saved);
  }

  private applyFromSettings(s: ThemeSettings): void {
    this.primaryColor         = s.primaryColor;
    this.secondaryColor       = s.secondaryColor;
    this.iconColor            = s.iconColor;
    this.headingColor         = s.headingColor;
    this.isDarkMode           = s.isDarkMode;
    this.layoutMode           = s.layoutMode;
    this.selectedFontSize     = s.fontSize;
    this.selectedFontWeight   = s.fontWeight;
    this.selectedLineHeight   = s.lineHeight;
    this.shadowLevel          = s.shadowStrength;
    this.borderRadiusLevel    = s.borderRadius;
    this.buttonRadiusLevel    = s.buttonRadius;
    this.selectedMenuFont     = s.menuFont;
    this.selectedHeadingFont  = s.headingFont;
    this.selectedNumberFont   = s.numberFont;
    this.selectedOtherFont    = s.otherFont;
    this.selectedBg           = s.sidebarBg;
    this.selectedProfilePhoto = s.profilePhoto;
      this.containerMode = s.containerMode ?? 'fluid'; 
        this.selectedHeadingFontSize = s.headingFontSize ?? '22';
  this.selectedOtherFontSize   = s.otherFontSize   ?? '14';
  }

  toggleSection(key: string): void {
    this.openSections[key] = !this.openSections[key];
  }

  setPrimaryPreset(color: string): void {
    this.primaryColor = color.toLowerCase();
    document.documentElement.style.setProperty('--primary', this.primaryColor);
    document.documentElement.style.setProperty('--color-primary', this.primaryColor);
    document.documentElement.style.setProperty('--primary-rgb', this.hexToRgb(this.primaryColor));
  }

  onPrimaryInput(event: Event): void {
    this.primaryColor = (event.target as HTMLInputElement).value.toLowerCase();
    document.documentElement.style.setProperty('--primary', this.primaryColor);
    document.documentElement.style.setProperty('--color-primary', this.primaryColor);
    document.documentElement.style.setProperty('--primary-rgb', this.hexToRgb(this.primaryColor));
  }

  get isCustomPrimary(): boolean {
    return !!this.primaryColor &&
      !this.primaryPresets.map(c => c.toLowerCase()).includes(this.primaryColor.toLowerCase());
  }

setContainerMode(mode: 'fluid' | 'fixed'): void {
  this.containerMode = mode;                
  this.themeService.containerMode.set(mode); 
}


private applyContainerMode(mode: 'fluid' | 'fixed'): void {
  document.documentElement.setAttribute('data-container', mode);
  document.querySelectorAll<HTMLElement>('.body-wrapper > div').forEach(el => {
    el.className = mode === 'fluid' ? 'container-fluid' : 'container';
  });
}
  setSecondaryPreset(color: string): void {
    this.secondaryColor = color.toLowerCase();
    document.documentElement.style.setProperty('--secondary', this.secondaryColor);
  }

  onSecondaryInput(event: Event): void {
    this.secondaryColor = (event.target as HTMLInputElement).value.toLowerCase();
    document.documentElement.style.setProperty('--secondary', this.secondaryColor);
  }

  get isCustomSecondary(): boolean {
    return !!this.secondaryColor &&
      !this.secondaryPresets.map(c => c.toLowerCase()).includes(this.secondaryColor.toLowerCase());
  }

  // ── Icon Color ───────────────────────────────────
setIconPreset(color: string): void {
  this.iconColor = color.toLowerCase();
  document.documentElement.style.setProperty('--icon-color', this.iconColor);
  const theme = this.themeService.loadTheme();
  theme.iconColor = this.iconColor;
  // this.themeService.saveTheme(theme);
}
  onIconInput(event: Event): void {
    this.iconColor = (event.target as HTMLInputElement).value.toLowerCase();
    document.documentElement.style.setProperty('--icon-color', this.iconColor);
  }

  get isCustomIcon(): boolean {
    return !!this.iconColor &&
      !this.iconPresets.map(c => c.toLowerCase()).includes(this.iconColor.toLowerCase());
  }

  // ── Heading Color ────────────────────────────────
 setHeadingPreset(color: string): void {
  this.headingColor = color.toLowerCase();
  document.documentElement.style.setProperty('--heading-color', this.headingColor);
  const theme = this.themeService.loadTheme();
  theme.headingColor = this.headingColor;
}

  onHeadingInput(event: Event): void {
    this.headingColor = (event.target as HTMLInputElement).value.toLowerCase();
    document.documentElement.style.setProperty('--heading-color', this.headingColor);
  }

  get isCustomHeading(): boolean {
    return !!this.headingColor &&
      !this.headingPresets.map(c => c.toLowerCase()).includes(this.headingColor.toLowerCase());
  }

  // ── Layout ───────────────────────────────────────
  selectLayout(mode: string): void {
    this.layoutMode = mode;
    document.documentElement.setAttribute('data-layout', mode);
    document.body.classList.toggle('layout-horizontal', mode === 'fluid');
    document.body.classList.toggle('layout-vertical',   mode === 'box');
  }

  // ── Theme Mode ───────────────────────────────────
setThemeMode(dark: boolean): void {
  this.isDarkMode = dark;

  const html = document.documentElement;
  html.classList.toggle('dark-theme', dark);

  html.setAttribute('data-bs-theme', dark ? 'dark' : 'light');

}
  // ── Font ─────────────────────────────────────────
  setFont(type: 'menu' | 'heading' | 'number' | 'other', value: string): void {
    const map: Record<string, string> = {
      menu:    '--font-menu',
      heading: '--font-heading',
      number:  '--font-number',
      other:   '--font-other',
    };
    switch (type) {
      case 'menu':    this.selectedMenuFont    = value; break;
      case 'heading': this.selectedHeadingFont = value; break;
      case 'number':  this.selectedNumberFont  = value; break;
      case 'other':   this.selectedOtherFont   = value; break;
    }
    document.documentElement.style.setProperty(map[type], value);
  }

setHeadingFontSize(size: number): void {
  this.selectedHeadingFontSize = size.toString();
  document.documentElement.style.setProperty('--font-size-heading', `${size}px`);
  localStorage.setItem('font-size-heading', size.toString()); 
}

setOtherFontSize(size: number): void {
  this.selectedOtherFontSize = size.toString();
  document.documentElement.style.setProperty('--font-size-other', `${size}px`);
  localStorage.setItem('font-size-other', size.toString()); 
}
  setFontWeight(w: string): void {
    this.selectedFontWeight = w;
    document.documentElement.style.setProperty('--font-weight-base', w);
  }

  onLineHeightInput(event: Event): void {
    this.selectedLineHeight = parseFloat((event.target as HTMLInputElement).value);
    document.documentElement.style.setProperty('--line-height-base', this.selectedLineHeight.toString());
  }

  // ── Shadow ───────────────────────────────────────
  onShadowInput(event: Event): void {
    this.shadowLevel = parseInt((event.target as HTMLInputElement).value);
    const strength = (this.shadowLevel / 100).toFixed(2);
    document.documentElement.style.setProperty('--shadow-strength', strength);
  }

  // ── Radius ───────────────────────────────────────
  onBorderRadiusInput(event: Event): void {
    this.borderRadiusLevel = parseInt((event.target as HTMLInputElement).value);
    document.documentElement.style.setProperty('--radius', `${this.borderRadiusLevel}px`);
  }

  onButtonRadiusInput(event: Event): void {
    this.buttonRadiusLevel = parseInt((event.target as HTMLInputElement).value);
    document.documentElement.style.setProperty('--btn-radius', `${this.buttonRadiusLevel}px`);
  }

  // ── Sidebar BG ───────────────────────────────────
  selectBg(bg: string | null): void {
    this.selectedBg = bg;
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null;
    if (sidebar) {
      if (bg) {
        sidebar.style.backgroundImage    = `url('${bg}')`;
        sidebar.style.backgroundSize     = 'cover';
        sidebar.style.backgroundPosition = 'center';
      } else {
        sidebar.style.removeProperty('background-image');
        sidebar.style.removeProperty('background-size');
        sidebar.style.removeProperty('background-position');
      }
    }
  }

  // ── Profile Image ────────────────────────────────
  selectProfile(url: string): void {
    this.selectedProfilePhoto = url;
    document.querySelectorAll<HTMLImageElement>('img.profile-avatar').forEach(img => {
      img.src = url;
    });
  }

  // ── Validation ───────────────────────────────────
  private validateColors(): string | null {
    const colors    = [this.primaryColor, this.secondaryColor, this.headingColor, this.iconColor];
    const hexRegex  = /^#([0-9A-Fa-f]{6})$/;
    if (colors.some(c => !c || !c.trim()))         return 'Color cannot be empty.';
    if (colors.some(c => !hexRegex.test(c)))       return 'Invalid color format. Use 6-digit hex (e.g. #FF5733).';
    if (!this.isDarkMode && colors.some(c => c.toLowerCase() === '#ffffff')) {
      return 'In light theme, white should not be used for content colors.';
    }
    if (this.isDarkMode && colors.some(c => c.toLowerCase() === '#000000')) {
      return 'In dark mode, heading and icon colors cannot be black.';
    }
    return null;
  }

  // ── Build Settings Object ─────────────────────────
  private buildSettings(): ThemeSettings {
    return {
      primaryColor:   this.primaryColor,
      secondaryColor: this.secondaryColor,
      iconColor:      this.iconColor,
      headingColor:   this.headingColor,
      isDarkMode:     this.isDarkMode,
      fontFamily:     this.selectedMenuFont,
      fontSize:       this.selectedFontSize,
      fontWeight:     this.selectedFontWeight,
      lineHeight:     this.selectedLineHeight,
      shadowStrength: this.shadowLevel,
      borderRadius:   this.borderRadiusLevel,
      buttonRadius:   this.buttonRadiusLevel,
      layoutMode:     this.layoutMode,
      menuFont:       this.selectedMenuFont,
      headingFont:    this.selectedHeadingFont,
      numberFont:     this.selectedNumberFont,
      otherFont:      this.selectedOtherFont,
      sidebarBg:      this.selectedBg,
      profilePhoto:   this.selectedProfilePhoto,
      containerMode :this.containerMode,
         headingFontSize: this.selectedHeadingFontSize,
    otherFontSize:   this.selectedOtherFontSize,
    };
  } 

  // ── Save ─────────────────────────────────────────
  saveTheme(): void {
  

    const settings = this.buildSettings();
    this.themeService.saveTheme(settings);
    this.themeService.applyTheme(settings);

    // Save custom colors
    this.saveCustomColor('custom-primary-colors',   this.primaryColor,   this.defaultPrimaryPresets,   this.primaryPresets);
    this.saveCustomColor('custom-secondary-colors', this.secondaryColor, this.defaultSecondaryPresets, this.secondaryPresets);
    this.saveCustomColor('custom-icon-colors',      this.iconColor,      this.defaultIconPresets,      this.iconPresets);
    this.saveCustomColor('custom-heading-colors',   this.headingColor,   this.defaultHeadingPresets,   this.headingPresets);

    this.closeOffcanvas();
    this.closed.emit();
  }

  private saveCustomColor(key: string, color: string, defaults: string[], presets: string[]): void {
    const lc        = color.toLowerCase();
    const defaultsLc = defaults.map(c => c.toLowerCase());
    const presetsLc  = presets.map(c => c.toLowerCase());
    if (!defaultsLc.includes(lc) && !presetsLc.includes(lc)) {
      presets.push(color);
      const custom = presets.filter(c => !defaultsLc.includes(c.toLowerCase()));
      this.themeService.saveCustomColors(key, custom);
    }
  }

  // ── Reset ────────────────────────────────────────
  resetTheme(): void {

    this.themeService.resetTheme();
    const def = this.themeService.getDefaultSettings();
    this.applyFromSettings(def);

    this.primaryPresets   = [...this.defaultPrimaryPresets];
    this.secondaryPresets = [...this.defaultSecondaryPresets];
    this.iconPresets      = [...this.defaultIconPresets];
    this.headingPresets   = [...this.defaultHeadingPresets];

    this.themeService.applyTheme(def);
  
  }

  // ── Close ─────────────────────────────────────────
  closePanel(): void {
    this.closeOffcanvas();
    this.closed.emit();
  }

  private closeOffcanvas(): void {
    const offcanvasEl = document.getElementById('offcanvasExample');
    if (offcanvasEl && (window as any).bootstrap?.Offcanvas) {
      const instance =
        (window as any).bootstrap.Offcanvas.getInstance(offcanvasEl) ??
        new (window as any).bootstrap.Offcanvas(offcanvasEl);
      instance.hide();
    }
  }

  // ── Utils ─────────────────────────────────────────
  getLineHeightLabel(): string {
    if (this.selectedLineHeight <= 1.3) return 'Tight';
    if (this.selectedLineHeight <= 1.8) return 'Normal';
    return 'Loose';
  }

  private hexToRgb(hex: string): string {
    const clean   = hex.replace('#', '');
    const bigint  = parseInt(clean, 16);
    const r       = (bigint >> 16) & 255;
    const g       = (bigint >> 8)  & 255;
    const b       = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }
}
