import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload) {
    var quotas = payload.quotas;
    delete payload.quotas;

    var project_list = payload;

    project_list.forEach(function(project) {
      var id = project['id'];
      var diskspace_quotas = quotas[id]['pithos.diskspace'];

      project['diskspace_user_usage'] = diskspace_quotas['usage'];
      project['diskspace_project_usage'] = diskspace_quotas['project_usage'];
      project['diskspace_user_limit'] = diskspace_quotas['limit'];
      project['diskspace_project_limit'] = diskspace_quotas['project_limit'];
      delete project.resources;
    });

    payload = { projects: project_list};

    return this._super(store, type, payload);
  },
});
