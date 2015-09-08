import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  extractArray: function(store, type, payload) {
    payload.forEach(function(el) {
      el.id = el.name;
    });
    payload = { containers: payload};
    return this._super(store, type, payload);
  },

});
