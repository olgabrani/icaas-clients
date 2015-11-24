import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.store.findAll('build');
  },

  renderTemplate: function(){
    this._super();
    this.render('builds-tools', {
      into: 'application',
      outlet: 'top-bar-left',
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('isLoggedIn', true);
  }

});
