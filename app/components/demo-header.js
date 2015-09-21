import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'h1',
	styles: ['font-demo-1', 'font-demo-2', 'font-demo-3', 'font-demo-4'],
	classNames: ['font-demo-1'],
	attributeBindings: ['data-present-style', 'title'],
	'data-present-style': undefined,
	title: 'Click me to change style!',
	changeFont: function() {
		var styles = this.get('styles');
		var stylesLength = styles.length;
		var self = this;
		this.set('data-present-style', styles[0]);
		this.$().click(function() {
			var currentStyle = self.get('data-present-style');
			var index = styles.indexOf(currentStyle);
			if(index < stylesLength - 1) {
				self.set('data-present-style', styles[index + 1])
			}
			else {
				self.set('data-present-style', styles[0])
			}
		});
	}.on('didInsertElement')
});
