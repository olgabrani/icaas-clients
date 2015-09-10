import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'span',
	slide: function() {
		var $btn = $('#' + this.get('btnID'));
		var $area = $('#' + this.get('areaID'));
		var $container = $('#' + this.get('containerID'));

		$btn.click(function() {
			$container.toggleClass('open');
			var toOpen = $container.hasClass('open');

			if(toOpen) {
				$area.stop().slideDown('slow')
			}
			else {
				$area.stop().slideUp('slow')
			}
		})

	}.on('didInsertElement')
});
