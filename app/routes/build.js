import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    error(error, transition) {
      // if build is not found
      let is404 = error && error.errors[0].status === 404;
      // if build id is not an integer
      let isUndefined = error && error.errors[0].status === undefined;
      if (is404 || isUndefined) {
        var a = transition.intent.url;
        var b = a.replace(/^[/]/, '');
        return this.transitionTo('not-found', b);
      }
    }
  }
});
