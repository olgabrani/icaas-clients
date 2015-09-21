import Ember from 'ember';

export default Ember.Controller.extend({

  log_url: function(){
    let storage_view_url = this.get('settings.storage_view_url');
    let uuid = this.get('settings.uuid');
    let log = this.get('model').get('log');
    if (log) {
      return `${storage_view_url}/${uuid}/${log}`;
    }
    return '*';
  }.property('settings.storag_view_url', 'model.log'),

  actions: {
    'hide': function(){
      this.transitionToRoute('builds');
    }
  }
});
