import Ember from 'ember';
import {RefreshViewMixin} from 'icaas/lib/refresh';

export default Ember.View.extend(RefreshViewMixin, {
  classNames: ['middle'],
  refreshTasks: ['controller.model:@controller.settings.modelRefreshInterval'],
  closeForm: function() {
    if(this.get('controller').get('closeForm')) {
      this.$('#create-header').trigger('click');
    }
  }.observes('controller.closeForm'),
  didInsertElement: function(){
    var self = this;
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        self.get('controller').send('closeConfirm');
      }
    });
    $(document).mouseup(function (e) {
      self.get('controller').send('closeConfirm');
    });
  },

});
