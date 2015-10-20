import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    showConfirmation(){
      this.sendAction('action', this.get('build'));
      console.log(this.get('element'));
    }
  }
});
