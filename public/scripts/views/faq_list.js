//Filename: views/header.js
define([
  'marionette',
  'bootstrap'
], 
function(
  Marionette,
  Bootstrap
  ){
  console.log('views/faq_list loaded');

  // Collection
  // data
  var faqs = [
    {
        "id": 1,
        "question": "Who is Sonikpass for?",
        "answer": "Sonikpass can be used by any business of any size, educational institutions, government organizations and  any organization that needs to protect its data."
    },
    {
        "id": 2,
        "question": "How is it different from other IAM and access mananswerment products?",
        "answer": "Sonikpass does not use passwords and its mechanism enforces physical proximity, which prevents attacks arising from phishing, remote login's and a host of other threats."
    },
    {
        "id": 3,
        "question": "Does it have Multi Factor Authentication?",
        "answer": "Sonikpass incorporates invisible MFA, where it uses  a combination of multiple data  sources including but not limited to biometrics, location, time and behaviour data without the need for any additional action from the user."
    },
    {
        "id": 4,
        "question": "Will there be integration, deployment and onboarding support?",
        "answer": "We are here to help you in every way possible. We will work with your company individually to provide the best possible implementation of Sonikpass on your existing systems and infrastructure. Our tech support is available  24/7."
    },
    {
        "id": 5,
        "question": "Does it protect users when they are logging in from a public place?",
        "answer": "Absolutely! Sonikpass does not use WiFi or Bluetooth or Cellular to send authentication data, making it very secure to use in any environment."
    },
    {
        "id": 6,
        "question": "Will there be integration, deployment and onboarding support?",
        "answer": "We are here to help you in every way possible. We will work with your company individually to provide the best possible implementation of Sonikpass on your existing systems and infrastructure. Our tech support is available  24/7."
    },
    {
        "id": 7,
        "question": "How do I get started?",
        "answer": "Just email sales@sonikpass.com and tell us</a> a bit about yourself and your company and we'll take care of the rest."
    }
  ];

  // model for data
  var FaqModel = Backbone.Model.extend({});
  
  // collection for model
  var FaqCollection = Backbone.Collection.extend({
    model: FaqModel
  });
  
  // collection view to wrap all items
  var FaqsCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: "div",
    childView: FaqItemView
  });

  // item view template for individal items
  var FaqItemView = Backbone.Marionette.ItemView.extend({
    tagName: "p",
    template: '#accordion-template'
  });

  // template for each single item row (put in index.html)

// END Collection

  // build new collection and send to DOM
  // populate collection
  var myFaqs = new FaqCollection(faqs);
  // pass populated collection to collection view
  var myFaqsView = new FaqsCollectionView({ 
    tagName: "div",
    childView: FaqItemView,
    collection: myFaqs  
  });

  // render the view
  myFaqsView.render();

  // inject into DOM
  $('#faq_list').append(myFaqsView.el);

  var headline = '<h1 class="headline-big">FAQs</h1>';
  var copy =      '<p class="copy">Sonikpass is changing the way the world thinks about security and authentication. As with any pioneering company we expect you to have questions. Here\'s a few common questions with answers. If you have any additional questions please contact us and we\'ll be happy to get back to you (just don\'t ask us to explain our "secret sauce" proprietary technology!).</p>';
  
  var Content = _.template(headline+copy);
  return Content;
});


