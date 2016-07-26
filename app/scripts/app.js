// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/header',
  'views/main',
  'views/footer',
  'views/faqs',
  // 'router', // Request router.js
], function($, _, Backbone, Marionette,header,main,footer,faqs){
  console.log('doing appjs');
  
  // Define a new app
  window.App = new Marionette.Application();

  App.Router = Marionette.AppRouter.extend({
      appRoutes: {
          
          'about': 'about',
          'dashboard': 'dashboard',
          'faqs': 'faqs',
          '*path': 'index',
          '': 'index',
      }
  });

  App.Controller = Marionette.Controller.extend({
      about: function() {
          var view = new App.AboutView();
          App.titleRegion.show(view);
      },
      dashboard: function() {
          var view = new App.DashboardView();
          App.appRegion.show(view);
      },
      faqs: function() {
          var view = new App.FaqsView();
          App.titleRegion.show(view);
      },
      index: function() {
          var view = new App.IndexView();
          App.titleRegion.show(view);
      },
  });

  App.addRegions({
      appRegion: '#app-hook',
      titleRegion: '#intro .col-8',
      headerRegion: "#header-region",
      footerRegion: "#footer-region",
      mainRegion: "#main-region",
      faqsRegion: "#faqs-region",
  });


  App.IndexView = Marionette.ItemView.extend({
      tagName: 'h1',
      template: _.template('<span class="headline-big">Index View</span>'),
      onShow: function(){
        console.log('default IndexView shown')
      }
  });

  App.AboutView = Marionette.ItemView.extend({
      tagName: 'h1',
      template: _.template('<span class="headline-big">About Us View</span>'),
      onShow: function(){
        console.log('AboutView1 shown')
      }
  });

  App.DashboardView = Marionette.ItemView.extend({
      tagName: 'div',
      template: main,
      onShow: function(){
        console.log('DashboardView shown')
      }
  });

  App.FaqsView = Marionette.ItemView.extend({
      // tagName: 'div',
      // template: faqs,
      tagName: 'h1',
      template: _.template('<span class="headline-big">FAQ View</span>'),
      onShow: function(){
        console.log('FaqsView shown')
      }
  });

  App.HeaderView = Marionette.LayoutView.extend({
      tagName: 'header',
      template: header
  });

  App.MainView = Marionette.LayoutView.extend({
      tagName: 'div',
      template: main
  });

  App.FooterView = Marionette.LayoutView.extend({
      tagName: 'footer',
      template: footer
  });


  var AppView = Backbone.View.extend({
    initialize: function() {
      App.router = new App.Router({
        controller: new App.Controller()
      });

      var header = new App.HeaderView();
      var main = new App.MainView();
      var footer = new App.FooterView();
      // var faqs = new App.FaqsView();

      App.headerRegion.show(header);
      App.mainRegion.show(main);
      App.footerRegion.show(footer);
      // App.faqsRegion.show(faqs);

      Backbone.history.start();
      console.log( 'app.js says: Backbone history has started!' );
    }
  });

  return AppView;
});
