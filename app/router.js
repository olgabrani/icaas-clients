import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('builds', function(){
    this.resource('build', { path: '/:build_id' });
    this.route('model-not-found', {path: '/:fake'});
  });

  this.route('login');
  this.route('guide');
  this.route('not-found', { path: "*path"});
});

export default Router;
