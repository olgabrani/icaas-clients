import Ember from 'ember';

export default Ember.Object.extend({
  tokenInfo: null,
  token: null,
  uuid: null,
  username: null,

  authURL: 'https://accounts.example.com/identity/v2.0',
  serviceURL: 'http://example.com/icaas',
  storageURL: 'https://pithos.example.com/object-store/v1',
  computeURL: 'https://cyclades.example.com/'

});
