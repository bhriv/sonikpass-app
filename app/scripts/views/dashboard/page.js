//Filename: views/dasboard/page.js

define(['jquery','underscore', 'backbone','marionette','viewManager'], 
  function($, _, Backbone, Marionette,viewManager) {
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  var Layout = _.template('<span>views/dashboard/page.js</span>');

  // var Layout = $.get('../../templates/layout.html', function (data) {
  //     template = _.template(data, {data: ''});
  //     this.$el.html(template);  
  // }, 'html');
  // // What we return here will be used by other modules
  console.log('Dashboard page.js open');
  return Layout;
});