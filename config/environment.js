/* jshint node: true */
var endpoints = require('./endpoints');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'icaas',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    i18n: {
      defaultLocale: 'en'
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self'", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' *", // Allow fonts to be loaded from everywhere
      'connect-src': "'self' * ", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "'self' *",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.appSettings = endpoints.development
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.appSettings = endpoints.production;
  }

  return ENV;
};
