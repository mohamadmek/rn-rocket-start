# Theme Feature

This `theme` feature provides a scalable and flexible approach for managing themes, fonts, and color schemes in a React project. It supports multiple themes with dynamic switching, font scaling, and type-safe theme handling.

## 🚀 Features

- **Multiple Themes:** Supports `light`, `dark`, and `dim` themes.
- **Font Management:** Dynamically adjusts font scaling and families.
- **Color Tokens:** Centralized theme tokens for consistent styling.
- **Type Safety:** Strongly typed themes and tokens using TypeScript.
- **Context Management:** Manages color modes and themes using React Context.
- **Breakpoints and Gutters:** Built-in responsive design support.
- **Atoms Usage:** Utility classes for consistent styling across components.

---

## 📦 Project Structure

- **`Context.ts`**: Provides a React context for theme handling and color mode preferences.
- **`themes.ts`**: Creates and manages multiple themes.
- **`tokens.ts`**: Contains core design tokens like colors, spacing, and font sizes.
- **`types.ts`**: Defines TypeScript types for themes and palettes.
- **`utils` folder**: Utility functions for working with themes and breakpoints.
- **`atoms.ts`**: Contains reusable style utilities and atoms.

---

## 🛠️ Setup and Usage

### 1. **Setting Up the Theme Provider:**

```tsx
import { ThemeProvider } from './theme';

const App = () => {
  return (
    <ThemeProvider theme="light">
      <MainComponent />
    </ThemeProvider>
  );
};
export default App;
```

### 2. **Accessing the Current Theme:**

```tsx
import { useTheme } from './theme';

const MyComponent = () => {
  const theme = useTheme();
  return <Text style={{ color: theme.palette.primary }}>Hello World</Text>;
};
```

### 3. **Managing Font Scaling and Families:**

```tsx
import { useAlf } from './theme';

const FontAdjuster = () => {
  const { fonts } = useAlf();
  return (
    <Button onPress={() => fonts.setFontScale(1.2)}>Increase Font Size</Button>
  );
};
```

### 4. **Using Atoms for Styling:**

```tsx
import { atoms as a } from '@/src/theme';
import { View } from 'react-native';

const StyledBox = () => {
  return <View style={[a.absolute, a.border]} />;
};
```

### 5. **Creating a New Theme:**

```tsx
import { createThemes } from './theme';

const themes = createThemes({
  mainColors: {
    primary: 'blue',
    secondary: 'green',
  },
});
```

---

## 📄 Type Definitions

### **Theme Interface:**

```typescript
export type Theme = {
  scheme: 'light' | 'dark' | 'dim';
  name: ThemeName;
  palette: Palette;
  atoms: ThemedAtoms;
};
```

### **Palette Interface:**

```typescript
export type Palette = {
  white: string;
  black: string;
  primary: string;
  secondary: string;
};
```

---

## 📚 Best Practices

- **Consistent Token Usage:** Use design tokens for all colors and spacing.
- **Avoid Inline Styles:** Prefer the `atoms` system for consistent styling.
- **Type Safety:** Leverage TypeScript interfaces for all theme-related logic.
- **Context Management:** Use React Context for managing color modes and theme preferences.

---

🎯 **Contributors:**
Maintained by Mohamad Meksasi

---

Happy Theming! 🎨
