//Filename: views/header.js
define(['jquery','underscore',], 
  function($, _) {
  	console.log('views/header loaded');
    var Content = _.template('<h3>header</h3>');
    return Content;

});

