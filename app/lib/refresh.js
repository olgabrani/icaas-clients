import Ember from 'ember';

var RefreshRouteMixin = Ember.Mixin.create({

  interval: 4000,

  startTimer: function () {
    var self = this;
    self.refresh().then(function(){
      self.scheduleRefresh(self.get('interval'));
    });
  },

  scheduleRefresh: function(setInterval){
    this.set('interval', setInterval || 4000);
    var self = this;
    this._refresh = Ember.run.later(this, 'startTimer', self.get('interval'));
  },

  afterModel: function(){
    Ember.run.cancel(this._refresh);
  }, 

  deactivate: function(){
    Ember.run.cancel(this._refresh);
  }

});


export {RefreshRouteMixin};
