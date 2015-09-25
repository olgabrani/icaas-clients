import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    'status': {
      refreshModel: true
    }
  },

  model: function(params){
    return this.store.query('build', params);
  }

});
