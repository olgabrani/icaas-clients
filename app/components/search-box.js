import Ember from 'ember';

export default Ember.Component.extend({
  placeholder: 'Filter builds list',
  classNames: ['search-box'],
  actions: {
    'clearSearch': function(){
      this.set('value', '');
    }
  }
});
