import { Injectable, signal } from '@angular/core';

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  iconColor: string;
  headingColor: string;
  isDarkMode: boolean;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: number;
  shadowStrength: number;
  borderRadius: number;
  buttonRadius: number;
  layoutMode: string;
  menuFont: string;
  headingFont: string;
  numberFont: string;
  otherFont: string;
  sidebarBg: string | null;
  profilePhoto: string | null;
   containerMode: 'fluid' | 'fixed'; 
}

const DEFAULT_SETTINGS: ThemeSettings = {
  primaryColor: '#0085db',
  secondaryColor: '#fa896b',
  iconColor: '#64748b',
  headingColor: '#000000',
  isDarkMode: false,
  fontFamily: 'Plus Jakarta Sans',
  fontSize: '22',
  fontWeight: '600',
  lineHeight: 1.6,
  shadowStrength: 15,
  borderRadius: 8,
  buttonRadius: 8,
  layoutMode: 'vertical',
  menuFont: 'Plus Jakarta Sans',
  headingFont: 'Plus Jakarta Sans',
  numberFont: 'Plus Jakarta Sans',
  otherFont: 'Plus Jakarta Sans',
  sidebarBg: null,
  profilePhoto: null,
  containerMode: 'fluid',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private STORAGE_KEY = 'app-theme';
  private FONTS_KEY = 'app-fonts';
  private SIDEBAR_BG_KEY = 'sidebar-bg';
  private LAYOUT_KEY = 'layoutMode';


  currentSettings = signal<ThemeSettings>(this.loadTheme());


  
  loadTheme(): ThemeSettings {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  saveTheme(settings: ThemeSettings): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    localStorage.setItem(this.LAYOUT_KEY, settings.layoutMode);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    this.currentSettings.set(settings);  
    if (settings.sidebarBg) {
      localStorage.setItem(this.SIDEBAR_BG_KEY, settings.sidebarBg);
    } else {
      localStorage.removeItem(this.SIDEBAR_BG_KEY);
    }
    const fonts = {
      menuFont: settings.menuFont,
      headingFont: settings.headingFont,
      numberFont: settings.numberFont,
      otherFont: settings.otherFont,
    };
    localStorage.setItem(this.FONTS_KEY, JSON.stringify(fonts));
    localStorage.setItem('font-size-base', settings.fontSize);
    localStorage.setItem('font-weight-base', settings.fontWeight);
    localStorage.setItem('line-height-base', settings.lineHeight.toString());
  }

  resetTheme(): void {
    [
      this.STORAGE_KEY,
      this.SIDEBAR_BG_KEY,
      this.LAYOUT_KEY,
      this.FONTS_KEY,
      'custom-primary-colors',
      'custom-secondary-colors',
      'custom-icon-colors',
      'custom-heading-colors',
      'font-size-base',
      'font-weight-base',
      'line-height-base',
    ].forEach(k => localStorage.removeItem(k));
  }

  applyTheme(settings: ThemeSettings): void {
    const root = document.documentElement;

    const hexToRgb = (hex: string): string => {
      const clean = hex.replace('#', '');
      const bigint = parseInt(clean, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    };

    root.style.setProperty('--primary', settings.primaryColor);
    root.style.setProperty('--color-primary', settings.primaryColor);
    root.style.setProperty('--primary-rgb', hexToRgb(settings.primaryColor));
    root.style.setProperty('--secondary', settings.secondaryColor);
    root.style.setProperty('--icon-color', settings.iconColor);
    root.style.setProperty('--heading-color', settings.headingColor);
    root.style.setProperty('--font-family', settings.fontFamily);
    root.style.setProperty('--font-size-base', `${settings.fontSize}px`);
    root.style.setProperty('--font-weight-base', settings.fontWeight);
    root.style.setProperty('--line-height-base', settings.lineHeight.toString());
    root.style.setProperty('--shadow-strength', (settings.shadowStrength / 100).toFixed(2));
    root.style.setProperty('--radius', `${settings.borderRadius}px`);
    root.style.setProperty('--btn-radius', `${settings.buttonRadius}px`);
    root.style.setProperty('--font-menu', settings.menuFont);
    root.style.setProperty('--font-heading', settings.headingFont);
    root.style.setProperty('--font-number', settings.numberFont);
    root.style.setProperty('--font-other', settings.otherFont);

    // Dark / light mode
    document.body.classList.toggle('dark-theme', settings.isDarkMode);
  document.documentElement.setAttribute('data-container', settings.containerMode);

    // Layout
    document.documentElement.setAttribute('data-layout', settings.layoutMode);
    document.body.classList.toggle('layout-horizontal', settings.layoutMode === 'horizontal');
    document.body.classList.toggle('layout-vertical', settings.layoutMode === 'vertical');

    // Sidebar background
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null;
    if (sidebar) {
      if (settings.sidebarBg) {
        sidebar.style.backgroundImage = `url('${settings.sidebarBg}')`;
        sidebar.style.backgroundSize = 'cover';
        sidebar.style.backgroundPosition = 'center';
      } else {
        sidebar.style.removeProperty('background-image');
        sidebar.style.removeProperty('background-size');
        sidebar.style.removeProperty('background-position');
      }
    }

    // Profile photo
    if (settings.profilePhoto) {
      document.querySelectorAll<HTMLImageElement>('img.profile-avatar').forEach(img => {
        img.src = settings.profilePhoto!;
      });
    }
  }

  loadCustomColors(key: string): string[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveCustomColors(key: string, colors: string[]): void {
    localStorage.setItem(key, JSON.stringify(colors));
  }

  getDefaultSettings(): ThemeSettings {
    return { ...DEFAULT_SETTINGS };
  }
}
