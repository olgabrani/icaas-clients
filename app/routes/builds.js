import Ember from 'ember';
import {RefreshRouteMixin} from 'icaas/lib/refresh';

export default Ember.Route.extend(RefreshRouteMixin, {

  setupController: function(controller, model){
    this._super(controller, model);
    this.scheduleRefresh(8000);
  },
 
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
