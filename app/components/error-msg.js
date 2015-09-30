import Ember from 'ember';

export default Ember.Component.extend({
  keyUp: function(){
    var self = this;
    let val = this.$().find('input').val();
    if (is.not.empty(val.trim()) ){
      self.set('err', null);
    }
  }
});
