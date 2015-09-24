import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'span',
	classNameBindings: ['isOpen:open'],
	classNames: ['arrow-icon'],
	isOpen: false,
	slide: function() {
		var $btn = $('#' + this.get('btnID'));
		var $area = $('#' + this.get('areaID'));
		var self = this;
		var $container = $('#' + this.get('containerID'));

		if(this.get('initState') === "open") {
			$container.addClass('open');
			this.set('isOpen', true)
		}
		else {
			$area.hide();
		}
		$btn.click(function() {
			$container.toggleClass('open');
			var toOpen = $container.hasClass('open');

			if(toOpen) {
				self.set('isOpen', true)
				$area.stop().slideDown('slow')
			}
			else {
				self.set('isOpen', false)
				$area.stop().slideUp('slow')
			}
		})

	}.on('didInsertElement')
});
