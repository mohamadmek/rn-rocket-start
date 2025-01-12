# Local Storage Service

This `local storage` service provides a robust and type-safe way to manage device-specific and application-level data using **Zod**, **AsyncStorage**, and **MMKV**. It ensures data integrity, type safety, and efficient storage handling for both web and native environments.

## 🚀 Features

- **Type Safety:** Powered by Zod schema validation.
- **Dual Storage:** Supports both **AsyncStorage** for web and **MMKV** for React Native.
- **Scoped Storage:** Use scopes and keys for organized data management.
- **Secure Token Management:** Handles `refreshToken` and other sensitive data safely.

---

## 📦 Project Structure

- **`schema.ts`**: Defines the data schema using Zod for type safety.
- **`index.ts`**: Main class implementing data storage using `MMKV`.
- **`index.web.ts`**: Web fallback implementation using `AsyncStorage`.

---

## 🛠️ Setup and Usage

### 1. **Setting Up Default Storage:**

```typescript
import { deviceStorage } from './deviceStorage';

deviceStorage.set(['colorMode'], 'dark');
```

### 2. **Retrieving Data:**

```typescript
const colorMode = deviceStorage.get(['colorMode']);
console.log(colorMode); // 'dark'
```

### 3. **Removing Data:**

```typescript
deviceStorage.remove(['colorMode']);
```

---

## 📄 Type Definitions

### **TLocalStorageSchema (Zod Schema)**

```typescript
export const schema = z.object({
  fontScale: z.enum(['-2', '-1', '0', '1', '2']),
  fontFamily: z.enum(['system', 'theme']),
  appLanguage: z.string(),
  colorMode: z.enum(['system', 'light', 'dark']),
  darkTheme: z.enum(['dim', 'dark']).optional(),
  refreshToken: z.string().nullable(),
});
```

### **Storage Class Example:**

```typescript
export class Storage<Scopes extends unknown[], Schema> {
  private store: MMKV;

  constructor({ id }: { id: string }) {
    this.store = new MMKV({ id });
  }

  set<Key extends keyof Schema>(
    scopes: [...Scopes, Key],
    data: Schema[Key],
  ): void {
    this.store.set(scopes.join(this.sep), JSON.stringify({ data }));
  }
}
```

---

## 📚 Best Practices

- **Type Safety:** Always validate data using `Zod` before storing.
- **Avoid Sensitive Data Storage:** Avoid storing sensitive data like passwords in local storage.
- **Clear Scoped Data:** Use scoped removal for efficient data management.

---

🎯 **Contributors:**
Maintained by Mohamad Meksasi

---

Happy Coding! 🚀
