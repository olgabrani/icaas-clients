import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  // The isNewSerializerAPI flag is only required for Ember Data 1.13 and will 
  // be removed in Ember Data 2.0
  isNewSerializerAPI: true,
  normalizeArrayResponse: function(store, primaryModelClass, payload, id, requestType) {
    console.log(payload, payload.quotas);
    var quotas = payload.quotas;
    delete payload.quotas;

    var project_list = payload;

    project_list.forEach(function(project) {
      var id = project['id'];
      if(quotas['id']) {
        var vm = quotas[id]['cyclades.vm'];

        project['vm_user_usage'] = vm['usage'];
        project['vm_project_usage'] = vm['project_usage'];
        project['vm_user_limit'] = vm['limit'];
        project['vm_project_limit'] = vm['project_limit'];
      }

      delete project.resources;
    });

    payload = { projects: project_list};

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
