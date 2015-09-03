import Ember from 'ember';

export default Ember.Route.extend({

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
    'logout': function(){
       this.get('cookie').removeCookie('token');
       this.get('cookie').removeCookie('uuid');
       this.get('cookie').removeCookie('username');
       this.transitionTo('login');
    }
  }

});

