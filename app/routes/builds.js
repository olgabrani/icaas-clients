import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params){
    return this.store.findAll('build');
  },

  renderTemplate: function(){
    this._super();
    this.render('builds-tools', {
      into: 'application',
      outlet: 'top-bar-right',
      controller: 'builds',
    });

    this.render('application-tools', {
      into: 'application',
      outlet: 'top-bar-left',
    });
  }

});
