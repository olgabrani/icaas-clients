import Ember from 'ember';
import {RefreshViewMixin} from 'icaas/lib/refresh';

export default Ember.View.extend(RefreshViewMixin, {
  classNames: ['middle'],
  refreshTasks: ['controller.model:@controller.settings.modelRefreshInterval'],
});
