import Ember from 'ember';

export default Ember.Controller.extend({

  errorCreation: null,
  loading: false,

  projects: function(){
    return this.store.find('project', {'state': 'active'});
  }.property(),

  project: null,

  actions: {
    'createBuild': function(){
      var self = this;
      var url = this.get('url');
      var name = this.get('name');
      var project = this.get('project');

      var build = this.store.createRecord('build', {
        'url': url,
        'name': name,
        'log': 'pithos/log',
        'image': 'pithos/image',
        'project': project,

      });
      this.set('loading', true);
      build.save().then(function(data){
        self.send('clearForm');
      }, function(err){
        self.set('errorCreation', err);
        self.send('clearForm');
      });
    },
    'clearForm': function(){
      this.set('loading', false);
      this.set('url', null);
      this.set('name', null);
      this.set('project', null);
    },
    'hideErrors': function(){
      this.set('errorCreation', null);
    }
  }
});
