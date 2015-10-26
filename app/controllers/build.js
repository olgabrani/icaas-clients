import Ember from 'ember';
import {raw as ajax} from 'ic-ajax';

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
  }.property('settings.storage_view_url', 'model.log'),

  log_loader: false,
  log_contents: null,
  log_btn_txt: function(){
    return this.get('log_contents')? 'Hide':'Show';
  }.property('log_contents'),

  watchModelChange: function(){
    this.set('log_contents', null);
  }.observes('model.id'),

  watchModelDeleted: function(){
    if (this.get('model.isDeleted')) {
      this.transitionTo('builds');
    }
  }.observes('model.isDeleted'),

  showConfirm: false,

  actions: {
    openConfirm(){
      this.set('showConfirm', true);
    },
    
    closeConfirm() {
      this.set('showConfirm', false);
    },

    cancel() {
      var build = this.get('model');
      var self = this;
      build.set('action', 'cancel');
      build.save().then(function(){
      }, function(err){
        self.send('error', err);
      }); 
    },

    toggle_log() {
      if (this.get('log_contents')) {
        this.set('log_contents', null);
        return;
      }
      this.send('load_log');
    },

    load_log() {
      var self = this;
      this.set('log_loader', true);
      return ajax({
        url: self.get('log_url'),
        method: 'GET',
        type: 'json',
      }).then(function(data) {
        if (data.response.startsWith("<!")){
          self.set('log_contents', 'You must be logged in to Pithos to view the file');
        } else {
          self.set('log_contents', data.response);
        }
        self.set('log_loader', false);
      }, function(){
        self.set('log_contents', 'No log available');
        self.set('log_loader', false);
      });
    }
  }
});
