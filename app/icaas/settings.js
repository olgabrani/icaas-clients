import Ember from 'ember';
import config from 'icaas/config/environment';

var alias = Ember.computed.alias;

export default Ember.Object.extend({
  tokenInfo: null,
  token: null,
  uuid: null,
  username: null,

  // This will be used to construct the storage path of the uploaded image.
  // The user chooses the container, and the build name, so the
  // `image` sent during build creation will be
  // {container_id}/{image_path}/{{image_name}
  image_path: 'icaas_images',

  auth_url: alias('appSettings.auth_url'),
  service_url: alias('appSettings.service_url'),
  storage_url: alias('appSettings.storage_url'),
  compute_url: alias('appSettings.compute_url'),


  // app settings defined in conf/environment.js
  appSettings: function(){
    return config.appSettings;
  }.property('config.appSettings'),

  logo_url: alias('appSettings.branding.STORAGE_LOGO_URL')

});
