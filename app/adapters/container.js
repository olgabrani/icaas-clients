import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'https://pithos.example.com/object-store/v1',
  headers: function(){
    return {
     "X-auth-token": this.get('settings.token'),
    };
  }.property(),

  pathForType: function(){
    return this.get('settings.uuid');
  },



});
