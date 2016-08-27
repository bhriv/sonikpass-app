//Filename: views/header.js
define(['jquery','underscore','chartjs'], 
  function($, _,chartjs) {
  	console.log('views/growth loaded');

    var Content = _.template('<h3>Growth Main</h3>');
    return Content;
});

