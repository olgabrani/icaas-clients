import DS from 'ember-data';

// file Transform is for a model's attr with the format
// {
//  'container': 'container',
//  'object': 'object'
// }
export default DS.Transform.extend({
  deserialize: function(serialized) {
    let container = serialized.container;
    let object = serialized.object;
    return container + '/' + object;
  },

  serialize: function(deserialized) {
    var parts = deserialized.split('/');
    let container = parts.shift();
    let object = parts.join('/');
    return {
      'container': container,
      'object': object
    };
  }
});
