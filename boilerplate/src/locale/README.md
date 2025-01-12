# Locale Service

This `locale` service provides a comprehensive and type-safe solution for managing app localization and language preferences using **expo-localization** and **@lingui/core**. It ensures proper language detection, dynamic activation of language resources, and flexible language mappings.

## 🚀 Features

- **Device Locale Management:** Automatic detection of device language using `expo-localization`.
- **Language Codes Conversion:** Utilities for converting between ISO language codes (code2 and code3).
- **Dynamic Language Loading:** Efficiently loads language files as needed.
- **State Management:** Context-based language state using React.

---

## 📦 Project Structure

- **`deviceLocales.ts`**: Manages device locale detection and language code deduplication.
- **`languages.ts`**: Contains language code mappings and constants.
- **`helpers.ts`**: Utility functions for language conversion and sanitization.
- **`state.ts`**: Context management for storing and updating the current app language.
- **`i18n.ts`**: Language resource handling and dynamic loading.
- **`locales/` folder**: Contains language resource files (`en`, `de`, etc.).

---

## 🛠️ Setup and Usage

### 1. **Setting Up the Language Provider:**

```tsx
import { AppLanguageProvider } from './state';

const App = () => {
  return (
    <AppLanguageProvider>
      <MainComponent />
    </AppLanguageProvider>
  );
};
export default App;
```

### 2. **Accessing the Current Language:**

```tsx
import { useAppLanguageStore } from './state';

const CurrentLanguage = () => {
  const { appLanguage } = useAppLanguageStore();
  return <Text>Current Language: {appLanguage}</Text>;
};
```

### 3. **Updating the Language:**

```tsx
import { useSetAppLanguageStore } from './state';

const LanguageSwitcher = () => {
  const { setAppLanguage } = useSetAppLanguageStore();
  return <Button onPress={() => setAppLanguage('de')}>Switch to German</Button>;
};
```

### 4. **Dynamic Language Activation:**

```tsx
import { dynamicActivate } from './i18n';

await dynamicActivate('de');
```

### 5. Using Lingui for Translation:

#### 5.1 Setting Up Lingui CLI:

### Add the following scripts to your package.json for managing translations:

```ts
{
  "scripts": {
    "intl:extract": "lingui extract",
    "intl:compile": "lingui compile --typescript",
    "intl:build": "yarn intl:extract && yarn intl:compile"
  }
}
```

### 5.2 Extracting and Compiling Translations:

- Extract Translations: Run yarn intl:extract to extract all marked translations in your app to .po files.
- Compile Translations: Run yarn intl:compile to compile .po files into TypeScript files.
- Build Translations: Run yarn intl:build to both extract and compile translations in one command.

### 5.3 Using Translations in Components:

With Lingui integrated, use the Trans component and useLingui hook to handle dynamic text translations.

```tsx
import { Trans, useLingui } from '@lingui/react/macro';
import { i18n } from '@lingui/core';

const Inbox = ({ markAsRead }) => {
  const { t } = useLingui(); // Access translation function

  return (
    <View>
      <Text style={styles.heading}>
        <Trans>Message Inbox</Trans>
      </Text>
      <Button onPress={markAsRead} title={t`Mark messages as read`} />
    </View>
  );
};
```

---

### **Language Interface:**

```typescript
export type Language = {
  code2: string;
  code3: string;
  name: string;
};
```

---

## 📚 Best Practices

- **Use Proper Language Codes:** Follow BCP-47 standards for language tags.
- **Avoid Hardcoding:** Use dynamic language files and utilities for flexibility.
- **Type Safety:** Leverage Zod schemas for language validation.

---

🎯 **Contributors:**
Maintained by Mohamad Meksasi

---

Happy Coding! 🌍
