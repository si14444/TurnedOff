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
    primary: "#2563EB", // Bright Blue - Primary actions, key elements
    primaryHover: "#1D4ED8", // Darker blue for hover states
    primaryActive: "#1E40AF", // Even darker for active/pressed states
    onPrimary: "#FFFFFF", // Text/icons on primary color
    primaryContainer: "#DBEAFE", // Light blue background
    onPrimaryContainer: "#1E3A8A", // Dark blue text on primary container

    // Secondary Colors - Supporting actions
    secondary: "#7C3AED", // Purple - Secondary actions
    secondaryHover: "#6D28D9", // Darker purple
    secondaryActive: "#5B21B6", // Darkest purple
    onSecondary: "#FFFFFF", // Text/icons on secondary color
    secondaryContainer: "#EDE9FE", // Light purple background
    onSecondaryContainer: "#4C1D95", // Dark purple text

    // Tertiary Colors - Accent elements
    tertiary: "#059669", // Green - Subtle accents
    tertiaryHover: "#047857", // Darker green
    tertiaryActive: "#065F46", // Darkest green
    onTertiary: "#FFFFFF", // Text/icons on tertiary color

    // Surface Colors - Backgrounds and containers
    surface: "#FFFFFF", // Main surface (cards, sheets)
    surfaceVariant: "#F8FAFC", // Variant surface (subtle difference)
    surfaceContainer: "#F1F5F9", // Container backgrounds
    surfaceContainerHigh: "#E2E8F0", // Higher elevation containers
    onSurface: "#0F172A", // Text on surface (very dark, almost black)
    onSurfaceVariant: "#334155", // Secondary text on surface (dark gray)

    // Background Colors - Screen backgrounds
    background: "#F8FAFC", // Light gray background (not pure white)
    backgroundVariant: "#F1F5F9", // Slightly darker variant
    onBackground: "#0F172A", // Text on background (very dark)

    // State Colors - Success, Warning, Error, Info
    success: "#10B981", // Green - Success states
    onSuccess: "#FFFFFF", // Text on success
    successContainer: "#D1FAE5", // Light green background
    onSuccessContainer: "#065F46", // Dark green text

    warning: "#F59E0B", // Amber - Warning states
    onWarning: "#FFFFFF", // Text on warning
    warningContainer: "#FEF3C7", // Light amber background
    onWarningContainer: "#92400E", // Dark amber text

    error: "#EF4444", // Red - Error states
    onError: "#FFFFFF", // Text on error
    errorContainer: "#FEE2E2", // Light red background
    onErrorContainer: "#991B1B", // Dark red text

    info: "#3B82F6", // Blue - Info states
    onInfo: "#FFFFFF", // Text on info
    infoContainer: "#DBEAFE", // Light blue background
    onInfoContainer: "#1E3A8A", // Dark blue text

    // Outline & Border Colors
    outline: "#CBD5E1", // Default borders (more visible)
    outlineVariant: "#94A3B8", // Variant borders (more prominent)
    outlineStrong: "#64748B", // Strong borders (very visible)

    // Scrim & Overlay
    scrim: "rgba(0, 0, 0, 0.5)", // Modal/dialog overlay
    shadow: "#000000", // Shadow color

    // Disabled States
    disabled: "#E2E8F0", // Disabled background
    onDisabled: "#94A3B8", // Text on disabled

    // Interactive Elements
    hover: "#F1F5F9", // Hover background overlay
    pressed: "#E2E8F0", // Pressed background overlay
    focus: "#2563EB", // Focus ring color (bright blue)
    ripple: "rgba(37, 99, 235, 0.12)", // Ripple effect (blue)

    // Dividers
    divider: "#CBD5E1", // Divider lines (more visible)
    dividerSubtle: "#E2E8F0", // Subtle dividers
    dividerStrong: "#94A3B8", // Strong dividers (very visible)
  },

  // Dark Mode Colors
  dark: {
    // Primary Colors
    primary: "#60A5FA", // Bright blue for dark mode
    primaryHover: "#93C5FD", // Lighter blue on hover
    primaryActive: "#BFDBFE", // Lightest blue on active
    onPrimary: "#1E3A8A", // Dark blue text on primary
    primaryContainer: "#1E3A8A", // Dark blue background
    onPrimaryContainer: "#DBEAFE", // Light blue text on container

    // Secondary Colors
    secondary: "#A78BFA", // Purple for dark mode
    secondaryHover: "#C4B5FD", // Lighter purple
    secondaryActive: "#DDD6FE", // Lightest purple
    onSecondary: "#4C1D95", // Dark purple text
    secondaryContainer: "#4C1D95", // Dark purple background
    onSecondaryContainer: "#EDE9FE", // Light purple text

    // Tertiary Colors
    tertiary: "#34D399", // Green for dark mode
    tertiaryHover: "#6EE7B7", // Lighter green
    tertiaryActive: "#A7F3D0", // Lightest green
    onTertiary: "#065F46", // Dark green text

    // Surface Colors
    surface: "#1E293B", // Dark surface (cards, sheets)
    surfaceVariant: "#0F172A", // Darker variant
    surfaceContainer: "#334155", // Container backgrounds
    surfaceContainerHigh: "#475569", // Higher elevation containers
    onSurface: "#F1F5F9", // Light text on surface (very light)
    onSurfaceVariant: "#CBD5E1", // Secondary light text

    // Background Colors
    background: "#0F172A", // Very dark background
    backgroundVariant: "#1E293B", // Slightly lighter variant
    onBackground: "#F1F5F9", // Light text on background (very light)

    // State Colors
    success: "#34D399", // Green for dark mode
    onSuccess: "#FFFFFF", // White text
    successContainer: "#065F46", // Dark green background
    onSuccessContainer: "#D1FAE5", // Light green text

    warning: "#FBBF24", // Amber for dark mode
    onWarning: "#FFFFFF", // White text
    warningContainer: "#92400E", // Dark amber background
    onWarningContainer: "#FEF3C7", // Light amber text

    error: "#F87171", // Red for dark mode
    onError: "#FFFFFF", // White text
    errorContainer: "#991B1B", // Dark red background
    onErrorContainer: "#FEE2E2", // Light red text

    info: "#60A5FA", // Blue for dark mode
    onInfo: "#FFFFFF", // White text
    infoContainer: "#1E3A8A", // Dark blue background
    onInfoContainer: "#DBEAFE", // Light blue text

    // Outline & Border Colors
    outline: "#475569", // Default borders (more visible)
    outlineVariant: "#64748B", // Variant borders (more prominent)
    outlineStrong: "#94A3B8", // Strong borders (very visible)

    // Scrim & Overlay
    scrim: "rgba(0, 0, 0, 0.7)", // Darker overlay for dark mode
    shadow: "#000000", // Shadow color

    // Disabled States
    disabled: "#334155", // Disabled background
    onDisabled: "#64748B", // Text on disabled

    // Interactive Elements
    hover: "#1E293B", // Hover background overlay
    pressed: "#334155", // Pressed background overlay
    focus: "#60A5FA", // Focus ring color (bright blue)
    ripple: "rgba(96, 165, 250, 0.12)", // Ripple effect (blue)

    // Dividers
    divider: "#475569", // Divider lines (more visible)
    dividerSubtle: "#334155", // Subtle dividers
    dividerStrong: "#64748B", // Strong dividers (very visible)
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
