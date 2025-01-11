import type { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../constants';

export interface IAddedAxiosRequestConfig {
  // You can use it in the response interceptor, in the request interceptor you set it to true
  // and throw an error in the response interceptor
  // We've already tried once, log us out
  //  if (retry || !refresh_token) {
  //     throw new Error();
  //   }
  retry: boolean;
  // is_public if you pass it it will return config and bypass accessToken check for that api
  is_public: boolean;
}

export interface IAxiosDefaultRequestConfig
  extends AxiosRequestConfig,
    IAddedAxiosRequestConfig {}

// SETUP API DEFAULTS
export const axiosDefaultRequestConfig: IAxiosDefaultRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  retry: false,
  is_public: false,
};
