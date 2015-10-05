import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'span',
	classNameBindings: ['isOpen:open'],
	classNames: ['arrow-icon'],
  isOpen: true,
  didInsertElement: function(){
    var $container = $('#' + this.get('containerID'));
    if (this.get('isOpen') === true) {
      $container.addClass('open');
    }
  },
  click: function() {
      var $area = $('#' + this.get('areaID'));
      var $container = $('#' + this.get('containerID'));
      $container.toggleClass('open');
      var toOpen = $container.hasClass('open');

      if (toOpen) {
        this.set('isOpen', true)
        $area.stop().slideDown('slow')
      } else {
        this.set('isOpen', false)
        $area.stop().slideUp('slow')
      }
  }
});
