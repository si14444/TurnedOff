/**
 * Component Style Specifications
 * Pre-defined styles for common UI components following the gray design system
 */

import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Border, Shadow } from './DesignSystem';

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const ButtonStyles = StyleSheet.create({
  // Base button
  base: {
    paddingVertical: Spacing.component.padding.sm,
    paddingHorizontal: Spacing.component.padding.lg,
    borderRadius: Border.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.button,
  },

  // Primary button (Slate)
  primary: {
    backgroundColor: Colors.slate[600],
  },

  // Secondary button (Warm Gray)
  secondary: {
    backgroundColor: Colors.warmGray[400],
  },

  // Outline button
  outline: {
    backgroundColor: 'transparent',
    borderWidth: Border.width.medium,
    borderColor: Colors.gray[300],
  },

  // Ghost button
  ghost: {
    backgroundColor: 'transparent',
  },

  // Disabled state
  disabled: {
    backgroundColor: Colors.gray[200],
    ...Shadow.sm,
  },

  // Button text
  text: {
    ...Typography.styles.button,
    color: Colors.semantic.text.inverse,
  },

  textOutline: {
    ...Typography.styles.button,
    color: Colors.semantic.text.primary,
  },

  textDisabled: {
    ...Typography.styles.button,
    color: Colors.semantic.text.disabled,
  },

  // Size variants
  small: {
    paddingVertical: Spacing.component.padding.xs,
    paddingHorizontal: Spacing.component.padding.md,
  },

  large: {
    paddingVertical: Spacing.component.padding.md,
    paddingHorizontal: Spacing.component.padding.xl,
  },
});

// ============================================================================
// CARD STYLES
// ============================================================================

export const CardStyles = StyleSheet.create({
  // Base card
  base: {
    backgroundColor: Colors.semantic.background.primary,
    borderRadius: Border.radius.lg,
    padding: Spacing.component.padding.md,
    ...Shadow.card,
  },

  // Elevated card
  elevated: {
    backgroundColor: Colors.semantic.background.elevated,
    borderRadius: Border.radius.lg,
    padding: Spacing.component.padding.lg,
    ...Shadow.lg,
  },

  // Outlined card
  outlined: {
    backgroundColor: Colors.semantic.background.primary,
    borderRadius: Border.radius.lg,
    padding: Spacing.component.padding.md,
    borderWidth: Border.width.thin,
    borderColor: Colors.semantic.border.default,
  },

  // Card header
  header: {
    marginBottom: Spacing.component.margin.md,
  },

  // Card content
  content: {
    marginBottom: Spacing.component.margin.sm,
  },

  // Card footer
  footer: {
    marginTop: Spacing.component.margin.md,
    paddingTop: Spacing.component.padding.md,
    borderTopWidth: Border.width.thin,
    borderTopColor: Colors.semantic.border.subtle,
  },
});

// ============================================================================
// INPUT STYLES
// ============================================================================

export const InputStyles = StyleSheet.create({
  // Base input container
  container: {
    marginBottom: Spacing.component.margin.md,
  },

  // Label
  label: {
    ...Typography.styles.bodySmall,
    color: Colors.semantic.text.secondary,
    marginBottom: Spacing.semantic.xs,
    fontWeight: Typography.fontWeight.medium,
  },

  // Input field
  input: {
    ...Typography.styles.body,
    backgroundColor: Colors.semantic.background.secondary,
    borderWidth: Border.width.thin,
    borderColor: Colors.semantic.border.default,
    borderRadius: Border.radius.md,
    paddingVertical: Spacing.component.padding.sm,
    paddingHorizontal: Spacing.component.padding.md,
    color: Colors.semantic.text.primary,
  },

  // Focused state
  inputFocused: {
    borderColor: Colors.semantic.interactive.focus,
    borderWidth: Border.width.medium,
  },

  // Error state
  inputError: {
    borderColor: Colors.accent.error,
  },

  // Disabled state
  inputDisabled: {
    backgroundColor: Colors.gray[100],
    color: Colors.semantic.text.disabled,
  },

  // Helper text
  helperText: {
    ...Typography.styles.caption,
    color: Colors.semantic.text.tertiary,
    marginTop: Spacing.semantic.xs,
  },

  // Error text
  errorText: {
    ...Typography.styles.caption,
    color: Colors.accent.error,
    marginTop: Spacing.semantic.xs,
  },
});

