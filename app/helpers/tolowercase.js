import Ember from 'ember';

export function tolowercase(params) {
  if (params) {
    return params.toString().toLowerCase();
  }
}

export default Ember.Helper.helper(tolowercase);
