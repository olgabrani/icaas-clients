import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  src: DS.attr('string'),
  log: DS.attr('string'),
  image: DS.attr('string'),
  project: DS.attr('string'),
  created: DS.attr('string'),
  updated: DS.attr('string'),
  'status': DS.attr('string'),
  
});
