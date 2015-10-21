import Ember from 'ember';

export default Ember.Route.extend({
  title: 'iCaaS',

  beforeModel: function() {
    var c = this.get('cookie');
    if (c && c.getCookie('token')) {
      this.get('settings').set('token', c.getCookie('token'));
      this.get('settings').set('uuid', c.getCookie('uuid'));
      this.get('settings').set('username', c.getCookie('username'));
    } else {
      this.transitionTo('login'); 
    }
  },

  actions: {
    alertError(status){
      this.controller.set('alertError', true);
    },
    hideError(status){
      this.controller.set('alertError', false);
    },

    error(error) {
      if (error && error.errors[0].status === 500) {
        this.send('alertError', 500);
      }

      // In case of expired token or unauthorized user redirect to login
      if (error && error.errors[0].status === 401) {
        return this.transitionTo('login');
      }
    }
  }

});

