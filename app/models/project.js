import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	homepage: DS.attr('string'),
	system_project: DS.attr('boolean', {defaultValue: false}),

  human_name: function(){
    if (this.get('system_project')){
      return 'System project';
    }
    return this.get('name');
  }.property('name', 'system_project'),


	// quotas info
	vm_user_usage: DS.attr('number'),
	vm_user_limit: DS.attr('number'),
	vm_project_usage: DS.attr('number'),
	vm_project_limit: DS.attr('number'),

	vm_taken_by_others: function() {
		var project_usage = this.get('vm_project_usage');
		var user_usage =  this.get('vm_user_usage');

		return project_usage - user_usage;
	}.property('vm_project_usage', 'vm_user_usage'),

	vm_effective_limit: function() {

		var limit = this.get('vm_user_limit');
		var project_limit = this.get('vm_project_limit');
		var taken_by_others = this.get('vm_taken_by_others');
		return Math.min(limit, project_limit - taken_by_others);
	}.property('vm_user_limit', 'vm_project_limit', 'diskspace_taken_by_others'),

	vm_free: function() {
		var limit = this.get('vm_effective_limit');
		var usage = this.get('vm_user_usage')

		return limit - usage;
	}.property('vm_effective_limit')
});
