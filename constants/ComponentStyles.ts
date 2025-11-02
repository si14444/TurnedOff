/**
 * Component Style Specifications
 * Pre-defined styles using semantic color system
 */

import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Border, Shadow } from './DesignSystem';

// Helper to get colors based on theme (light/dark)
// In actual usage, you'd use a theme context to determine this
const getColors = (isDark: boolean = false) => isDark ? Colors.dark : Colors.light;

// For now, using light mode as default
const theme = Colors.light;

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const ButtonStyles = StyleSheet.create({
  // Base button
  base: {
    paddingVertical: Spacing.component.paddingSM,
    paddingHorizontal: Spacing.component.paddingLG,
    borderRadius: Border.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },

  // Primary button
  primary: {
    backgroundColor: theme.primary,
  },

  primaryText: {
    ...Typography.styles.labelLarge,
    color: theme.onPrimary,
  },

  // Secondary button
  secondary: {
    backgroundColor: theme.secondary,
  },

  secondaryText: {
    ...Typography.styles.labelLarge,
    color: theme.onSecondary,
  },

  // Tertiary button
  tertiary: {
    backgroundColor: theme.tertiary,
  },

  tertiaryText: {
    ...Typography.styles.labelLarge,
    color: theme.onTertiary,
  },

  // Outline button
  outline: {
    backgroundColor: 'transparent',
    borderWidth: Border.width.medium,
    borderColor: theme.outline,
  },

  outlineText: {
    ...Typography.styles.labelLarge,
    color: theme.primary,
  },

  // Ghost button (text only)
  ghost: {
    backgroundColor: 'transparent',
  },

  ghostText: {
    ...Typography.styles.labelLarge,
    color: theme.primary,
  },

  // Disabled state
  disabled: {
    backgroundColor: theme.disabled,
  },

  disabledText: {
    ...Typography.styles.labelLarge,
    color: theme.onDisabled,
  },

  // Size variants
  small: {
    paddingVertical: Spacing.component.paddingXS,
    paddingHorizontal: Spacing.component.paddingMD,
  },

  large: {
    paddingVertical: Spacing.component.paddingMD,
    paddingHorizontal: Spacing.component.paddingXL,
  },
});

// ============================================================================
// CARD STYLES
// ============================================================================

export const CardStyles = StyleSheet.create({
  // Base card
  base: {
    backgroundColor: theme.surface,
    borderRadius: Border.radius.lg,
    padding: Spacing.component.paddingMD,
    ...Shadow.md,
  },

  // Surface variant card
  variant: {
    backgroundColor: theme.surfaceVariant,
    borderRadius: Border.radius.lg,
    padding: Spacing.component.paddingMD,
    ...Shadow.sm,
  },

  // Elevated card
  elevated: {
    backgroundColor: theme.surface,
    borderRadius: Border.radius.lg,
    padding: Spacing.component.paddingLG,
    ...Shadow.lg,
  },

  // Outlined card
  outlined: {
    backgroundColor: theme.surface,
    borderRadius: Border.radius.lg,
    padding: Spacing.component.paddingMD,
    borderWidth: Border.width.thin,
    borderColor: theme.outline,
  },

  // Card header
  header: {
    marginBottom: Spacing.component.marginMD,
  },

  // Card content
  content: {
    marginBottom: Spacing.component.marginSM,
  },

  // Card footer
  footer: {
    marginTop: Spacing.component.marginMD,
    paddingTop: Spacing.component.paddingMD,
    borderTopWidth: Border.width.thin,
    borderTopColor: theme.divider,
  },
});

// ============================================================================
// INPUT STYLES
// ============================================================================

export const InputStyles = StyleSheet.create({
  // Input container
  container: {
    marginBottom: Spacing.component.marginMD,
  },

  // Label
  label: {
    ...Typography.styles.labelMedium,
    color: theme.onSurfaceVariant,
    marginBottom: Spacing.xs,
  },

  // Input field
  input: {
    ...Typography.styles.bodyMedium,
    backgroundColor: theme.surfaceContainer,
    borderWidth: Border.width.thin,
    borderColor: theme.outline,
    borderRadius: Border.radius.sm,
    paddingVertical: Spacing.component.paddingSM,
    paddingHorizontal: Spacing.component.paddingMD,
    color: theme.onSurface,
  },

  // Focused state
  inputFocused: {
    borderColor: theme.primary,
    borderWidth: Border.width.medium,
  },

  // Error state
  inputError: {
    borderColor: theme.error,
  },

  // Disabled state
  inputDisabled: {
    backgroundColor: theme.disabled,
    color: theme.onDisabled,
  },

  // Helper text
  helperText: {
    ...Typography.styles.bodySmall,
    color: theme.onSurfaceVariant,
    marginTop: Spacing.xs,
  },

  // Error text
  errorText: {
    ...Typography.styles.bodySmall,
    color: theme.error,
    marginTop: Spacing.xs,
  },
});

