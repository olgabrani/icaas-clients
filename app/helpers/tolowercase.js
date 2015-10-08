import Ember from 'ember';

export function tolowercase(params) {
	console.log(params)
  return params[0].toLowerCase();
}

export default Ember.Helper.helper(tolowercase);
