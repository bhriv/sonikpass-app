//Filename: views/header.js
define([
  'marionette',
], 
function(Marionette){
  console.log('views/user_list loaded');
// Collection
  // data
  
  $("#api").click(function() {
    cc('#api clicked','info')
    getImages();
  });

  // var users = [];
  // var all_users = []; 
  // var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  
  // var usersRetrieved = $.getJSON( flickerAPI, {
  //   tags: "bailey canyon",
  //   tagmode: "any",
  //   format: "json"
  // }).done(function( data ) {
  //   cc('flickerAPI Data retrieved','run');
  // });

  // $.when(usersRetrieved).then(function(data){
  //   cc('Jquery Deferred when/then has fired','success');
  //   cc('Users passed into when/then','highlight');
  //   console.log(data);
  //   var all_users = data.items;
  //   console.log('Total users '+all_users.length);

  //   for (i = 0; i < all_users.length; i++) { 
  //     var userdata = {
  //       id: all_users[i].author_id,
  //       name: all_users[i].author, 
  //       date: all_users[i].date_taken, 
  //       image_url: all_users[i].media.m
  //     }
  //     var profile = '<tr><td><img src="'+userdata.image_url+'"></td><td>'+userdata.id+'</td><td>'+userdata.name+'<td>'+userdata.date+'</td></tr>'
  //     $(profile).appendTo('#user_list tbody');

  //     users = users.concat(userdata);
  //     if (i == all_users.length - 1) {
  //       cc('Users loop done','done');
  //       console.log(users);
  //       // showData(heros);
  //     }
  //   }
  // });

  // function showData(obj){
  //   // model for data
  //   var UserModel = Backbone.Model.extend({});
    
  //   // collection for model
  //   var UserCollection = Backbone.Collection.extend({
  //     model: UserModel
  //   });
    
  //   // collection view to wrap all items
  //   var UserCollectionView = Backbone.Marionette.CollectionView.extend({
  //     tagName: "span",
  //     childView: UserItemView
  //   });

  //   // item view template for individal items
  //   var UserItemView = Backbone.Marionette.ItemView.extend({
  //     tagName: "tr",
  //     template: '#users-template' // template for each single item row (put in index.html)
  //   });
  
  // // build new collection and send to DOM
    
  //   var myUser = new UserCollection(obj); // populate collection
  //   // pass populated collection to collection view
  //   var myUserView = new UserCollectionView({ 
  //     tagName: "tbody", // send this elemen to the DOM
  //     collection: myUser,  // display ALL Items in Collection
  //     childView: UserItemView, // use this Template for each single Item
  //   });
  //   // render the view
  //   myUserView.render();
  //   // inject into DOM
  //   $('#user_list table').append(myUserView.el);
  // }


  var headline = '<h1 class="headline-big">Sonikpass Users</h1>';
  var copy =      '<p class="copy">Testing for Users via API call.</p>';

  // Pass the constructed content back to the template
  var Content = _.template(headline+copy);
  return Content;
  
});


