import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  // The isNewSerializerAPI flag is only required for Ember Data 1.13 and will 
  // be removed in Ember Data 2.0
  isNewSerializerAPI: true,
  normalizeArrayResponse: function(store, primaryModelClass, payload, id, requestType) {
    payload.forEach(function(el) {
      el.id = el.name;
    });
    payload = { containers: payload};

    return this._super(store, primaryModelClass, payload, id, requestType);
  },

});
