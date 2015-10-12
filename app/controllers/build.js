import Ember from 'ember';

export default Ember.Controller.extend({
  isCompleted: Ember.computed.equal('model.status', 'COMPLETED'),
  isError: Ember.computed.equal('model.status', 'ERROR'),
  isCreating: Ember.computed.equal('model.status', 'CREATING'),

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
    cancel() {
      var build = this.get('model');
      build.set('action', 'cancel');
      build.save();

    }
  }
});
