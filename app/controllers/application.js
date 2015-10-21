import Ember from 'ember';

export default Ember.Controller.extend({
  alertError: false,
  alertErrorCls: function(){
    return this.get('alertError')? 'visible': '';
  }.property('alertError')
});
