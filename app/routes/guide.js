import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(){
    this._super();
    this.render('guide-tools', {
      into: 'application',
      outlet: 'top-bar-left',
    });
  }


});
