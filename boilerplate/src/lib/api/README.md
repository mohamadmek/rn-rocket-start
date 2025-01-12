# API Service

This API service is designed to handle HTTP requests using **Axios** with a well-structured API engine that supports interceptors, access and refresh tokens, and type-safe URL handling.

## 🚀 Features

- **Axios Interceptors:** Automatically handle token refresh and request retries.
- **Access and Refresh Token Management:** Securely manage access tokens and refresh tokens.
- **TypeScript Typings:** Strongly typed URLs, query parameters, and API configurations.
- **Centralized API Configuration:** Default settings for base URL, timeout, and token behavior.

---

## 📦 Project Structure

- **`api.ts`**: Main API instance setup with interceptors.
- **`AccessTokenContext.ts`**: Manages access tokens using React Context.
- **`defaults.ts`**: Contains default Axios configurations and types.
- **`urls/buildApiEndpoint.ts`**: Helper function for building URLs with path parameters and query strings.
- **`urls/auth.urls.types.ts`**: Typed URL definitions for API endpoints.
- **`storage/schema.ts`**: Defines the schema for local storage handling.

---

## 🛠️ Setup and Usage

### 1. **Creating an Axios Instance with Defaults:**

```typescript
import axios from 'axios';
import { axiosDefaultRequestConfig } from './defaults';

export const api = axios.create(axiosDefaultRequestConfig);
```

### 2. **Using the API Service:**

```typescript
import { useApiService } from './api';

const { axiosBaseQuery } = useApiService();

await axiosBaseQuery({
  method: 'GET',
  url: ['/users/logout'],
  is_public: false,
});
```

### 3. **Interceptor Logic:**

- **Request Interceptor:**
  - Adds the access token to the headers.
  - Refreshes the token if expired.
- **Response Interceptor:** _(Commented but available for expansion)_

```typescript
api.interceptors.request.use((config) => {
  if (config.is_public) return config;
  const { accessToken } = useAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
```

### 4. **Type-Safe URL Handling Example:**

```typescript
type TAuthApiEndpoints =
  | ['/auth/refresh']
  | ['/users/logout']
  | ['/addresses/:id', { id: number }];
```

### 5. **Building Endpoints with Parameters:**

```typescript
import { buildApiEndpoint } from './urls/buildApiEndpoint';

const endpoint = buildApiEndpoint(['/addresses/:id', { id: 123 }]);
console.log(endpoint); // Outputs: API_BASE_URL/addresses/123
```

---

## 📖 Type Definitions

### **IAxiosDefaultRequestConfig:**

```typescript
export interface IAxiosDefaultRequestConfig extends AxiosRequestConfig {
  retry: boolean;
  is_public: boolean;
}
```

### **BaseQueryFnArgs:**

```typescript
export interface BaseQueryFnArgs {
  method?: Method;
  url: TUrlType;
  params?: AxiosRequestConfig['params'];
  data?: AxiosRequestConfig['data'];
  is_public: boolean;
}
```

---

## 📚 Best Practices

- **Token Management:** Always use `is_public` for non-authenticated requests.
- **Type Safety:** Define all URLs and their parameters using TypeScript types.
- **Interceptors:** Use the provided request and response interceptors for secure API handling.

---

🎯 **Contributors:**  
Maintained by Mohamad Meksasi

---

Happy Coding! 🚀
