const shadows = {
  medium: `
    shadow-color: #34485b;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.3;
    shadow-radius: 3px;
    elevation: 5;
    `
};

export const theme = {
  gridUnit: 5,
  colors: {
    primary: '#6558f5',
    secondary: '#ac6363',
    lightRed: '#e9a2ad',
    darkRed: '#d3455b',
    mint: '#8ed7cf',
    darkMint: '#1cae9f',
    orange: '#e8833a',
    white: '#ffffff'
  },
  fontSizes: {
    tiny: 10,
    small: 12,
    medium: 14,
    large: 16,
    big: 18
  },
  shadows
};

export type Theme = typeof theme;
