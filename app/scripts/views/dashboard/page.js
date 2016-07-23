//Filename: views/dasboard/page.js

define(['jquery','underscore', 'backbone','marionette','viewManager'], 
  function($, _, Backbone, Marionette,viewManager) {
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  console.log('Dashboard page.js open');
  var Layout = $.get('templates/layout.html', function (data) {
      template = _.template(data, {
           data: ''
      });
      // this.$el.html(template);  
  }, 'html');

  return Layout;
  // What we return here will be used by other modules
});