// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/dashboard/page',
  // 'router', // Request router.js
], function($, _, Backbone, Marionette,template){
  console.log('doing appjs');
  

  window.App = new Marionette.Application();

  App.addRegions({
      appRegion: '#app-hook',
      titleRegion: '#intro .col-8',
      header: '#navbar',
  });

  App.Router = Marionette.AppRouter.extend({
      appRoutes: {
          '': 'index',
          'about': 'about',
          'dashboard': 'dashboard',
          '*path': 'index',
      }
  });

  App.Controller = Marionette.Controller.extend({
      index: function() {
          var view = new App.IndexView();
          App.titleRegion.show(view);
      },
      about: function() {
          var view = new App.AboutView();
          App.titleRegion.show(view);
      },
      dashboard: function() {
          var view = new App.DashboardView();
          App.appRegion.show(view);
      },
  });

  App.IndexView = Marionette.ItemView.extend({
      tagName: 'h1',
      template: _.template('<span class="headline-big">Index View</span>')
  });

  App.AboutView = Marionette.ItemView.extend({
      tagName: 'h1',
      template: _.template('<span class="headline-big">About View</span>')
      // template: require('./templates/layout.html')
  });

  App.DashboardView = Marionette.ItemView.extend({
      tagName: 'div',
      template: template
  });


  var AppView = Backbone.View.extend({

    initialize: function() {
      App.controller = new App.Controller();
      
      App.router = new App.Router({
          controller: App.controller
      });

      Backbone.history.start();
      console.log( 'app.js says: Backbone is working!' );
    }
  });


  return AppView;

});

// require(['hbs!App/Template/One'], function ( tmplOne ) {
//   // Use whatever you would to render the template function
//   document.body.innerHTML = tmplOne({adjective: "favorite"});
// });