import Ember from 'ember';
import {RefreshRouteMixin} from 'icaas/lib/refresh';

export default Ember.Route.extend(RefreshRouteMixin, {

  setupController: function(controller, model){
    var self = this;
    this._super(controller, model);
    model.reload().then(function(b){
      controller.set('model', b);
      self.scheduleRefresh(3000);
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
    
  actions: {
    error(error, transition) {
      // if the build has been deleted redirect to builds route
      if (error && error.errors[0].status === 404) {
        return this.transitionTo('builds');
      }
    }
  }
});
