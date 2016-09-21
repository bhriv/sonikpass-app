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
    'hbs': 'vendor/hbs/hbs',
    'text': 'vendor/text/text',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
    'chartjs': 'vendor/chart.js/dist/Chart',
    'cc': 'vendor/consoleclass/consoleclass',
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
    },
    chartjs: {
      deps: ['jquery'],
      exports: 'Chartjs'
    },
    consoleclass: {
      deps: ['jquery'],
      exports: 'cc'
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
  urlArgs: "bust=" +  (new Date()).getTime(),
  deps: ['jquery', 'underscore']
});


require(['app'], function(AppView){
  new AppView;
});



