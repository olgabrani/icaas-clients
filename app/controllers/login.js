import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    'login': function(){
      var token = this.get('token');
      var c = this.get('cookie');
      c.setCookie('token', token);
      this.get('settings').set('token', token);
      this.transitionToRoute('builds');
    }
  }

});
