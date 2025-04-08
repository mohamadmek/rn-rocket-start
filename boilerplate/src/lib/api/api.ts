import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
  AxiosError,
  AxiosResponse,
} from 'axios';
import {
  axiosDefaultRequestConfig,
  IAddedAxiosRequestConfig,
  IAxiosDefaultRequestConfig,
} from './defaults';
import { TLocalStorageSchema } from '../storage/schema';
import { TUrlType } from './urls/url.types';
import { buildApiEndpoint } from './urls/buildApiEndpoint';
import { useAuthStore } from '../../context/authContext';
import { appStorage, removeFromStorage } from '../storage';

// CREATE API INSTANCE WITH DEFAULTS
export const api = axios.create(axiosDefaultRequestConfig);

interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig,
    Partial<IAddedAxiosRequestConfig> {}

/**
 * Fetch a new access token using the refresh token
 * @param refreshToken The refresh token to use
 * @returns A promise that resolves to the new access token
 */
const getNewToken = async (
  refreshToken: TLocalStorageSchema['refreshToken'],
): Promise<string> => {
  try {
    // This is where you'd typically make an API call to refresh the token
    // For example:
    // const response = await axios.post('/auth/refresh', { refreshToken });
    // return response.data.accessToken;

    // Placeholder implementation
    return refreshToken || '';
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

/**
 * Perform logout actions - clear tokens, redirect user, etc.
 */
const logout = () => {
  // Clear tokens from storage
  removeFromStorage('refreshToken');

  // Reset auth store
  const { resetAuth } = useAuthStore.getState();
  if (resetAuth) {
    resetAuth();
  }

  // Add any other logout logic here
  // For example, redirect to login screen
};

export interface BaseQueryFnArgs<
  Data = AxiosRequestConfig['data'] | undefined,
> {
  method?: Method;
  // So we can't pass any Url to axios we will use a function called buildApiEndpoint
  // that will create the url for us typed with params and query search
  url: TUrlType;
  params?: AxiosRequestConfig['params'];
  data?: Data;
  is_public: boolean;
  attempt_retry?: boolean;
  options?: AxiosRequestConfig;
  headers?: AxiosRequestConfig['headers'];
}

// ************************************************************
// REQUEST INTERCEPTOR
// ************************************************************
api.interceptors.request.use(async (config: CustomAxiosRequestConfig) => {
  // Public endpoints don't need authentication
  if (config.is_public) return config;

  // Get tokens
  const { accessToken, setAccessToken } = useAuthStore.getState();
  const refreshToken = appStorage.getRefreshToken();

  // If we have an access token, use it
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  // No access token, attempt to get a new one with the refresh token
  if (refreshToken && !config.retry) {
    try {
      const token = await getNewToken(refreshToken);

      // Save the new token to the auth store
      setAccessToken(token);

      // Add the new token to the headers and mark as a retry
      config.headers.Authorization = `Bearer ${token}`;
      config.retry = true;
      return config;
    } catch (error) {
      // Failed to refresh token, log the user out
      logout();
      return Promise.reject(error);
    }
  }

  // No tokens available and not a retry, logout
  if (!config.retry) {
    logout();
    return Promise.reject(new Error('No authentication tokens available'));
  }

  return config;
});

// ************************************************************
// RESPONSE INTERCEPTOR
// ************************************************************
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Handle 401 Unauthorized errors
    if (
      error.response?.status === 401 &&
      !originalRequest?.retry &&
      !originalRequest?.is_public
    ) {
      const refreshToken = appStorage.getRefreshToken();

      // If we have a refresh token, try to get a new access token
      if (refreshToken) {
        try {
          const { setAccessToken } = useAuthStore.getState();
          const token = await getNewToken(refreshToken);

          // Save the new token
          setAccessToken(token);

          // Update the original request with the new token and retry
          if (originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            originalRequest.retry = true;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          // Failed to refresh token, logout
          logout();
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, logout
        logout();
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Base query function for making API requests
 * @param args Request arguments
 * @returns Promise that resolves to the response data
 */
export const axiosBaseQuery = async <T = any>(
  args: BaseQueryFnArgs,
): Promise<T> => {
  const {
    method = 'GET',
    url,
    params,
    data,
    is_public,
    headers,
    options,
  } = args;

  try {
    const response = await api({
      method,
      url: buildApiEndpoint(url),
      data,
      params,
      ...(is_public !== undefined ? { is_public } : {}),
      headers,
      ...options,
    } as IAxiosDefaultRequestConfig);

    return response.data;
  } catch (axiosError) {
    const error = axiosError as AxiosError;

    // Format the error for better handling
    const formattedError = {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };

    // Log the error for debugging
    console.error('API request failed:', formattedError);

    // Rethrow with better formatting
    throw formattedError;
  }
};
