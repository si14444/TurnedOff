/**
 * TurnedOff Design System
 * Semantic design system with purpose-driven naming
 */

// ============================================================================
// COLOR SYSTEM - Semantic & Purpose-Driven
// ============================================================================

export const Colors = {
  // Light Mode Colors
  light: {
    // Primary Colors - Main brand colors
    primary: "#64748B", // Slate - Primary actions, key elements
    primaryHover: "#475569", // Darker slate for hover states
    primaryActive: "#334155", // Even darker for active/pressed states
    onPrimary: "#FFFFFF", // Text/icons on primary color
    primaryContainer: "#F1F5F9", // Background for elements related to primary
    onPrimaryContainer: "#334155", // Text on primary container

    // Secondary Colors - Supporting actions
    secondary: "#78716C", // Warm gray - Secondary actions
    secondaryHover: "#57534E", // Darker warm gray
    secondaryActive: "#44403C", // Darkest warm gray
    onSecondary: "#FFFFFF", // Text/icons on secondary color
    secondaryContainer: "#E7E5E4", // Background for elements related to secondary
    onSecondaryContainer: "#44403C", // Text on secondary container

    // Tertiary Colors - Accent elements
    tertiary: "#94A3B8", // Light slate - Subtle accents
    tertiaryHover: "#64748B", // Medium slate
    tertiaryActive: "#475569", // Dark slate
    onTertiary: "#FFFFFF", // Text/icons on tertiary color

    // Surface Colors - Backgrounds and containers
    surface: "#FFFFFF", // Main surface (cards, sheets)
    surfaceVariant: "#F8FAFC", // Variant surface (subtle difference)
    surfaceContainer: "#F1F5F9", // Container backgrounds
    surfaceContainerHigh: "#E2E8F0", // Higher elevation containers
    onSurface: "#0F172A", // Text on surface
    onSurfaceVariant: "#475569", // Secondary text on surface

    // Background Colors - Screen backgrounds
    background: "#FFFFFF", // Main screen background
    backgroundVariant: "#F8FAFC", // Variant background
    onBackground: "#0F172A", // Text on background

    // State Colors - Success, Warning, Error, Info
    success: "#6B7280", // Cool gray - Success states
    onSuccess: "#FFFFFF", // Text on success
    successContainer: "#F3F4F6", // Success background container
    onSuccessContainer: "#1F2937", // Text on success container

    warning: "#A8A29E", // Warm gray - Warning states
    onWarning: "#1C1917", // Text on warning
    warningContainer: "#F5F5F4", // Warning background container
    onWarningContainer: "#292524", // Text on warning container

    error: "#757575", // Gray - Error states
    onError: "#FFFFFF", // Text on error
    errorContainer: "#F5F5F5", // Error background container
    onErrorContainer: "#212121", // Text on error container

    info: "#94A3B8", // Slate - Info states
    onInfo: "#FFFFFF", // Text on info
    infoContainer: "#F1F5F9", // Info background container
    onInfoContainer: "#1E293B", // Text on info container

    // Outline & Border Colors
    outline: "#E2E8F0", // Default borders
    outlineVariant: "#CBD5E1", // Variant borders (more prominent)
    outlineStrong: "#94A3B8", // Strong borders

    // Scrim & Overlay
    scrim: "rgba(0, 0, 0, 0.5)", // Modal/dialog overlay
    shadow: "#000000", // Shadow color

    // Disabled States
    disabled: "#E2E8F0", // Disabled background
    onDisabled: "#94A3B8", // Text on disabled

    // Interactive Elements
    hover: "#F8FAFC", // Hover background overlay
    pressed: "#F1F5F9", // Pressed background overlay
    focus: "#64748B", // Focus ring color
    ripple: "rgba(100, 116, 139, 0.12)", // Ripple effect

    // Dividers
    divider: "#E2E8F0", // Divider lines
    dividerSubtle: "#F1F5F9", // Subtle dividers
    dividerStrong: "#CBD5E1", // Strong dividers
  },

  // Dark Mode Colors
  dark: {
    // Primary Colors
    primary: "#94A3B8", // Lighter slate for dark mode
    primaryHover: "#CBD5E1", // Lighter on hover
    primaryActive: "#E2E8F0", // Lightest on active
    onPrimary: "#0F172A", // Dark text on primary
    primaryContainer: "#334155", // Background for elements related to primary
    onPrimaryContainer: "#E2E8F0", // Text on primary container

    // Secondary Colors
    secondary: "#A8A29E", // Lighter warm gray
    secondaryHover: "#D6D3D1", // Lighter on hover
    secondaryActive: "#E7E5E4", // Lightest on active
    onSecondary: "#1C1917", // Dark text on secondary
    secondaryContainer: "#44403C", // Background for elements related to secondary
    onSecondaryContainer: "#E7E5E4", // Text on secondary container

    // Tertiary Colors
    tertiary: "#64748B", // Medium slate
    tertiaryHover: "#94A3B8", // Lighter on hover
    tertiaryActive: "#CBD5E1", // Lightest on active
    onTertiary: "#0F172A", // Dark text on tertiary

    // Surface Colors
    surface: "#1E293B", // Main surface (cards, sheets)
    surfaceVariant: "#0F172A", // Variant surface (darker)
    surfaceContainer: "#334155", // Container backgrounds
    surfaceContainerHigh: "#475569", // Higher elevation containers
    onSurface: "#E2E8F0", // Text on surface
    onSurfaceVariant: "#94A3B8", // Secondary text on surface

    // Background Colors
    background: "#0F172A", // Main screen background
    backgroundVariant: "#1E293B", // Variant background
    onBackground: "#E2E8F0", // Text on background

    // State Colors
    success: "#9CA3AF", // Lighter cool gray
    onSuccess: "#111827", // Dark text
    successContainer: "#374151", // Success background
    onSuccessContainer: "#D1D5DB", // Light text on container

    warning: "#D6D3D1", // Light warm gray
    onWarning: "#1C1917", // Dark text
    warningContainer: "#57534E", // Warning background
    onWarningContainer: "#F5F5F4", // Light text on container

    error: "#BDBDBD", // Light gray
    onError: "#212121", // Dark text
    errorContainer: "#616161", // Error background
    onErrorContainer: "#F5F5F5", // Light text on container

    info: "#CBD5E1", // Light slate
    onInfo: "#0F172A", // Dark text
    infoContainer: "#475569", // Info background
    onInfoContainer: "#E2E8F0", // Light text on container

    // Outline & Border Colors
    outline: "#334155", // Default borders
    outlineVariant: "#475569", // Variant borders
    outlineStrong: "#64748B", // Strong borders

    // Scrim & Overlay
    scrim: "rgba(0, 0, 0, 0.7)", // Darker overlay for dark mode
    shadow: "#000000", // Shadow color

    // Disabled States
    disabled: "#334155", // Disabled background
    onDisabled: "#64748B", // Text on disabled

    // Interactive Elements
    hover: "#1E293B", // Hover background overlay
    pressed: "#334155", // Pressed background overlay
    focus: "#94A3B8", // Focus ring color
    ripple: "rgba(148, 163, 184, 0.12)", // Ripple effect

    // Dividers
    divider: "#334155", // Divider lines
    dividerSubtle: "#1E293B", // Subtle dividers
    dividerStrong: "#475569", // Strong dividers
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

const fontWeights = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const Typography = {
  // Font Families
  fontFamily: {
    primary: "System", // Platform default
    mono: "Menlo", // Code, monospace
  },

  // Font Sizes (Mobile-first)
  fontSize: {
    xs: 12, // Captions, labels
    sm: 14, // Small text
    base: 16, // Body text
    lg: 18, // Large body
    xl: 20, // Subheadings
    "2xl": 24, // Headings
    "3xl": 30, // Large headings
    "4xl": 36, // Display
    "5xl": 48, // Hero
  },

  // Font Weights
  fontWeight: fontWeights,

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

  // Text Styles (Pre-configured)
  styles: {
    displayLarge: {
      fontSize: 48,
      fontWeight: fontWeights.bold,
      lineHeight: 1.2,
      letterSpacing: -0.025,
    },
    displayMedium: {
      fontSize: 36,
      fontWeight: fontWeights.bold,
      lineHeight: 1.2,
      letterSpacing: -0.025,
    },
    displaySmall: {
      fontSize: 30,
      fontWeight: fontWeights.bold,
      lineHeight: 1.2,
      letterSpacing: -0.025,
    },
    headlineLarge: {
      fontSize: 24,
      fontWeight: fontWeights.semibold,
      lineHeight: 1.375,
      letterSpacing: -0.025,
    },
    headlineMedium: {
      fontSize: 20,
      fontWeight: fontWeights.semibold,
      lineHeight: 1.375,
      letterSpacing: 0,
    },
    headlineSmall: {
      fontSize: 18,
      fontWeight: fontWeights.semibold,
      lineHeight: 1.375,
      letterSpacing: 0,
    },
    titleLarge: {
      fontSize: 20,
      fontWeight: fontWeights.medium,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    titleMedium: {
      fontSize: 16,
      fontWeight: fontWeights.medium,
      lineHeight: 1.5,
      letterSpacing: 0.015,
    },
    titleSmall: {
      fontSize: 14,
      fontWeight: fontWeights.medium,
      lineHeight: 1.5,
      letterSpacing: 0.015,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    labelLarge: {
      fontSize: 16,
      fontWeight: fontWeights.semibold,
      lineHeight: 1.5,
      letterSpacing: 0.025,
    },
    labelMedium: {
      fontSize: 14,
      fontWeight: fontWeights.semibold,
      lineHeight: 1.5,
      letterSpacing: 0.025,
    },
    labelSmall: {
      fontSize: 12,
      fontWeight: fontWeights.semibold,
      lineHeight: 1.375,
      letterSpacing: 0.05,
    },
  },
}; // ============================================================================
// SPACING
// ============================================================================

export const Spacing = {
  // Base spacing scale (4px base unit)
  none: 0,
  xs: 4, // Extra small
  sm: 8, // Small
  md: 12, // Medium
  lg: 16, // Large
  xl: 20, // Extra large
  "2xl": 24, // 2x Extra large
  "3xl": 32, // 3x Extra large
  "4xl": 40, // 4x Extra large
  "5xl": 48, // 5x Extra large
  "6xl": 64, // 6x Extra large
  "7xl": 80, // 7x Extra large
  "8xl": 96, // 8x Extra large

  // Component-specific spacing
  component: {
    paddingXS: 8,
    paddingSM: 12,
    paddingMD: 16,
    paddingLG: 24,
    paddingXL: 32,

    marginXS: 8,
    marginSM: 12,
    marginMD: 16,
    marginLG: 24,
    marginXL: 32,

    gapXS: 4,
    gapSM: 8,
    gapMD: 12,
    gapLG: 16,
    gapXL: 24,
  },

  // Layout spacing
  layout: {
    screenPadding: 16, // Standard screen padding
    sectionGap: 32, // Gap between sections
    containerPadding: 16, // Container padding
    gridGap: 16, // Grid item gap
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

  // Border radius (Semantic naming)
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    full: 9999, // Circular
  },
};

// ============================================================================
// SHADOWS & ELEVATION
// ============================================================================

export const Shadow = {
  // Elevation levels
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  "2xl": {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
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

  // Breakpoints
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
  // Duration (in milliseconds)
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Easing functions
  easing: {
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
};

// ============================================================================
// OPACITY
// ============================================================================

export const Opacity = {
  invisible: 0,
  disabled: 0.38,
  hover: 0.08,
  focus: 0.12,
  selected: 0.12,
  activated: 0.12,
  pressed: 0.16,
  dragged: 0.16,
  semiTransparent: 0.5,
  visible: 1,
};

// ============================================================================
// Z-INDEX
// ============================================================================

export const ZIndex = {
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
};

// ============================================================================
// DESIGN SYSTEM - Complete Export
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
