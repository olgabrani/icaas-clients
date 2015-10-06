import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(resolvedModel, transition) {
    // if the build_id is not an intiger redirect to 404 page
    if (isNaN(resolvedModel.fake)) {
      var a = transition.intent.url;
      var b = a.replace(/^[/]/, '');;
      this.transitionTo('not-found', b);
    }
  }
});
