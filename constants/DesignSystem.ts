/**
 * TurnedOff Design System
 * Sophisticated gray-toned design system with modern aesthetics
 */

// ============================================================================
// COLOR PALETTE - Gray Spectrum
// ============================================================================

export const Colors = {
  // Base Grays - Neutral Foundation
  gray: {
    50: '#FAFAFA',   // Lightest - Backgrounds
    100: '#F5F5F5',  // Very Light - Subtle backgrounds
    200: '#EEEEEE',  // Light - Borders, dividers
    300: '#E0E0E0',  // Light Medium - Disabled states
    400: '#BDBDBD',  // Medium - Placeholders
    500: '#9E9E9E',  // True Gray - Secondary text
    600: '#757575',  // Medium Dark - Body text
    700: '#616161',  // Dark - Headings
    800: '#424242',  // Very Dark - Primary text
    900: '#212121',  // Darkest - Emphasis
  },

  // Warm Grays - Sophisticated warmth
  warmGray: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },

  // Cool Grays - Clean, modern feel
  coolGray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Slate Grays - Professional depth
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Accent Colors - Subtle highlights
  accent: {
    primary: '#64748B',      // Slate 500 - Primary actions
    secondary: '#78716C',    // Warm Gray 500 - Secondary actions
    success: '#6B7280',      // Cool Gray 500 - Success states
    warning: '#A8A29E',      // Warm Gray 400 - Warnings
    error: '#757575',        // Gray 600 - Errors
    info: '#94A3B8',         // Slate 400 - Information
  },

  // Semantic Colors
  semantic: {
    background: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      tertiary: '#F5F5F5',
      elevated: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
      tertiary: '#9E9E9E',
      disabled: '#BDBDBD',
      inverse: '#FFFFFF',
    },
    border: {
      subtle: '#F5F5F5',
      default: '#EEEEEE',
      medium: '#E0E0E0',
      strong: '#BDBDBD',
    },
    interactive: {
      default: '#64748B',
      hover: '#475569',
      active: '#334155',
      disabled: '#E0E0E0',
      focus: '#64748B',
    },
  },

  // Dark Mode
  dark: {
    gray: {
      50: '#212121',
      100: '#2C2C2C',
      200: '#363636',
      300: '#424242',
      400: '#525252',
      500: '#6B6B6B',
      600: '#9E9E9E',
      700: '#BDBDBD',
      800: '#E0E0E0',
      900: '#F5F5F5',
    },
    semantic: {
      background: {
        primary: '#121212',
        secondary: '#1E1E1E',
        tertiary: '#2C2C2C',
        elevated: '#2C2C2C',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      text: {
        primary: '#F5F5F5',
        secondary: '#BDBDBD',
        tertiary: '#9E9E9E',
        disabled: '#616161',
        inverse: '#212121',
      },
      border: {
        subtle: '#2C2C2C',
        default: '#363636',
        medium: '#424242',
        strong: '#525252',
      },
      interactive: {
        default: '#94A3B8',
        hover: '#CBD5E1',
        active: '#E2E8F0',
        disabled: '#424242',
        focus: '#94A3B8',
      },
    },
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const Typography = {
  // Font Families
  fontFamily: {
    primary: 'System',        // Platform default
    mono: 'Menlo',           // Code, monospace
  },

  // Font Sizes (Mobile-first, rem-based)
  fontSize: {
    xs: 12,    // 0.75rem - Captions, labels
    sm: 14,    // 0.875rem - Small text
    base: 16,  // 1rem - Body text
    lg: 18,    // 1.125rem - Large body
    xl: 20,    // 1.25rem - Subheadings
    '2xl': 24, // 1.5rem - Headings
    '3xl': 30, // 1.875rem - Large headings
    '4xl': 36, // 2.25rem - Display
    '5xl': 48, // 3rem - Hero
  },

  // Font Weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },

  // Text Styles
  styles: {
    h1: {
      fontSize: 36,
      fontWeight: '700',
      lineHeight: 1.2,
      letterSpacing: -0.025,
    },
    h2: {
      fontSize: 30,
      fontWeight: '700',
      lineHeight: 1.2,
      letterSpacing: -0.025,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 1.375,
      letterSpacing: -0.025,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 1.375,
      letterSpacing: 0,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 1.375,
      letterSpacing: 0.025,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 1.5,
      letterSpacing: 0.025,
    },
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const Spacing = {
  // Base spacing scale (4px base unit)
  0: 0,
  1: 4,     // 0.25rem
  2: 8,     // 0.5rem
  3: 12,    // 0.75rem
  4: 16,    // 1rem
  5: 20,    // 1.25rem
  6: 24,    // 1.5rem
  8: 32,    // 2rem
  10: 40,   // 2.5rem
  12: 48,   // 3rem
  16: 64,   // 4rem
  20: 80,   // 5rem
  24: 96,   // 6rem

  // Semantic spacing
  semantic: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },

  // Component spacing
  component: {
    padding: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
    },
    margin: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
    },
    gap: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
    },
  },

  // Layout spacing
  layout: {
    containerPadding: 16,
    sectionGap: 32,
    gridGap: 16,
  },
};

// ============================================================================
// BORDERS & RADIUS
// ============================================================================

export const Border = {
  // Border widths
  width: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 4,
  },

  // Border radius
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  // Border styles
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  },
};

// ============================================================================
// SHADOWS & ELEVATION
// ============================================================================

export const Shadow = {
  // Shadow presets (light mode)
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },

  // Semantic shadows
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
};

// ============================================================================
// LAYOUT
// ============================================================================

export const Layout = {
  // Container widths
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  // Grid columns
  grid: {
    columns: 12,
    gap: 16,
  },

  // Breakpoints (for responsive design)
  breakpoints: {
    xs: 0,
    sm: 375,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

// ============================================================================
// ANIMATION & TRANSITIONS
// ============================================================================

export const Animation = {
  // Duration
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Easing
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// ============================================================================
// OPACITY
// ============================================================================

export const Opacity = {
  0: 0,
  10: 0.1,
  20: 0.2,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  80: 0.8,
  90: 0.9,
  100: 1,
};

// ============================================================================
// Z-INDEX
// ============================================================================

export const ZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// ============================================================================
// DESIGN TOKENS - Combined for easy access
// ============================================================================

export const DesignSystem = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  border: Border,
  shadow: Shadow,
  layout: Layout,
  animation: Animation,
  opacity: Opacity,
  zIndex: ZIndex,
};

export default DesignSystem;
