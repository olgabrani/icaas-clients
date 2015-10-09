import Ember from 'ember';

export default Ember.Component.extend({

    isCreating: Ember.computed.equal('status', 'CREATING'),
    isCompleted: Ember.computed.equal('status', 'COMPLETED'),

    classNameBindings: ['statusToLowerCase'],

    statusToLowerCase: function() {
        return this.get('status').toLowerCase();
    }.property('status')

});
