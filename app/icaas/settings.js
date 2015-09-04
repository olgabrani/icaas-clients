import Ember from 'ember';

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

  authURL: 'https://accounts.example.com/identity/v2.0',
  serviceURL: 'http://example.com/icaas',
  storageURL: 'https://pithos.example.com/object-store/v1',
  computeURL: 'https://cyclades.example.com/'

});
