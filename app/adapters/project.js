import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  host: function(){
    return this.get('settings.compute_url') + '_astakos/account/';
  }.property('settings.compute_url'),
  headers: function(){
    return {
     "X-auth-token": this.get('settings.token'),
    };
  }.property('settings.token'),


  handleResponse: function(status, headers, payload) {
    var self = this;
    if (this.isSuccess(status, headers, payload)) {
      var quotas_url = self.get('host') + '/quotas';
      var adapter_headers = self.get('headers');
      return new Ember.RSVP.Promise(function(resolve, reject) {
        $.ajax({
          url: quotas_url,
          headers: adapter_headers
        }).then(function(data) {
          payload.quotas = data;
          Ember.run(null, resolve, payload);
          }, function(jqXHR, textStatus, errorThrown) {
            console.log('%cfail', "color: blue", jqXHR, textStatus, errorThrown);
            Ember.run(null, reject, "error");
          });
      });


    }

  },

});
