//Filename: views/header.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'bootstrap',
  // 'text!../../templates/team.html',
], 
function($, _, Backbone, Marionette,Bootstrap,team_content){
  console.log('views/team_list loaded');

  // var team_content = require('text!../../templates/team.html'); 
// Collection
  // data
  var team = [
    { 
      id: 1,
      name: "Carey D'Souza", 
      about: "Founder @Sonikpass , @Spending Karma,• Worked at @Electronic Arts, @Nexon America", 
      image_url: '../assets/carey.jpg'
    },
    { 
      id: 2,
      name: "Jeshua Nanthakumar", 
      about: " UX/UI @Fantasy, @Mark One, @Mercedes-Benz Research & Development", 
      image_url: '../assets/jesh.jpg'
    }, 
  ];

  // model for data
  var TeamModel = Backbone.Model.extend({});
  
  // collection for model
  var TeamCollection = Backbone.Collection.extend({
    model: TeamModel
  });
  
  // collection view to wrap all items
  var TeamCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: "div",
    childView: TeamItemView
  });

  // item view template for individal items
  var TeamItemView = Backbone.Marionette.ItemView.extend({
    tagName: "div",
    template: '#team-template'
  });

  // template for each single item row (put in index.html)
// <script type="text/template" id="stooge-template">
//   <td id="name"><%= name %></td>
//   <td id="age"><%= age%></td>
//   <td id="userid"><%= userid%></td>
// </script>

// END Collection

  // build new collection and send to DOM
  // populate collection
  var myTeam = new TeamCollection(team);
  // pass populated collection to collection view
  var myTeamView = new TeamCollectionView({ 
    tagName: "div",
    childView: TeamItemView,
    collection: myTeam  
  });

  // render the view
  myTeamView.render();

  // inject into DOM
  $('#team_list').append(myTeamView.el);

  
  var headline = '<h1 class="headline-big">Meet the Team</h1>';
  var copy =      '<p class="copy">Sonikpass is made up of a passionate and diverse team of experts in data, science, tech and security.</p>';

  // Pass the constructed content back to the template
  var Content = _.template(headline+copy);
  return Content;
});


