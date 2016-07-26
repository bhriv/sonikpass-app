//Filename: views/header.js
define(['jquery','underscore',], 
  function($, _) {
  	console.log('views/main loaded');
    var Content = _.template('<h3>Main</h3>');
    return Content;

});

