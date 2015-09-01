import Settings from "../icaas/settings";

var settings = Settings.create();

export function initialize(container, application) {
  application.register('settings:main', settings, {singleton:true, instantiate: false});
  application.inject('adapter', 'settings', 'settings:main');
}

export default {
  name: 'settings',
  initialize: initialize
};
