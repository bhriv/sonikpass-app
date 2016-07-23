// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/dashboard/page'
  // 'router', // Request router.js
], function($, _, Backbone, Marionette,template){
  console.log('doing appjs');


  window.App = new Marionette.Application();

  App.addRegions({
      appRegion: '#app-hook',
      titleRegion: '#intro .col-8',
      modalRegion: '#modal',
      homeRegion: '#home'
  });

  App.Router = Marionette.AppRouter.extend({
      appRoutes: {
          '': 'index',
          'home': 'home'
      }
  });

  App.Controller = Marionette.Controller.extend({
      index: function() {
          var view = new App.IndexView();
          App.titleRegion.show(view);
      },
      home: function() {
          var view = new App.HomeView();
          App.homeRegion.show(view);
      },
      modal: function() {
          var view = new App.ModalView();
          App.modalRegion.show(view);
      },
  });

  App.IndexView = Marionette.ItemView.extend({
      tagName: 'h1',
      template: _.template('<span class="headline-big">About Sonikpass</span>')
  });

  App.HomeView = Marionette.ItemView.extend({
      tagName: 'h2',
      template: _.template('<span class="headline-big">(2) About Sonikpass</span>')
  });  

  App.ModalView = Marionette.ItemView.extend({
    //   $.get('templates/layout.html', function (data) {
    //     el: '#modal',
    //     tagName: 'div',
    //     template = _.template(data, {
    //          data: ''
    //     });
    //     this.$el.html(template);  
    // }, 'html');
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