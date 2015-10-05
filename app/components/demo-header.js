import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'h1',
	styles: ['font-demo-1', 'font-demo-2', 'font-demo-3', 'font-demo-4'],
	classNames: ['font-demo-1'],
	attributeBindings: ['data-present-style', 'title'],
	'data-present-style': function(){
    return this.get('styles')[0];
  }.property(),
	title: 'Click me to change style!',
  click: function() {
    var styles = this.get('styles');
    var stylesLength = styles.length;
    var currentStyle = this.get('data-present-style');
    var index = styles.indexOf(currentStyle);
    if(index < stylesLength - 1) {
      this.set('data-present-style', styles[index + 1]);
    } else {
      this.set('data-present-style', styles[0]);
    }
  }
});
