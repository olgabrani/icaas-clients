import Ember from 'ember';
import {raw as ajax} from 'ic-ajax';

export default Ember.Controller.extend({

  errorCreation: null,
  loading: false,

  projects: function(){
    return this.store.find('project', {'state': 'active'});
  }.property(),

  containers: function(){
    return this.store.find('container', {'format': 'json'});
  }.property(),


  project: null,

  actions: {

    'initCreateBuild': function() {
      var self = this;
      // If the user provides a name for the image, check if the image exists 
      // in the destination path. If it does just 
      // return. If not continue with the creation
      if (this.get('image_name')) {
        var container = self.get('container');
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
      var self = this;

      var url = this.get('url');
      var name = this.get('name');
      var project = this.get('project');
      var container = this.get('container');
      var t = Date.now();
      var image_name = this.get('image_name') || 'image_' + t;

      var path =  container + '/' + self.get('settings.image_path');
      var image = path + '/' + image_name;
      var log = path + '/log_for_'+ image_name;

      var build = this.store.createRecord('build', {
        'url': url,
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
    },

    'checkObjectExists': function(path, callbackSuccess, callbackError) {
      var self = this;
      return ajax({
        url: self.get('settings.storageURL') + '/' + self.get('settings.uuid') + '/' + path,
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
        url: self.get('settings.storageURL') + '/' + self.get('settings.uuid') + '/' + path,
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
    }

  }
});
