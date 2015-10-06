import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    this.get('cookie').removeCookie('token');
    this.get('cookie').removeCookie('uuid');
    this.get('cookie').removeCookie('username');
  },

});
