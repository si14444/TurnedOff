# TurnedOff Design System

A sophisticated, gray-toned design system for the TurnedOff mobile application. This design system provides a comprehensive set of design tokens, components, and guidelines for creating a consistent, modern, and elegant user interface.

## 📐 Design Philosophy

**Core Principles:**
- **Minimalism**: Clean, uncluttered interfaces with purposeful use of space
- **Sophistication**: Elegant gray tones creating a refined, professional aesthetic
- **Consistency**: Unified design language across all components and screens
- **Accessibility**: WCAG-compliant color contrasts and readable typography
- **Flexibility**: Adaptable components supporting light and dark modes

---

## 🎨 Color System

### Gray Palette Foundation

Our design system is built on four complementary gray palettes, each serving specific purposes:

#### 1. **Base Grays** (Neutral Foundation)
The primary gray scale for most UI elements:
- `gray.50` to `gray.900` - Full spectrum from lightest to darkest
- Usage: Backgrounds, text, borders, general UI elements

#### 2. **Warm Grays** (Sophisticated Warmth)
Grays with warm undertones for inviting interfaces:
- `warmGray.50` to `warmGray.900`
- Usage: Secondary actions, cards, warm accents

#### 3. **Cool Grays** (Modern & Clean)
Grays with cool, blue undertones:
- `coolGray.50` to `coolGray.900`
- Usage: Success states, info messages, technical elements

#### 4. **Slate Grays** (Professional Depth)
Rich, deep grays for primary actions:
- `slate.50` to `slate.900`
- Usage: Primary buttons, headers, emphasis elements

### Semantic Color System

Pre-defined semantic colors ensure consistent usage:

```typescript
Colors.semantic = {
  background: {
    primary: '#FFFFFF',    // Main background
    secondary: '#FAFAFA',  // Subtle backgrounds
    tertiary: '#F5F5F5',   // Cards, elevated surfaces
    elevated: '#FFFFFF',   // Modals, sheets
    overlay: 'rgba(0, 0, 0, 0.5)', // Dimming overlay
  },
  text: {
    primary: '#212121',    // Main text
    secondary: '#616161',  // Supporting text
    tertiary: '#9E9E9E',   // Hints, captions
    disabled: '#BDBDBD',   // Disabled state
    inverse: '#FFFFFF',    // Text on dark backgrounds
  },
  border: {
    subtle: '#F5F5F5',     // Barely visible
    default: '#EEEEEE',    // Standard borders
    medium: '#E0E0E0',     // Emphasized borders
    strong: '#BDBDBD',     // Strong separation
  },
  interactive: {
    default: '#64748B',    // Interactive elements
    hover: '#475569',      // Hover state
    active: '#334155',     // Active/pressed state
    disabled: '#E0E0E0',   // Disabled state
    focus: '#64748B',      // Focus ring
  },
}
```

### Accent Colors

Subtle highlights for specific UI states:
- **Primary**: `#64748B` (Slate 500) - Primary actions
- **Secondary**: `#78716C` (Warm Gray 500) - Secondary actions
- **Success**: `#6B7280` (Cool Gray 500) - Success states
- **Warning**: `#A8A29E` (Warm Gray 400) - Warnings
- **Error**: `#757575` (Gray 600) - Error states
- **Info**: `#94A3B8` (Slate 400) - Information

### Dark Mode

Complete dark mode palette with inverted semantics:
```typescript
Colors.dark.semantic.background.primary = '#121212'
Colors.dark.semantic.text.primary = '#F5F5F5'
// See DesignSystem.ts for full dark mode specifications
```

---

## ✍️ Typography

### Font System

- **Primary Font**: System default (San Francisco on iOS, Roboto on Android)
- **Monospace Font**: Menlo (for code/technical content)

### Type Scale

Mobile-first sizing (pixels):
- `xs`: 12px - Captions, labels
- `sm`: 14px - Small text
- `base`: 16px - Body text (default)
- `lg`: 18px - Large body
- `xl`: 20px - Subheadings
- `2xl`: 24px - Headings
- `3xl`: 30px - Large headings
- `4xl`: 36px - Display text
- `5xl`: 48px - Hero text

### Font Weights

- `light`: 300
- `regular`: 400 (default)
- `medium`: 500
- `semibold`: 600
- `bold`: 700

### Text Styles

Pre-configured text styles for consistency:

```typescript
Typography.styles = {
  h1: { fontSize: 36, fontWeight: '700', lineHeight: 1.2 },
  h2: { fontSize: 30, fontWeight: '700', lineHeight: 1.2 },
  h3: { fontSize: 24, fontWeight: '600', lineHeight: 1.375 },
  h4: { fontSize: 20, fontWeight: '600', lineHeight: 1.375 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 1.5 },
  bodyLarge: { fontSize: 18, fontWeight: '400', lineHeight: 1.5 },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 1.5 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 1.375 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 1.5 },
}
```

### Typography Guidelines

