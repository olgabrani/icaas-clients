export default {
  links: {
    api_access: {
      descr: 'here',
      descr_aux: 'You can find your account token'
    },
    copyright: {
     descr: 'Copyright {{fa-icon "copyright"}} 2015 - 2016 GRNET',
     descr_aux: 'All rights reserved.',
    },
    terms: {
     descr: 'Terms of service',
    }
  },
  buttons: {
    about: 'About',
    login: 'Login',
    build: 'Build',
    abort: 'Abort',
    cancel: 'Cancel',
    user_guide: 'Help',
    builds_list: 'Builds',
    login: 'Log In',
    logout: 'Log Out',
    logs_show: 'Show Logs',
    logs_hide: 'Hide Logs',
    logs_loading: 'Fetching Logs',
    toggle_create_form: 'Create new image',
    delete: 'Delete',
    change_style: 'Try me!'
  },
  help_texts: {
    url: 'Type here the URL of the image that you want to use.\n  You can get this from the Bitnami website.',
    build_name: 'When you will create a new machine,\nyou will find the image with this name\nin the tab "My images" or "Public".',
    project: 'Make sure that the project you will choose\nhas enough quota for a new machine.\nA machine will "build" your image\nand will be destroyed afterwards.',
    container: 'When the creation is completed, you will find the\nimage\'s files inside the container of your choice.\n\nMake sure that the container that you\'ll choose\nhas enough available space!',
    public: 'Check it, if you want to share the image\nwith all the users of the service.'
  },
  labels: {
    url: 'Bitnami URL',
    name: 'Name',
    descr: 'Description',
    file: 'Store in Pithos as',
    project: 'Project',
    container: 'Pithos container',
    public: 'Public',
    status: 'Status',
    status_values: {
      all: 'all',
      creating: 'creating',
      canceled: 'canceled',
      completed: 'completed',
      error: 'error',

    },
    logs_full_path: 'Log file',
    started: 'Started',
    created: 'Created',
    ended: 'Finished',
    token: 'Token'
  },
  confirmation: {
    question: 'Are you sure you want to <b>delete</b> the build',
    info: 'which is in status',
    cannot_undo_action: 'The action cannot be undone.',
    build_abort_question: 'Are you sure you want to <b>abort</b> the build?'
  },
  empty_build_list: 'No builds.',
  welcome: {
    default: 'Welcome, user',
    logged_in: 'Welcome'
  },
  intro: 'Welcome, in our Bitnami factory!<br>Pick a bitnami image with the application stack of your choice and ICaaS will make it easy for you to deploy a VM with it, through Cyclades.<br>Just with a few clicks... Just within a few minutes...'
};
