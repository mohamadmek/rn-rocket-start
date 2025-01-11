import { TAuthApiEndpoints } from './auth.urls.types';

export type TApiVersion = 'v1' | 'v2';
export type TApiEndpoint = TAuthApiEndpoints;
// if there is multiple you just add them
// export type TApiEndpoint = TAuthApiEndpoints | TOtherApiEndpoints

export type TUrlType = string | TApiEndpoint | [TApiEndpoint, TApiVersion];
