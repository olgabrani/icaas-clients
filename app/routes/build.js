import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model){
    var self = this;
    this._super(controller, model);
    model.reload().then(function(b){
      controller.set('model', b);
      self.scheduleRefresh();
    });
  },
  
  startTimer: function () {
    var self = this;
    var m = this.get('currentModel');

    // Reload the model only if it is in status CREATING
    if (m.get('status') === 'CREATING'){
      m.reload().then(function(){
        self.scheduleRefresh();
      });
    }
  },

  scheduleRefresh: function(){
    this._refresh = Ember.run.later(this, 'startTimer', 2000);
  },

  afterModel: function(){
    Ember.run.cancel(this._refresh);
  }, 

  deactivate: function(){
    Ember.run.cancel(this._refresh);
  }


});
