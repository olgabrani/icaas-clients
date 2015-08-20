import Ember from 'ember';

export default Ember.Route.extend({
    
  model: function(params){
    return this.store.find('build', params.build_id);
  },

  setupController: function(controller, model){
    this._super(controller, model);
    model.reload().then(function(b){
      controller.set('model', b);
    });
  
  }
});
