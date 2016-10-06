//Filename: views/static.js
define([
  'marionette',
  'text!../templates/navigation.html',
  'text!../templates/layout.html',
  'text!../templates/cta.html',
  'text!../templates/footer.html',
  'text!../templates/about.html',
  // 'text!../../templates/team.html',
], 
function(
  Marionette
  navigation,
  layout,
  cta,
  footer,
  about,
  ){
  console.log('views/static loaded');

  
  var headline = '<h1 class="headline-big">Meet the Team</h1>';
  var copy =      '<p class="copy">Sonikpass is made up of a passionate and diverse team of experts in data, science, tech and security.</p>';

  // Pass the constructed content back to the template
  var Content = _.template(headline+copy);
  return Content;
});


