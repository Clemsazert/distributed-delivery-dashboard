const shadows = { default: '0px 2px 10px rgba(0, 0, 0, 0.15)' };

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
    small: 14,
    medium: 16,
    large: 20,
    big: 24
  },
  shadows
};

export type Theme = typeof theme;