1. **Hierarchy**: Use size and weight to establish clear visual hierarchy
2. **Line Height**: Maintain comfortable reading with 1.5 line height for body text
3. **Letter Spacing**: Subtle adjustments for headings (-0.025em) and captions (0.025em)
4. **Color**: Use semantic text colors for consistent contrast ratios

---

## 📏 Spacing System

### Base Unit: 4px

All spacing values are multiples of 4px for visual harmony:

```
0: 0px
1: 4px    (0.25rem)
2: 8px    (0.5rem)
3: 12px   (0.75rem)
4: 16px   (1rem)
5: 20px   (1.25rem)
6: 24px   (1.5rem)
8: 32px   (2rem)
10: 40px  (2.5rem)
12: 48px  (3rem)
16: 64px  (4rem)
20: 80px  (5rem)
24: 96px  (6rem)
```

### Semantic Spacing

Named spacing for common use cases:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

### Component Spacing

Pre-defined spacing for components:
- **Padding**: xs (8px), sm (12px), md (16px), lg (24px), xl (32px)
- **Margin**: xs (8px), sm (12px), md (16px), lg (24px), xl (32px)
- **Gap**: xs (4px), sm (8px), md (12px), lg (16px), xl (24px)

### Layout Spacing

- **Container Padding**: 16px (standard screen padding)
- **Section Gap**: 32px (spacing between major sections)
- **Grid Gap**: 16px (spacing between grid items)

---

## 🎯 Borders & Radius

### Border Widths

- `none`: 0
- `thin`: 1px (default)
- `medium`: 2px (emphasis)
- `thick`: 4px (strong emphasis)

### Border Radius

- `none`: 0 (sharp corners)
- `sm`: 4px (subtle rounding)
- `md`: 8px (standard, most common)
- `lg`: 12px (cards, containers)
- `xl`: 16px (prominent elements)
- `2xl`: 24px (modals, sheets)
- `full`: 9999px (circles, pills)

### Border Styles

- `solid`: Standard borders
- `dashed`: Visual breaks
- `dotted`: Subtle separation

---

## 🌓 Shadows & Elevation

### Shadow Scale

Shadows create depth and hierarchy:

- **sm**: Subtle elevation (buttons, inputs)
- **md**: Card elevation
- **lg**: Prominent elements
- **xl**: Floating elements
- **2xl**: Modal dialogs

### Semantic Shadows

Pre-configured shadows for components:
- `Shadow.card`: Standard card elevation
- `Shadow.button`: Button depth
- `Shadow.modal`: Modal/dialog elevation

### Usage Guidelines

1. Use shadows sparingly for visual hierarchy
2. Larger shadows = higher importance
3. Combine with border radius for modern look
4. Dark mode: Reduce shadow opacity by 50%

---

## 🎨 Component Specifications

### Buttons

**Variants:**
- **Primary**: Slate background, white text
- **Secondary**: Warm gray background, white text
- **Outline**: Transparent bg, gray border
- **Ghost**: Transparent bg, no border

**Sizes:**
- **Small**: 8px vertical, 16px horizontal padding
- **Medium**: 12px vertical, 24px horizontal padding (default)
- **Large**: 16px vertical, 32px horizontal padding

**States:**
- Default, Hover, Active, Disabled, Focus

**Usage:**
```typescript
import { ButtonStyles } from '@/constants/ComponentStyles';

<Pressable style={[ButtonStyles.base, ButtonStyles.primary]}>
  <Text style={ButtonStyles.text}>Primary Button</Text>
</Pressable>
```

### Cards

**Variants:**
- **Base**: Standard card with subtle shadow
- **Elevated**: Higher elevation with larger shadow
- **Outlined**: Border instead of shadow

**Sections:**
- Header: Top section with optional title
- Content: Main content area
- Footer: Bottom section with actions/meta

**Usage:**
```typescript
import { CardStyles } from '@/constants/ComponentStyles';

<View style={CardStyles.base}>
  <View style={CardStyles.header}>
    <Text style={TextStyles.h3}>Card Title</Text>
  </View>
  <View style={CardStyles.content}>
    <Text style={TextStyles.body}>Card content...</Text>
  </View>
</View>
```

### Input Fields

**Components:**
- Container: Wrapper with margin
- Label: Field label with medium weight
- Input: Text input field
- Helper Text: Supporting information
- Error Text: Validation messages

**States:**
- Default, Focused, Error, Disabled

**Usage:**
```typescript
import { InputStyles } from '@/constants/ComponentStyles';

<View style={InputStyles.container}>
  <Text style={InputStyles.label}>Email</Text>
  <TextInput style={InputStyles.input} />
  <Text style={InputStyles.helperText}>Enter your email</Text>
</View>
```

### Additional Components

Pre-configured styles available:
- **Typography**: h1-h4, body, caption variants
- **Containers**: Screen, content, centered layouts
- **Dividers**: Horizontal, vertical, subtle, strong
- **Badges**: Default, primary, success, warning, error
- **Avatars**: Small (32px), medium (48px), large (64px), xlarge (96px)
- **List Items**: Base, pressable, with leading/trailing
- **Modals**: Overlay, container, header, footer
- **Tabs**: Tab bar, tab items, active states

---

