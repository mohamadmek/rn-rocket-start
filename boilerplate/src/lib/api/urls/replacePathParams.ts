import get from 'lodash.get';

export const replacePathParams = (
  pathInput: string | [string, object] = '',
  params: unknown,
): string => {
  const path = typeof pathInput === 'string' ? pathInput : pathInput[0];

  return !params
    ? path
    : path
        .split('/')
        .map((section) => {
          if (!section.startsWith(':')) return section;

          const value = get(params, section.substring(1));

          if (!value && __DEV__) {
            // if development, log to console for easier debugging
            console.warn('replacePathParams: param not found on object', {
              paramName: section,
              params,
            });
          }

          return value || section;
        })
        .join('/');
};
