import QueryString from 'qs';
import { TApiEndpoint, TApiVersion, TUrlType } from './url.types';
import { replacePathParams } from './replacePathParams';

const buildUrlFromApiEndpoint = <P extends TApiEndpoint>(
  path: P,
  version: TApiVersion = 'v1',
): string =>
  '/' +
  version +
  (!path?.[1]
    ? path?.[0]
    : replacePathParams((path?.[0] as string) ?? '', path?.[1]));

export const buildApiEndpoint = (url: TUrlType) => {
  if (!url) return url;

  if (typeof url === 'string') return url;

  const query = url?.[2] ? `?${QueryString.stringify(url[2])}` : '';

  if (Array.isArray(url[0]))
    return (
      buildUrlFromApiEndpoint(url[0] as TApiEndpoint, url[1] as TApiVersion) +
      query
    );

  return buildUrlFromApiEndpoint(url as TApiEndpoint) + query;
};
