/**
 * @namespace Constants
 * @summary constants used across the app.
 */
const Constants = {
  SITE_BRAND: 'yourBrand',
  DOMAIN_NAME: 'yourbrand.com',
  SUPPORT_EMAIL: 'support@yourbrand.com',
  SITE_TWITTER: '@yourBrand',
  AUTH_SERVICES: ['password', 'facebook'],
  ALL_ROLES: ['admin', 'normal'],
  ROUTES: [
    { path: '/', label: 'Home' },
    { path: '/admin', label: 'Admin', admin: true },
  ],
};

export default Constants;
