import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    error(error) {
      // if the build has been deleted redirect to builds route
      if (error && error.errors[0].status === 404) {
        return this.transitionTo('builds');
      }
    }
  }
});
