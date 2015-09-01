import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  bytes: DS.attr('number', {defaultValue: 0})
});
