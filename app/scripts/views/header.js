//Filename: views/header.js
define(['jquery','underscore',], 
  function($, _) {
  	console.log('views/header loaded');
    var Content = _.template('<a href="#faqs">FAQ</a> <a href="#about">About Us</a>');
    return Content;
});

