import Ember from 'ember';
import {raw as ajax} from 'ic-ajax';

export default Ember.Controller.extend({
  error: false,
  errorMsg: null,

  actions: {
    'tryLogin': function(){
      var self = this;
      var token = this.get('token');
      if (!token || !token.trim())  {
        this.set('error', true);
        this.set('errorMsg', 'This field cannot be empty')
        return;
      }
      this.send('resolveUser', token);
    },

    'success': function(){
      this.set('error', false);
      this.set('errorMsg', null);
      var c = this.get('cookie');
      c.setCookie('token', this.get('settings.tokenInfo.token.id'));
      c.setCookie('uuid', this.get('settings.tokenInfo.user.id'));
      c.setCookie('username', this.get('settings.tokenInfo.user.name'));
      this.transitionTo('application');
    },
    
    'resolveUser': function(token) {
      var self = this;
      return ajax({
        url: 'https://accounts.example.com/identity/v2.0/tokens/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        type: 'json',
        data: JSON.stringify({auth:{token:{id: token}}})
      }).then(function(data) {
        self.get('settings').set('tokenInfo', data.response.access);
        self.send('success');
      }, function(err){
        self.set('error', true);
        self.set('errorMsg', err.errorThrown);
      });
    },

    'hideErrors': function(){
      this.set('error', false);
    }

  }

});
