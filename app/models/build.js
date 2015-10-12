import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  src: DS.attr('string'),
  image: DS.attr('file'),
  log: DS.attr('file'),
  description: DS.attr('string'),
  project: DS.attr('string'),
  'public': DS.attr('boolean'),
  created: DS.attr('string'),
  updated: DS.attr('string'),
  'status': DS.attr('string'),
  status_details: DS.attr('string'),
  'action': DS.attr('string')
  
});
