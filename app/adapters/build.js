import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: function(){
    return this.get('settings.serviceURL');
  }.property('settings.serviceURL'),
  headers: function(){
    return {
     "Content-Type": "application/json",
     "X-auth-token": this.get('settings.token'),
    };
  }.property('settings.token'),


  /* tmp code starts here */
  // This is due to the erroneous behaviour of API response format..
  // Should be erased as soon as the error is compliant with Ember's 
  // expected format
 
  normalizeErrorResponse: function(status, headers, payload) {
    if (payload && typeof payload === 'object' && payload.errors) {
      return payload.errors;
    } else {
      return [
        {
          status: payload.status,
          title: payload.message,
          details: payload.details
        }
      ];
    }
  }

  /* tmp code ends here */
});
