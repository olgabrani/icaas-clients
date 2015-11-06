import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  // The isNewSerializerAPI flag is only required for Ember Data 1.13 and will 
  // be removed in Ember Data 2.0
  isNewSerializerAPI:true,
  normalizeArrayResponse: function (store, primaryModelClass, payload, id, requestType) {
    var info;
    payload.builds.forEach(function(build) {
      info = JSON.parse(build.status_details);
      build['status_info'] = info.details;
      if(info['agent-progress']) {
        let current = Number(info['agent-progress'].current);
        let total = Number(info['agent-progress'].total);
        if(current < total) {
          build['creation_progress'] = (current / total).toFixed(2)*100;
        }
        else {
          build['creation_progress'] = 100;
        }
      }
      else {
        build['creation_progress'] = 0;
      }
    });
    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  normalizeFindRecordResponse: function(store, primaryModelClass, payload, id, requestType) {
    var build = payload.build;
    var info = JSON.parse(build.status_details);
    build['status_info'] = info.details;
      if(info['agent-progress']) {
        let current = Number(info['agent-progress'].current);
        let total = Number(info['agent-progress'].total);
        if(current < total) {
          build['creation_progress'] = (current / total).toFixed(2)*100;
        }
        else {
          build['creation_progress'] = 100;
        }
      }
      else {
        build['creation_progress'] = 0;
      }
      var payload = {build: build}
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
