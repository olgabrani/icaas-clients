import Ember from 'ember';

export default Ember.Component.extend({
	isCreating: Ember.computed.equal('status', 'CREATING'),
	isCompleted: Ember.computed.equal('status', 'COMPLETED'),
	isError: Ember.computed.equal('status', 'ERROR'),
	classNameBindings: ['isCreating:creating', 'isCompleted:success', 'isError:error'],
});