// ============================================================================
// TYPOGRAPHY STYLES
// ============================================================================

export const TextStyles = StyleSheet.create({
  // Display text
  displayLarge: {
    ...Typography.styles.displayLarge,
    color: theme.onSurface,
  },

  displayMedium: {
    ...Typography.styles.displayMedium,
    color: theme.onSurface,
  },

  displaySmall: {
    ...Typography.styles.displaySmall,
    color: theme.onSurface,
  },

  // Headlines
  headlineLarge: {
    ...Typography.styles.headlineLarge,
    color: theme.onSurface,
  },

  headlineMedium: {
    ...Typography.styles.headlineMedium,
    color: theme.onSurface,
  },

  headlineSmall: {
    ...Typography.styles.headlineSmall,
    color: theme.onSurface,
  },

  // Titles
  titleLarge: {
    ...Typography.styles.titleLarge,
    color: theme.onSurface,
  },

  titleMedium: {
    ...Typography.styles.titleMedium,
    color: theme.onSurface,
  },

  titleSmall: {
    ...Typography.styles.titleSmall,
    color: theme.onSurfaceVariant,
  },

  // Body text
  bodyLarge: {
    ...Typography.styles.bodyLarge,
    color: theme.onSurface,
  },

  bodyMedium: {
    ...Typography.styles.bodyMedium,
    color: theme.onSurface,
  },

  bodySmall: {
    ...Typography.styles.bodySmall,
    color: theme.onSurfaceVariant,
  },

  // Labels
  labelLarge: {
    ...Typography.styles.labelLarge,
    color: theme.onSurface,
  },

  labelMedium: {
    ...Typography.styles.labelMedium,
    color: theme.onSurface,
  },

  labelSmall: {
    ...Typography.styles.labelSmall,
    color: theme.onSurfaceVariant,
  },

  // Semantic color variants
  textPrimary: {
    color: theme.primary,
  },

  textSecondary: {
    color: theme.secondary,
  },

  textOnSurface: {
    color: theme.onSurface,
  },

  textOnSurfaceVariant: {
    color: theme.onSurfaceVariant,
  },
});

// ============================================================================
// CONTAINER STYLES
// ============================================================================

export const ContainerStyles = StyleSheet.create({
  // Screen container
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },

  screenVariant: {
    flex: 1,
    backgroundColor: theme.backgroundVariant,
  },

  // Content container
  content: {
    flex: 1,
    padding: Spacing.layout.screenPadding,
  },

  // Centered container
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.layout.screenPadding,
  },

  // Section
  section: {
    marginBottom: Spacing.layout.sectionGap,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.component.gapMD,
  },

  // Column
  column: {
    flexDirection: 'column',
    gap: Spacing.component.gapMD,
  },

  // Surface container
  surfaceContainer: {
    backgroundColor: theme.surfaceContainer,
    padding: Spacing.component.paddingMD,
    borderRadius: Border.radius.md,
  },
});

// ============================================================================
// DIVIDER STYLES
// ============================================================================

export const DividerStyles = StyleSheet.create({
  // Horizontal divider
  horizontal: {
    height: Border.width.thin,
    backgroundColor: theme.divider,
    marginVertical: Spacing.component.marginMD,
  },

  // Vertical divider
  vertical: {
    width: Border.width.thin,
    backgroundColor: theme.divider,
    marginHorizontal: Spacing.component.marginMD,
  },

  // Subtle divider
  subtle: {
    height: Border.width.thin,
    backgroundColor: theme.dividerSubtle,
    marginVertical: Spacing.component.marginSM,
  },

  // Strong divider
  strong: {
    height: Border.width.medium,
    backgroundColor: theme.dividerStrong,
    marginVertical: Spacing.component.marginLG,
  },
});

// ============================================================================
// BADGE STYLES
// ============================================================================

export const BadgeStyles = StyleSheet.create({
  // Base badge
  base: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Border.radius.full,
    alignSelf: 'flex-start',
  },

  // Primary badge
  primary: {
    backgroundColor: theme.primary,
  },

  primaryText: {
    ...Typography.styles.labelSmall,
    color: theme.onPrimary,
  },

  // Secondary badge
  secondary: {
    backgroundColor: theme.secondary,
  },

  secondaryText: {
    ...Typography.styles.labelSmall,
    color: theme.onSecondary,
  },

  // Tertiary badge
  tertiary: {
    backgroundColor: theme.tertiary,
  },

  tertiaryText: {
    ...Typography.styles.labelSmall,
    color: theme.onTertiary,
  },

  // Success badge
  success: {
    backgroundColor: theme.success,
  },

  successText: {
    ...Typography.styles.labelSmall,
    color: theme.onSuccess,
  },

  // Warning badge
  warning: {
    backgroundColor: theme.warning,
  },

  warningText: {
    ...Typography.styles.labelSmall,
    color: theme.onWarning,
  },

  // Error badge
  error: {
    backgroundColor: theme.error,
  },

  errorText: {
    ...Typography.styles.labelSmall,
    color: theme.onError,
  },

  // Info badge
  info: {
    backgroundColor: theme.info,
  },

  infoText: {
    ...Typography.styles.labelSmall,
    color: theme.onInfo,
  },
});