## 📱 Layout System

### Container Widths

Responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Grid System

- **Columns**: 12-column grid
- **Gap**: 16px between columns

### Breakpoints

- `xs`: 0px (mobile)
- `sm`: 375px (small mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

---

## ⚡ Animation & Transitions

### Duration

- `fast`: 150ms (micro-interactions)
- `normal`: 300ms (standard transitions)
- `slow`: 500ms (complex animations)

### Easing

- `linear`: Constant speed
- `easeIn`: Slow start
- `easeOut`: Slow end
- `easeInOut`: Slow start and end

### Guidelines

1. Use animations purposefully
2. Keep animations subtle and fast
3. Respect user motion preferences
4. Use easeOut for most UI transitions

---

## 🎭 Opacity Scale

Standard opacity values:
- `0`: 0% (invisible)
- `10`: 10%
- `20`: 20%
- `30`: 30%
- `40`: 40%
- `50`: 50% (half transparent)
- `60`: 60%
- `70`: 70%
- `80`: 80%
- `90`: 90%
- `100`: 100% (fully opaque)

---

## 🔝 Z-Index Scale

Layering hierarchy:
- `base`: 0 (default)
- `dropdown`: 1000
- `sticky`: 1020
- `fixed`: 1030
- `modalBackdrop`: 1040
- `modal`: 1050
- `popover`: 1060
- `tooltip`: 1070

---

## 🚀 Usage Guide

### Importing the Design System

```typescript
// Import full design system
import DesignSystem from '@/constants/DesignSystem';
const { colors, typography, spacing } = DesignSystem;

// Or import specific modules
import { Colors, Typography, Spacing } from '@/constants/DesignSystem';

// Import component styles
import ComponentStyles from '@/constants/ComponentStyles';
const { button, card, input } = ComponentStyles;
```

### Creating Custom Styles

```typescript
import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Border } from '@/constants/DesignSystem';

const styles = StyleSheet.create({
  customCard: {
    backgroundColor: Colors.semantic.background.elevated,
    padding: Spacing.component.padding.lg,
    borderRadius: Border.radius.lg,
    ...Shadow.card,
  },
  customText: {
    ...Typography.styles.body,
    color: Colors.semantic.text.primary,
  },
});
```

### Using Pre-built Component Styles

```typescript
import { ButtonStyles, TextStyles } from '@/constants/ComponentStyles';

<Pressable style={[ButtonStyles.base, ButtonStyles.primary, ButtonStyles.large]}>
  <Text style={ButtonStyles.text}>Click Me</Text>
</Pressable>
```

---

## 🎯 Best Practices

### Color Usage

1. **Stick to semantic colors** for consistency
2. **Use accent colors sparingly** for emphasis
3. **Ensure sufficient contrast** (WCAG AA minimum)
4. **Test in both light and dark modes**
5. **Don't use pure black** - use `gray.900` instead

### Typography

1. **Establish clear hierarchy** with size and weight
2. **Limit font sizes** to the defined scale
3. **Use system fonts** for performance
4. **Keep line length** between 50-75 characters
5. **Maintain consistent spacing** between text elements

### Spacing

1. **Use the 4px grid** for all spacing
2. **Create breathing room** with adequate padding
3. **Group related elements** with consistent spacing
4. **Use semantic spacing names** when possible
5. **Be consistent** across similar components

### Components

1. **Reuse pre-built styles** when possible
2. **Compose styles** using arrays for variants
3. **Create custom variants** that extend base styles
4. **Document custom components** with usage examples
5. **Test components** in multiple states and themes

---

## 📦 File Structure

```
constants/
├── DesignSystem.ts       # Core design tokens
├── ComponentStyles.ts    # Component style specifications
└── DESIGN_SYSTEM.md     # This documentation
```

---

## 🔄 Updating the Design System

When making changes:

1. **Update design tokens** in `DesignSystem.ts`
2. **Update component styles** in `ComponentStyles.ts`
3. **Document changes** in this file
4. **Test thoroughly** in light and dark modes
5. **Communicate changes** to the development team

---

## 🎨 Design Tokens Summary

### Quick Reference

```typescript
// Colors
Colors.gray[500]                    // #9E9E9E
Colors.slate[600]                   // #475569
Colors.semantic.background.primary  // #FFFFFF
Colors.semantic.text.primary        // #212121

// Typography
Typography.fontSize.base            // 16
Typography.fontWeight.semibold      // '600'
Typography.styles.h1                // Pre-configured heading style

// Spacing
Spacing[4]                          // 16
Spacing.semantic.md                 // 16
Spacing.component.padding.md        // 16

// Border
Border.radius.md                    // 8
Border.width.thin                   // 1

// Shadow
Shadow.card                         // Pre-configured card shadow
Shadow.md                           // Medium shadow
```

---

## 📞 Support

For questions or suggestions about the design system:
1. Review this documentation
2. Check existing component implementations
3. Propose changes through the team review process
4. Update documentation when making improvements

---

**Version**: 1.0.0
**Last Updated**: 2025-11-02
**Maintainer**: TurnedOff Design Team