// ============================================================================
// TYPOGRAPHY STYLES
// ============================================================================

export const TextStyles = StyleSheet.create({
  // Headings
  h1: {
    ...Typography.styles.h1,
    color: Colors.semantic.text.primary,
  },

  h2: {
    ...Typography.styles.h2,
    color: Colors.semantic.text.primary,
  },

  h3: {
    ...Typography.styles.h3,
    color: Colors.semantic.text.primary,
  },

  h4: {
    ...Typography.styles.h4,
    color: Colors.semantic.text.primary,
  },

  // Body text
  body: {
    ...Typography.styles.body,
    color: Colors.semantic.text.primary,
  },

  bodyLarge: {
    ...Typography.styles.bodyLarge,
    color: Colors.semantic.text.primary,
  },

  bodySmall: {
    ...Typography.styles.bodySmall,
    color: Colors.semantic.text.secondary,
  },

  // Caption
  caption: {
    ...Typography.styles.caption,
    color: Colors.semantic.text.tertiary,
  },

  // Text colors
  textPrimary: {
    color: Colors.semantic.text.primary,
  },

  textSecondary: {
    color: Colors.semantic.text.secondary,
  },

  textTertiary: {
    color: Colors.semantic.text.tertiary,
  },

  textDisabled: {
    color: Colors.semantic.text.disabled,
  },

  textInverse: {
    color: Colors.semantic.text.inverse,
  },
});

// ============================================================================
// CONTAINER STYLES
// ============================================================================

export const ContainerStyles = StyleSheet.create({
  // Screen container
  screen: {
    flex: 1,
    backgroundColor: Colors.semantic.background.primary,
  },

  // Content container
  content: {
    flex: 1,
    padding: Spacing.layout.containerPadding,
  },

  // Centered container
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.layout.containerPadding,
  },

  // Section
  section: {
    marginBottom: Spacing.layout.sectionGap,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.component.gap.md,
  },

  // Column
  column: {
    flexDirection: 'column',
    gap: Spacing.component.gap.md,
  },
});

// ============================================================================
// DIVIDER STYLES
// ============================================================================

export const DividerStyles = StyleSheet.create({
  // Horizontal divider
  horizontal: {
    height: Border.width.thin,
    backgroundColor: Colors.semantic.border.default,
    marginVertical: Spacing.component.margin.md,
  },

  // Vertical divider
  vertical: {
    width: Border.width.thin,
    backgroundColor: Colors.semantic.border.default,
    marginHorizontal: Spacing.component.margin.md,
  },

  // Subtle divider
  subtle: {
    height: Border.width.thin,
    backgroundColor: Colors.semantic.border.subtle,
    marginVertical: Spacing.component.margin.sm,
  },

  // Strong divider
  strong: {
    height: Border.width.medium,
    backgroundColor: Colors.semantic.border.strong,
    marginVertical: Spacing.component.margin.lg,
  },
});

// ============================================================================
// BADGE STYLES
// ============================================================================

