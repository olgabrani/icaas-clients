/* jshint node: true */

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
    ENV.appSettings = {
      'branding': {
        STORAGE_LOGO_URL: 'https://example.com/static/branding/images/storage_logo.png'
      },
      auth_url: 'https://accounts.example.com/identity/v2.0',
      service_url: 'http://example.com/icaas',
      storage_url: 'https://pithos.example.com/object-store/v1',
      compute_url: 'https://cyclades.example.com/',
      storage_view_url: 'https://pithos.example.com/ui/view'
    }
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

  }

  return ENV;
};
