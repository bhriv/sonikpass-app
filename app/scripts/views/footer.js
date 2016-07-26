//Filename: views/header.js
define(['jquery','underscore',], 
  function($, _) {
  	console.log('views/footer loaded');
    var Content = _.template('<h3>footer</h3>');
    return Content;
});

