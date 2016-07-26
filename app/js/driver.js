var Marionette = require('backbone.marionette');  // 1


var HelloWorld = Marionette.LayoutView.extend({  // 2
  el: '#app-hook',  // 3
  // template: require('./templates/layout.html')  // 4
  template: _.template('<h1 class="headline-big">driver View</h1>'),
});

var hello = new HelloWorld();  // 5

hello.render();  // 6