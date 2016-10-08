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
    // 'ui': 'build/dist/ui',
    'useful': 'useful',
    'consoleclass': 'vendor/consoleclass/consoleclass',
    'urlParams': 'urlParams',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
    'datepicker': 'vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker',
    'chartjs': 'vendor/chart.js/dist/Chart',
    'moment': 'vendor/moment/moment',
    // 'backbone_validation': 'vendor/backbone-validation/dist/backbone-validation',
    // 'backbone_syphon': 'vendor/backbone.syphon/lib/backbone.syphon',
    // 'formwrapper': 'vendor/marionette-form-wrapper/js/src/FormWrapper',
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
    // ui: {
    //   deps: ['jquery'],
    //   exports: 'bs'
    // },
    bootstrap: {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    datepicker: {
      deps: ['bootstrap'],
      exports: 'datepicker'
    },
    chartjs: {
      deps: ['jquery'],
      exports: 'Chartjs'
    },
    moment: {
      deps: ['jquery'],
      exports: 'moment'
    },
    consoleclass: {
      deps: ['jquery'],
      exports: 'consoleclass'
    },
    useful: {
      deps: ['jquery','moment'],
      exports: 'useful'
    },
    urlParams: {
      exports: 'urlParams'
    },
    // backbone_validation: {
    //   deps: ['jquery','backbone'],
    //   exports: 'backbone_validation'
    // },
    // backbone_syphon: {
    //   deps: ['jquery','backbone'],
    //   exports: 'backbone_syphon'
    // },
    // formwrapper: {
    //   deps: ['backbone_validation','backbone_syphon'],
    //   exports: 'formwrapper'
    // },
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


require([
  // load dependencies
  'app'
], 
function(
  // pass to function
  AppView
  ){
  // do stuff
  new AppView;
});



