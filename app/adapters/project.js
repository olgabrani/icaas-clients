import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'https://cyclades.example.com/_astakos/account/',
  headers: function(){
    return {
     "X-auth-token": "123token",
    };
  }.property(),


  ajaxSuccess: function(jqXHR, jsonPayload) {
    var quotas_url = this.get('host') + '/quotas';
    var headers = this.get('headers');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.ajax({
        url: quotas_url,
        headers: headers
      }).then(function(data) {
        jsonPayload.quotas = data;
        Ember.run(null, resolve, jsonPayload);
        }, function(jqXHR, textStatus, errorThrown) {
          console.log('%cfail', "color: blue", jqXHR, textStatus, errorThrown);
          Ember.run(null, reject, "error");
        });
    });
  },

});
