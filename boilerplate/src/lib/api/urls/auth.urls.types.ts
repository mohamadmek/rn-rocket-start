// This is an example for settings a urls types for a feature
export interface ITestParams {
  id: number;
}

export type TAuthApiEndpoints =
  | ['/auth/refresh']
  | ['/users/logout']
  | [
      '/addresses/paginated',
      object,
      { page: number; perPage: number; categories?: string },
    ]
  | ['/addresses/:id', ITestParams]
  | ['/todos/posts'];
