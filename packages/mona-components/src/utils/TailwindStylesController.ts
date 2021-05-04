import { ReactiveController, LitElement } from 'lit';
import { create, TW } from 'twind';
import { domSheet } from 'twind/sheets';

const theme = {
  extend: {
    fontFamily: {
      feature: [
        'DIN',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    fontSize: {
      '2.5xl': ['1.75rem', '2rem'] as [size: string, lineHeight: string],
      'heading-1': ['2.0625rem', '2.5rem'] as [
        size: string,
        lineHeight: string,
      ],
      'heading-1-big': ['3.25rem', '3.5rem'] as [
        size: string,
        lineHeight: string,
      ],
      'heading-2': ['1.75rem', '2.5rem'] as [size: string, lineHeight: string],
      'heading-2-big': ['2.375rem', '3rem'] as [
        size: string,
        lineHeight: string,
      ],
      'heading-3': ['1.4375rem', '2rem'] as [size: string, lineHeight: string],
      'heading-3-big': ['1.75rem', '2rem'] as [
        size: string,
        lineHeight: string,
      ],
      'heading-4': ['1.1875rem', '1.5rem'] as [
        size: string,
        lineHeight: string,
      ],
      'heading-4-big': ['1.3125rem', '1.5rem'] as [
        size: string,
        lineHeight: string,
      ],
      'heading-5': ['1rem', '1.5rem'] as [size: string, lineHeight: string],
      'heading-5-big': ['1rem', '1.5rem'] as [size: string, lineHeight: string],
      'heading-6': ['1.1875rem', '1.5rem'] as [
        size: string,
        lineHeight: string,
      ],
      'heading-6-big': ['1.1875rem', '1.5rem'] as [
        size: string,
        lineHeight: string,
      ],
    },
    letterSpacing: {
      heading: '-.03em',
    },
    colors: {
      primary: '#e62e43',
      'primary-dark': '#d90432',
      'primary-darker': '#a60024',
      accent: '#2e92e9',
      'accent-dark': '#1378d1',
      'accent-darker': '#004887',
      'highlight-1': '#5e50a1',
      'highlight-1-dark': '#4e3c9e',
      'highlight-1-darker': '#312669',
      'highlight-2': '#596dd4',
      'highlight-2-dark': '#4054b8',
      'highlight-2-darker': '#2b3c8f',
      'highlight-3': '#009e8c',
      'highlight-3-dark': '#008575',
      'highlight-3-darker': '#00665a',
      'highlight-4': '#009fab',
      'highlight-4-dark': '#00838c',
      'highlight-4-darker': '#00666e',
      'neutral-1': '#fafbfc',
      'neutral-2': '#f2f4f7',
      'neutral-3': '#e6e9f0',
      'neutral-4': '#d8dbe3',
      'neutral-5': '#111826',
      'neutral-6': '#585D67',
      'neutral-7': '#8c92a1',
      alert: '#e01049',
      'alert-light': '#fae9ed',
      success: '#00a66f',
      'success-light': '#e5f6f1',
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    maxWidth: {
      tooltip: '18rem',
      'screen-sm': '540px',
      'screen-md': '720px',
      'screen-lg': '960px',
      'screen-xl': '1140px',
    },
  },
};

export class TailwindStylesController implements ReactiveController {
  host: LitElement;

  readonly tw: TW;

  private __styleElement: HTMLStyleElement;

  private __insertStyle: boolean = true;

  constructor(host: LitElement) {
    this.host = host;
    host.addController(this);

    this.__styleElement = document.createElement('style');

    const sheet = domSheet({ target: this.__styleElement });
    const { tw } = create({
      sheet,
      theme,
    });
    this.tw = tw;
  }

  private __getSlotNamed(name: string) {
    return Array.from(this.host.children).find((child) => child.slot === name);
  }

  hostUpdated() {
    if (this.__insertStyle === true) {
      this.__insertStyle = false;

      this.host.renderRoot.appendChild(this.__styleElement);
    }
  }
}
