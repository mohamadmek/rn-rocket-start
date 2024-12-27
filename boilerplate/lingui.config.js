/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'de'],
  catalogs: [
    {
      path: '<rootDir>/src/locale/locales/{locale}/messages',
      include: ['src', 'app'],
    },
  ],
  format: 'po',
};
