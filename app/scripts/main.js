// Filename: main.js
// Conventions from: https://cdnjs.com/libraries/backbone.js/tutorials/organizing-backbone-using-modules
require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'lodash': 'vendor/underscore/lodash',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr',
    'marionette': 'vendor/marionette/lib/core/backbone.marionette',
    'viewManager': 'vendor/backbone-viewmanager/src/backbone-viewmanager',
    'hbs': 'vendor/handlebars/handlebars',
    'text': 'vendor/requirejs-text/text',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    }
  },
  hbs: { // optional
      helpers: true,            // default: true
      templateExtension: 'hbs', // default: 'hbs'
      partialsUrl: ''           // default: ''
  },
  // map: {
  //       "*": {
  //           // use lodash instead of underscore
  //           "underscore": "lodash"
  //       }
  // },
  deps: ['jquery', 'underscore']
});


require(['app','views/header','views/main','views/footer'], function(AppView){
  new AppView;
}); 

