// Filename: app.js
define([
  // Core needs
  'marionette',
  // Use Gulp to move all common UI dependencies into a single file that can be called.
  // UI needs
  'consoleclass',
  'datepicker',
  'moment',
  'useful',
  'urlParams',
  'chartjs',
  // Static Content Pages
  'text!../templates/about.html',
  'text!../templates/privacy.html',
  // Dynamic Content Pages
  'views/team_list',
  'views/faq_list',
  'views/charts',
  'views/finance_data',
], 
function(
    Marionette,
    consoleclass,
    datepicker, // bootstrap loaded as dependency
    moment,
    useful,
    urlParams,
    chartjs
    // team_list,
    // faq_list,
    // growth_content,
    // finance_data
  ){
  console.log('doing appjs');
  cc('consoleclass working','success');
  
  // Define a new app
  window.App = new Marionette.Application();

  // Define routes
  // App.Router = Marionette.AppRouter.extend({
  //     appRoutes: {
  //         'growth':     'index',          
  //         '*path':      'index',
  //         '':           'index',
  //     }
  // });

  App.addRegions({
      "mainRegion": "#main"
  });
  // Create a module to contain some functionality
  // ---------------------------------------------
  App.module("SampleModule", function (Mod, App, Backbone, Marionette, $, _) {
      // Define a view to show
      // ---------------------
      var MainView = Marionette.ItemView.extend({
          template: "#sample-template"
      });
      // Define a controller to run this module
      // --------------------------------------
      var Controller = Marionette.Controller.extend({
          initialize: function (options) {
              this.region = options.region
          },
          show: function () {
              var Book = Backbone.Model.extend({
                  url: 'https://api.foursquare.com/v2/venues/4afc4d3bf964a520512122e3?oauth_token=EWTYUCTSZDBOVTYZQ3Z01E54HMDYEPZMWOC0AKLVFRBIEXV4&v=20130808',
                  toJSON: function () {
                      return _.clone(this.attributes.response);
                  }
              })
              myBook = new Book();
              myBook.bind('change', function (model, response) {
                  var view = new MainView({
                      el: $("#main"),
                      model: model
                  });
                  this.region.attachView(view);
                  this.region.show(view);
              }, this);
              myBook.fetch();
          }
      });
      // Initialize this module when the app starts
      // ------------------------------------------
      Mod.addInitializer(function () {
          Mod.controller = new Controller({
              region: App.mainRegion
          });
          Mod.controller.show();
      });
  });
  // Start the app
  // -------------
  


  // RUN APP
  var AppView = Backbone.View.extend({
    initialize: function() {
      // Start the router to handle views
      // App.router = new App.Router({
      //   controller: new App.Controller()
      // });

      // Add base layout elements upon initialize
      // var header = new App.HeaderView();
      // App.headerRegion.show(header);

      // var footer = new App.FooterView();
      // App.footerRegion.show(footer);

      Backbone.history.start();
      console.log( 'app.js says: Backbone history has started!' );
      App.start();
      cc('App started','success');
    }
  });
  // return for RequireJS processing
  return AppView;
});
