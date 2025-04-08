import QueryString from 'qs';
import { TApiEndpoint, TApiVersion, TUrlType } from './url.types';
import { replacePathParams } from './replacePathParams';

/**
 * Builds a complete API endpoint URL from an API endpoint definition
 * @param path The API endpoint path
 * @param version API version to use (defaults to 'v1')
 * @returns Fully formed API endpoint path with replaced parameters
 */
const buildUrlFromApiEndpoint = <P extends TApiEndpoint>(
  path: P,
  version: TApiVersion = 'v1',
): string => {
  // Handle empty paths
  if (!path || !path[0]) {
    return '';
  }

  // Base path with version prefix
  const basePath = `/${version}`;

  // If no path parameters, just return the base path + endpoint
  if (!path[1]) {
    return `${basePath}${path[0]}`;
  }

  // Replace path parameters and return
  return `${basePath}${replacePathParams(path[0] as string, path[1])}`;
};

/**
 * Builds a complete API endpoint URL from various URL type formats
 * Supports string URLs, API endpoint definitions, and API endpoints with versions
 *
 * @param url The URL specification (string, endpoint tuple, or endpoint+version tuple)
 * @returns A fully formed URL string with parameters replaced and query params added
 */
export const buildApiEndpoint = (url: TUrlType): string => {
  // Handle empty urls
  if (!url) {
    return '';
  }

  // If url is already a string, return it directly
  if (typeof url === 'string') {
    return url;
  }

  // Handle query parameters if present
  const query = url[2] ? `?${QueryString.stringify(url[2])}` : '';

  // Handle nested array format for versioned endpoints
  if (Array.isArray(url[0])) {
    return (
      buildUrlFromApiEndpoint(url[0] as TApiEndpoint, url[1] as TApiVersion) +
      query
    );
  }

  // Handle standard endpoint format
  return buildUrlFromApiEndpoint(url as TApiEndpoint) + query;
};
