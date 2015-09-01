import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model){
    this._super(controller, model);
    model.reload().then(function(b){
      controller.set('model', b);
    });
  }

});
