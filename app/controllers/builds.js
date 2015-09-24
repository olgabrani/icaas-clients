import Ember from 'ember';
import {raw as ajax} from 'ic-ajax';

export default Ember.Controller.extend({

  errorCreation: null,
  errorMsg: null,

  loading: false,

  projects: function(){
    return this.store.query('project', {'state': 'active'});
  }.property(),

  allContainers: function(){
    return this.store.query('container', {'format': 'json'});
  }.property(),

  selectedProject: function(){
    return this.get('projects').get('firstObject');
  }.property('projects.@each'),

  containers: Ember.computed.filter('allContainers', function(c) {
    return c.get('name') !== 'trash';
  }),

  selectedContainer: function(){
    return this.get('containers').get('firstObject');
  }.property('containers.@each'),


  actions: {

    'initCreateBuild': function() {
      var self = this;
      // If the user provides a name for the image, check if the image exists 
      // in the destination path. If it does just 
      // return. If not continue with the creation
      var name = this.get('name');
      var src = this.get('src');
      if (!name || !name.trim())  {
        this.set('errorMsg', 'Name field cannot be empty');
        return;
      }

      if (!src || !src.trim())  {
        this.set('errorMsg', 'Bitnami url field cannot be empty');
        return;
      }


      if (this.get('image_name')) {
        var container = self.get('selectedContainer.id');
        var path =  container + '/' + self.get('settings.image_path');
        var image = path + '/' + this.get('image_name');
        self.send('checkObjectExists', 
                  image, 
                  function(){ 
                    alert('image already exists');
                    return;
                  } , 
                  function(){
                    self.send('createBuild');
                  });
      } else {
        this.send('createBuild');
      } 
    },


    'createBuild': function(){
      this.send('hideErrors');
      var self = this;

      var src = this.get('src');
      var name = this.get('name');
      var project = this.get('selectedProject.id');
      var container = this.get('selectedContainer.id');
      var t = Date.now();
      var image_name = this.get('image_name') || 'image_' + t;

      var path =  container + '/' + self.get('settings.image_path');
      var image = path + '/' + image_name;
      var log = path + '/log_for_'+ image_name;

      var build = this.store.createRecord('build', {
        'src': src,
        'name': name,
        'log': log,
        'image': image,
        'project': project,
      });

      this.set('loading', true);
      build.save().then(function(data){
        console.log(data);
        self.send('clearForm');
        self.send('checkObjectExists', 
                  path, 
                  function(){ 
                    console.log('directory already exists');
                  } , 
                  function() {                  
                    self.send('createDirectory', path);
                  });
        self.transitionToRoute('build', build);
      }, function(err){
        self.set('errorCreation', err.errors);
        self.send('clearForm');
      });
    },

    'clearForm': function(){
      this.set('loading', false);
      this.set('src', null);
      this.set('name', null);
      this.set('project', null);
    },

    'hideErrors': function(){
      this.set('errorCreation', null);
      this.set('errorMsg', null);
    },

    'checkObjectExists': function(path, callbackSuccess, callbackError) {
      var self = this;
      return ajax({
        url: self.get('settings.storage_url') + '/' + self.get('settings.uuid') + '/' + path,
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json', 
          'X-Auth-Token': self.get('settings.token')
        },
        type: 'json',
      }).then(function() {
        callbackSuccess();
      }, function(){
        callbackError();
      });
    },

    'createDirectory': function(path) {
      var self = this;
      return ajax({
        url: self.get('settings.storage_url') + '/' + self.get('settings.uuid') + '/' + path,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/directory', 
          'X-Auth-Token': self.get('settings.token'),
          'Accept': 'text/plain'
        },
        dataType: 'text'
      }).then(function(data) {
        // if successfully created do nothing
        console.log(data);
        console.log('directory created');
      }, function(err){
        // fail silently for the moment
        console.log(err);
      });
    },

    'deleteBuild': function(build){
      build.destroyRecord();
    }

  }
});
