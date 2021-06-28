const shadows = { default: '0px 2px 10px rgba(0, 0, 0, 0.15)' };

export const theme = {
  gridUnit: 5,
  colors: {
    primary: '#006eff',
    secondary: '#ac6363',
    grey: '#e3e3e3',
    orange: '#e8833a',
    white: '#ffffff',
    lightGreen: '#85de8a'
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
