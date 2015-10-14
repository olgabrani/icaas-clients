import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'h1',
  styles: ['font-demo-1', 'font-demo-2', 'font-demo-3', 'font-demo-4'],
  classNames: ['font-demo-1'],
  attributeBindings: ['data-present-style', 'title'],
  'data-present-style': '',
  title: 'Click to change me!',
  actions: {
    changeStyle: function() {
      var styles = this.get('styles');
      var stylesLength = styles.length;
      var currentStyle = this.get('data-present-style');
      var index = styles.indexOf(currentStyle);
      if(index < stylesLength - 1) {
        localStorage.headerStyle = styles[index + 1];
        this.set('data-present-style', localStorage.headerStyle);
      } else {
        localStorage.headerStyle = styles[0];
        this.set('data-present-style', localStorage.headerStyle);
      }
    }
  },
  detectPreferences: function() {
    var storedStyle = localStorage.headerStyle;
    if(localStorage.headerStyle) {
      this.set('data-present-style', localStorage.headerStyle);
    }
    else {
      localStorage.headerStyle = this.get('styles')[0];
      this.set('data-present-style', localStorage.headerStyle);
    }
  }.on('init')
});
