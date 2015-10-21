import Ember from 'ember';
import {raw as ajax} from 'ic-ajax';

export default Ember.Controller.extend({

  queryParams: ['status', 'searchTerm'],
  queryResults: Ember.computed('searchTerm', 'status', 'model', function(){
    var searchTerm = this.get('searchTerm');
    var status = this.get('status');
    var builds = this.get('model');
    var rx = new RegExp(searchTerm, 'gi');

    if (searchTerm) {
      return builds.filter(function(el){
        return el.get('name').match(rx);
      });
    }
    if (status) {
      return builds.filter(function(el){
        return el.get('status').toLowerCase() ===  status;
      });
    }
    return builds;
    
  }),

  errorCreation: {},
  errorMsg: null,

  loading: false,
  closeForm: false,

  projects: function(){
    return this.store.query('project', {'mode':'member'});
  }.property(),

  allContainers: function(){
    return this.store.query('container', {'format': 'json'});
  }.property(),

  selectedProject: function(){
    return this.get('projects').get('firstObject');
  }.property('projects.[]'),

  containers: Ember.computed.filter('allContainers', function(c) {
    return c.get('name') !== 'trash';
  }),

  selectedContainer: function(){
    return this.get('containers').get('firstObject');
  }.property('containers.[]'),

  showConfirm: false,
  buildToDelete: null,
  confirmTop: null,
  confirmLeft: null,


  actions: {

    'initCreateBuild': function() {

      this.set('closeForm', false);
      this.send('hideErrors');
      var self = this;
      // If the user provides a name for the image, check if the image exists 
      // in the destination path. If it does just 
      // return. If not continue with the creation
      var name = this.get('name');
      var src = this.get('src');
      if (!name || !name.trim())  {
        this.set('errorCreation.name', 'Name field cannot be empty');
      }

      if (!src || !src.trim())  {
        this.set('errorCreation.src', 'Bitnami URL field cannot be empty');
      }

      if (!(is.empty(this.get('errorCreation')))){ 
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
      var self = this;

      var src = this.get('src');
      var name = this.get('name');
      var isPublic = this.get('isPublic');
      var description = this.get('description');
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
        'description': description, 
        'public': isPublic
      });

      this.set('loading', true);
      build.save().then(function(data){
        self.set('closeForm', true);
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
        self.set('errorCreation.common', err.errors);
        self.send('clearForm');
      });

    },

    'clearForm': function(){
      this.set('loading', false);
      this.set('src', null);
      this.set('name', null);
      this.set('project', null);
      this.set('image_name', null);
      this.set('description', null);
    },

    'hideErrors': function(){
      this.set('errorCreation', {});
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

    'openConfirm': function(build, top, left){
      this.set('showConfirm', true);
      this.set('buildToDelete', build);
      var trueTop = top + 32;
      var trueLeft = left + $('.sidebar li').first().width() - 300 - 20;

      this.set('confirmTop', trueTop+'px');
      this.set('confirmLeft', trueLeft+'px');
    },

    'closeConfirm': function(){
      this.set('showConfirm', false);
      this.set('buildToDelete', null);
    },

    'deleteBuild': function(build){
      var self = this;
      build.deleteRecord();
      build.save().then(function(){
      }, function(err){
        build.rollback();
        self.send('error', err);
      }); 
      this.send('closeConfirm');
    },

  }
});