export const BadgeStyles = StyleSheet.create({
  // Base badge
  base: {
    paddingVertical: Spacing[1],
    paddingHorizontal: Spacing[2],
    borderRadius: Border.radius.full,
    alignSelf: 'flex-start',
  },

  // Default badge
  default: {
    backgroundColor: Colors.gray[200],
  },

  // Primary badge
  primary: {
    backgroundColor: Colors.slate[600],
  },

  // Success badge
  success: {
    backgroundColor: Colors.coolGray[600],
  },

  // Warning badge
  warning: {
    backgroundColor: Colors.warmGray[400],
  },

  // Error badge
  error: {
    backgroundColor: Colors.gray[600],
  },

  // Badge text
  text: {
    ...Typography.styles.caption,
    color: Colors.semantic.text.inverse,
    fontWeight: Typography.fontWeight.semibold,
  },

  textDefault: {
    ...Typography.styles.caption,
    color: Colors.semantic.text.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});

// ============================================================================
// AVATAR STYLES
// ============================================================================

export const AvatarStyles = StyleSheet.create({
  // Base avatar
  base: {
    borderRadius: Border.radius.full,
    backgroundColor: Colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Size variants
  small: {
    width: 32,
    height: 32,
  },

  medium: {
    width: 48,
    height: 48,
  },

  large: {
    width: 64,
    height: 64,
  },

  xlarge: {
    width: 96,
    height: 96,
  },

  // Avatar image
  image: {
    width: '100%',
    height: '100%',
  },

  // Avatar text (initials)
  text: {
    ...Typography.styles.body,
    color: Colors.semantic.text.inverse,
    fontWeight: Typography.fontWeight.semibold,
  },
});

// ============================================================================
// LIST ITEM STYLES
// ============================================================================

export const ListItemStyles = StyleSheet.create({
  // Base list item
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.component.padding.md,
    backgroundColor: Colors.semantic.background.primary,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: Colors.semantic.border.subtle,
  },

  // List item with hover/press effect
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.component.padding.md,
    backgroundColor: Colors.semantic.background.primary,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: Colors.semantic.border.subtle,
  },

  pressed: {
    backgroundColor: Colors.semantic.background.secondary,
  },

  // List item content
  content: {
    flex: 1,
    marginHorizontal: Spacing.component.margin.sm,
  },

  // List item title
  title: {
    ...Typography.styles.body,
    color: Colors.semantic.text.primary,
    fontWeight: Typography.fontWeight.medium,
  },

  // List item subtitle
  subtitle: {
    ...Typography.styles.bodySmall,
    color: Colors.semantic.text.secondary,
    marginTop: Spacing[1],
  },

  // List item leading/trailing
  leading: {
    marginRight: Spacing.component.margin.sm,
  },

  trailing: {
    marginLeft: Spacing.component.margin.sm,
  },
});

// ============================================================================
// MODAL STYLES
// ============================================================================

export const ModalStyles = StyleSheet.create({
  // Modal overlay
  overlay: {
    flex: 1,
    backgroundColor: Colors.semantic.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.component.padding.lg,
  },

  // Modal container
  container: {
    backgroundColor: Colors.semantic.background.elevated,
    borderRadius: Border.radius.xl,
    padding: Spacing.component.padding.lg,
    width: '100%',
    maxWidth: 500,
    ...Shadow.modal,
  },

  // Modal header
  header: {
    marginBottom: Spacing.component.margin.md,
  },

  // Modal title
  title: {
    ...Typography.styles.h3,
    color: Colors.semantic.text.primary,
  },

  // Modal content
  content: {
    marginBottom: Spacing.component.margin.lg,
  },

  // Modal footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.component.gap.sm,
  },
});

// ============================================================================
// TAB STYLES
// ============================================================================

export const TabStyles = StyleSheet.create({
  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.semantic.background.primary,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: Colors.semantic.border.default,
  },

  // Tab item
  tab: {
    flex: 1,
    paddingVertical: Spacing.component.padding.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: Border.width.medium,
    borderBottomColor: 'transparent',
  },

  // Active tab
  tabActive: {
    borderBottomColor: Colors.semantic.interactive.default,
  },

  // Tab label
  tabLabel: {
    ...Typography.styles.body,
    color: Colors.semantic.text.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Active tab label
  tabLabelActive: {
    color: Colors.semantic.interactive.default,
  },
});

// ============================================================================
// EXPORT ALL STYLES
// ============================================================================

export const ComponentStyles = {
  button: ButtonStyles,
  card: CardStyles,
  input: InputStyles,
  text: TextStyles,
  container: ContainerStyles,
  divider: DividerStyles,
  badge: BadgeStyles,
  avatar: AvatarStyles,
  listItem: ListItemStyles,
  modal: ModalStyles,
  tab: TabStyles,
};

export default ComponentStyles;
