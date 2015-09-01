import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('builds', function(){
    this.resource('build', { path: '/:build_id' });
  });

  // temporary route
  this.route('mocks');
});

export default Router;
