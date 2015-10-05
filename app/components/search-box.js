import Ember from 'ember';

export default Ember.Component.extend({
  placeholder: 'Filter builds list',
  classNames: ['search-box'],
  hideClearBtn: function() {
    var hideClearBtn;
    hideClearBtn = this.get('value').length ? false : true;

    return hideClearBtn;

  }.property('value'),

  actions: {
    'clearSearch': function(){
      this.set('value', '');
    }
  }
});
