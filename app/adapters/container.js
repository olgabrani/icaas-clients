import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: function(){
    return this.get('settings.storageURL');
  }.property('settings.storageURL'),
  headers: function(){
    return {
     "X-auth-token": this.get('settings.token'),
    };
  }.property('settings.token'),

  pathForType: function(){
    return this.get('settings.uuid');
  },



});
