import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://example.com/icaas',
  headers: function(){
    return {
     "Content-Type": "application/json",
     "X-auth-token": "123token",
    };
  }.property(),

  pathForType: function(){
   return '';
  },

  /* tmp code starts here */
  // This is due to the erroneous behaviour of API create request body.
  // Should be erased as soon as the API specifications change
  createRecord: function(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);
    var url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });
    data = data.build;

    return this.ajax(url, "POST", { data: data });
  },
  /* tmp code ends here */


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
          detail: payload.details
        }
      ];
    }
  }

  /* tmp code ends here */
  /* tmp  here */
});
