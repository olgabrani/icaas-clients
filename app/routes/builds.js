import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    'status': {
      refreshModel: true
    }
  },

  model: function(params){
    return this.store.query('build', params);
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