// ============================================================================
// AVATAR STYLES
// ============================================================================

export const AvatarStyles = StyleSheet.create({
  // Base avatar
  base: {
    borderRadius: Border.radius.full,
    backgroundColor: theme.surfaceContainer,
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
    ...Typography.styles.titleMedium,
    color: theme.onSurfaceVariant,
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
    padding: Spacing.component.paddingMD,
    backgroundColor: theme.surface,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: theme.divider,
  },

  // Pressable list item
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.component.paddingMD,
    backgroundColor: theme.surface,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: theme.divider,
  },

  pressed: {
    backgroundColor: theme.pressed,
  },

  // List item content
  content: {
    flex: 1,
    marginHorizontal: Spacing.component.marginSM,
  },

  // List item title
  title: {
    ...Typography.styles.bodyMedium,
    color: theme.onSurface,
    fontWeight: Typography.fontWeight.medium,
  },

  // List item subtitle
  subtitle: {
    ...Typography.styles.bodySmall,
    color: theme.onSurfaceVariant,
    marginTop: Spacing.xs,
  },

  // List item leading/trailing
  leading: {
    marginRight: Spacing.component.marginSM,
  },

  trailing: {
    marginLeft: Spacing.component.marginSM,
  },
});

// ============================================================================
// MODAL STYLES
// ============================================================================

export const ModalStyles = StyleSheet.create({
  // Modal overlay
  overlay: {
    flex: 1,
    backgroundColor: theme.scrim,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.component.paddingLG,
  },

  // Modal container
  container: {
    backgroundColor: theme.surface,
    borderRadius: Border.radius.xl,
    padding: Spacing.component.paddingLG,
    width: '100%',
    maxWidth: 500,
    ...Shadow.xl,
  },

  // Modal header
  header: {
    marginBottom: Spacing.component.marginMD,
  },

  // Modal title
  title: {
    ...Typography.styles.headlineMedium,
    color: theme.onSurface,
  },

  // Modal content
  content: {
    marginBottom: Spacing.component.marginLG,
  },

  // Modal footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.component.gapSM,
  },
});

// ============================================================================
// TAB STYLES
// ============================================================================

export const TabStyles = StyleSheet.create({
  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: theme.divider,
  },

  // Tab item
  tab: {
    flex: 1,
    paddingVertical: Spacing.component.paddingMD,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: Border.width.medium,
    borderBottomColor: 'transparent',
  },

  // Active tab
  tabActive: {
    borderBottomColor: theme.primary,
  },

  // Tab label
  tabLabel: {
    ...Typography.styles.titleMedium,
    color: theme.onSurfaceVariant,
  },

  // Active tab label
  tabLabelActive: {
    color: theme.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});

// ============================================================================
// CHIP STYLES
// ============================================================================

export const ChipStyles = StyleSheet.create({
  // Base chip
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: Border.radius.full,
    backgroundColor: theme.surfaceContainer,
    borderWidth: Border.width.thin,
    borderColor: theme.outline,
  },

  // Filled chip
  filled: {
    backgroundColor: theme.surfaceContainerHigh,
    borderWidth: 0,
  },

  // Outlined chip
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: Border.width.thin,
    borderColor: theme.outline,
  },

  // Chip text
  text: {
    ...Typography.styles.labelMedium,
    color: theme.onSurfaceVariant,
  },

  // Selected chip
  selected: {
    backgroundColor: theme.secondaryContainer,
    borderColor: theme.secondary,
  },

  selectedText: {
    color: theme.onSecondaryContainer,
  },
});

// ============================================================================
// FAB (Floating Action Button) STYLES
// ============================================================================

export const FABStyles = StyleSheet.create({
  // Base FAB
  base: {
    width: 56,
    height: 56,
    borderRadius: Border.radius.lg,
    backgroundColor: theme.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.lg,
  },

  // Primary FAB
  primary: {
    backgroundColor: theme.primary,
  },

  // Secondary FAB
  secondary: {
    backgroundColor: theme.secondary,
  },

  // Tertiary FAB
  tertiary: {
    backgroundColor: theme.tertiary,
  },

  // Extended FAB
  extended: {
    width: 'auto',
    paddingHorizontal: Spacing.component.paddingLG,
    flexDirection: 'row',
    gap: Spacing.component.gapSM,
  },

  // FAB text (for extended FAB)
  text: {
    ...Typography.styles.labelLarge,
    color: theme.onPrimary,
  },

  // Small FAB
  small: {
    width: 40,
    height: 40,
    borderRadius: Border.radius.md,
  },

  // Large FAB
  large: {
    width: 96,
    height: 96,
    borderRadius: Border.radius.xl,
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
  chip: ChipStyles,
  fab: FABStyles,
};

export default ComponentStyles;
