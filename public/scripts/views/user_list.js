//Filename: views/header.js
define([
  'marionette',
  // 'text!../../templates/user.html',
], 
function(Marionette){
  console.log('views/user_list loaded');

  // var user_content = require('text!../../templates/user.html'); 
// Collection
  // data

  // function getImages(){
  //   cc('getImages','run');
  //   var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    
  //   $.getJSON( flickerAPI, {
  //     tags: "echo mountain",
  //     tagmode: "any",
  //     format: "json"
  //   })
  //   .done(function( data ) {
  //     $.each( data.items, function( i, item ) {
  //       console.log('Flickr item'+i+'\n',item);
  //       // build temp profile for each user
  //       var profile = '<tr><td><img src="'+item.media.m+'"></td><td>'+item.author_id+'</td><td>'+item.author+'<td>'+item.date_taken+'</td></tr>'
  //       $(profile).appendTo( "#users tbody" );
  //       if ( i === 3 ) {
  //         return false;
  //       }
  //     });
  //   });
  // }

  var users = [
    { 
      id: 3,
      name: "User 1", 
      date: "2016-01-02", 
      image_url: 'assets/carey.jpg'
    },
    { 
      id: 4,
      name: "User 2", 
      date: "2016-01-01", 
      image_url: 'assets/jesh.jpg'
    }, 
  ];

  // model for data
  var UserModel = Backbone.Model.extend({});
  
  // collection for model
  var UserCollection = Backbone.Collection.extend({
    model: UserModel
  });
  
  // collection view to wrap all items
  var UserCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: "span",
    childView: UserItemView
  });

  // item view template for individal items
  var UserItemView = Backbone.Marionette.ItemView.extend({
    tagName: "tr",
    template: '#users-template'
  });

// template for each single item row (put in index.html)

// END Collection

  // build new collection and send to DOM
  // populate collection
  var myUser = new UserCollection(users);
  
  // pass populated collection to collection view
  var myUserView = new UserCollectionView({ 
    tagName: "tbody", // send this elemen to the DOM
    collection: myUser,  // display ALL Items in Collection
    childView: UserItemView, // use this Template for each single Item
    
  });

  // render the view
  myUserView.render();

  // inject into DOM
  $('#user_list table').append(myUserView.el);

  
  var headline = '<h1 class="headline-big">Sonikpass Users</h1>';
  var copy =      '<p class="copy">Testing for Users via API call.</p>';

  // Pass the constructed content back to the template
  var Content = _.template(headline+copy);
  return Content;
});


