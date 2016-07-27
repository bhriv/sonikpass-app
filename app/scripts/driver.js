// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  './views/header',
  'text!../templates/layout.html'
  // 'router', // Request router.js
], function($, _, Backbone, Marionette,header){
  console.log('doing driver.js');
  
  // Define a new app
  require(['backbone','marionette','underscore','jquery'], function(){
    console.log('requirements for driver.js met');
    var tpl = require('text!../templates/layout.html');
    // var Marionette = require('backbone.marionette');  // 1
    var HelloWorld = Marionette.LayoutView.extend({  // 2
      el: '#app-hook',  // 3
      // template: require('text!../templates/layout.html')  // 4
      template: tpl
    });

    var hello = new HelloWorld();  // 5

    hello.render();  // 6
  });
  


  // var AppView = Backbone.View.extend({
  //   initialize: function() {
  //     // App.router = new App.Router({
  //     //   controller: new App.Controller()
  //     // });

  //     // var header = new App.HeaderView();
  //     // var main = new App.MainView();
  //     // var footer = new App.FooterView();
  //     // // var faqs = new App.FaqsView();

  //     // App.headerRegion.show(header);
  //     // App.mainRegion.show(main);
  //     // App.footerRegion.show(footer);
  //     // // App.faqsRegion.show(faqs);

  //     Backbone.history.start();
  //     console.log( 'app.js says: Backbone history has started!' );
  //   }
  // });

  // return AppView;
});
