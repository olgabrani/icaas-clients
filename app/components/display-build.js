import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    showConfirmation(){
      let el = $(this.get('element'));
      let top = el.offset().top;
      let left = el.offset().left;
      this.sendAction('action', this.get('build'), top, left);
    }
  }
});
