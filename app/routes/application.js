import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    var c = this.get('cookie');
    if (c && c.getCookie('token') && c.getCookie('uuid')) {
      this.get('settings').set('token', c.getCookie('token'));
      this.get('settings').set('uuid', c.getCookie('uuid'));
    } else {
      this.transitionTo('login'); 
    }
  },

  actions: {
    'logout': function(){
       this.get('cookie').removeCookie('token');
       this.get('cookie').removeCookie('uuid');
       this.transitionTo('login');
    }
  }

});

