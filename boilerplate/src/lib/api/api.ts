import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import { deviceStorage } from '../storage';
import {
  axiosDefaultRequestConfig,
  IAddedAxiosRequestConfig,
  IAxiosDefaultRequestConfig,
} from './defaults';
import { TLocalStorageSchema } from '../storage/schema';
import { TUrlType } from './urls/url.types';
import { buildApiEndpoint } from './urls/buildApiEndpoint';
import { useAuthStore } from './AccessTokenContext';

// CREATE API INSTANCE WITH DEFAULTS
export const api = axios.create(axiosDefaultRequestConfig);

interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig,
    Partial<IAddedAxiosRequestConfig> {}

const getNewToken = (refreshToken: TLocalStorageSchema['refreshToken']) => {
  return refreshToken || '';
};
const logout = () => {};

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

const { accessToken, setAccessToken } = useAuthStore.getState();

// ************************************************************
// REQUEST INTERCEPTOR
// ************************************************************
api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  if (config.is_public) return config;

  const refreshToken = deviceStorage.get(['refreshToken']);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    // No access token, see if we can get one with a refresh token
    try {
      if (!refreshToken) {
        throw new Error();
      }

      const token = getNewToken(refreshToken);
      setAccessToken(token);
      // We received new token, save to context
      // setAccessToken(token);
      // Add new tokens to our headers, mark as a retry (so interceptors don't try and get more new tokens)
      config.headers.Authorization = `Bearer ${token}`;
      config.retry = true;
      return config;
    } catch (error) {
      // clear user and reject, if we have no token and have failed to get a new one
      logout();
      return Promise.reject(error);
    }
  }
  return config;
});

// ************************************************************
// RESPONSE INTERCEPTOR
// ************************************************************
// api.interceptors.response.use(
//   (resolved) => resolved,
//   async (error) => {},
// );

export const axiosBaseQuery = async (args: BaseQueryFnArgs) => {
  const { method = 'GET', url, params, data, is_public, headers } = args;
  try {
    const response = await api({
      method,
      url: buildApiEndpoint(url),
      data,
      params,
      ...(is_public !== undefined ? { is_public } : {}),
      headers: headers,
    } as IAxiosDefaultRequestConfig);
    return response.data;
  } catch (axiosError) {
    // Throw the error with the translated message and status depend on your preferences
    throw axiosError;
  }
};
