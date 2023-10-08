import { alpha } from '@mui/material/styles';

// -----------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: alpha('#6050db', 0.08),
  light: '#8e83e5',
  main: '#7573ff',
  dark: '#6150e7',
  darker: '#2c1abb',
};
const SECONDARY = {
  lighter: alpha('#05ebe2', 0.08),
  light: '#78fcf7',
  main: '#05ebe2',
  dark: '#04c8c0',
  darker: '#026460',
};
const INFO = {
  lighter: alpha('#338eff', 0.08),
  light: '#338eff',
  main: '#338eff',
  dark: '#006ffa',
  darker: '#0056c2',
};
const SUCCESS = {
  lighter: alpha('#07f2cb', 0.08),
  light: '#51fade',
  main: '#00e0bb',
  dark: '#06caaa',
  darker: '#05a388',
};
const WARNING = {
  lighter: alpha('#ffe874', 0.08),
  light: '#ffcf7b',
  main: '#ffe874',
  dark: '#ffa300',
  darker: '#d68900',
};
const ERROR = {
  lighter: alpha('#f73365', 0.08),
  light: '#fa82a0',
  main: '#f73365',
  dark: '#f50c47',
  darker: '#d0083b',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F7F8FA',
  200: '#EBEDF2',
  300: '#D3D6E1',
  400: '#B8BCCE',
  500: '#667096',
  600: '#41475F',
  700: '#2F3344',
  800: '#1C1E28',
  900: '#090A0D',
  500_8: alpha('#9DA3BB', 0.08),
  500_12: alpha('#9DA3BB', 0.12),
  500_16: alpha('#9DA3BB', 0.16),
  500_24: alpha('#9DA3BB', 0.24),
  500_32: alpha('#9DA3BB', 0.32),
  500_48: alpha('#9DA3BB', 0.48),
  500_56: alpha('#9DA3BB', 0.56),
  500_80: alpha('#9DA3BB', 0.8),
};

const GREY_DARK = {
  0: '#232a3a',
  100: '#404d6a',
  200: '#49587a',
  300: '#53648a',
  400: '#5d6f99',
  500: '#7b8aae',
  600: '#8a98b8',
  700: '#d7e6f8',
  800: '#e8f1fb',
  900: '#f9fcfe',
  500_8: alpha('#7b8aae', 0.08),
  500_12: alpha('#7b8aae', 0.12),
  500_16: alpha('#7b8aae', 0.16),
  500_24: alpha('#7b8aae', 0.24),
  500_32: alpha('#7b8aae', 0.32),
  500_48: alpha('#7b8aae', 0.48),
  500_56: alpha('#7b8aae', 0.56),
  500_80: alpha('#7b8aae', 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },

  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    grey: GREY,
    text: { primary: GREY[800], secondary: GREY[500], disabled: GREY[400] },
    background: { paper: GREY[0], default: GREY[100], neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    grey: GREY_DARK,
    text: { primary: GREY_DARK[900], secondary: GREY_DARK[600], disabled: GREY_DARK[500] },
    background: { paper: GREY_DARK[0], default: GREY_DARK[0], neutral: GREY_DARK[200] },
    action: { active: GREY_DARK[600], ...COMMON.action },
  },
};

export default palette;
