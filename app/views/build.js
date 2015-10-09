import Ember from 'ember';
import {RefreshViewMixin} from 'icaas/lib/refresh'

export default Ember.View.extend(RefreshViewMixin, {
  classNames: ['details', 'panel'],
  tagName: 'section',
  refreshTasks: ['controller.model:@controller.settings.modelRefreshInterval'],
  modelChanged: Ember.observer('controller.model.id', function(){
    this.get('_refresher').stop();
    this.get('_refresher').start();
  })

});
