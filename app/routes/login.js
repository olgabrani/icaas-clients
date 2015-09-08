import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    var c = this.get('cookie');
    if (c && c.getCookie('token')) {
      this.transitionTo('application'); 
    }
  },

});
