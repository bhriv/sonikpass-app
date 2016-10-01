// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'chartjs',
  'text!../templates/navigation.html',
  'text!../templates/layout.html',
  'text!../templates/cta.html',
  'text!../templates/footer.html',
  'text!../templates/about.html',
  'text!../templates/team.html',
  'views/team_list',
  'views/faq_list',
  'views/growth',
  'views/growth_data',
  // 'text!../templates/growth.html',
], 
function($, _, Backbone, Marionette,navigation,layout,cta_content,footer_content,about_content,team_content,team_list,faq_list,growth_content,growth_data){
  console.log('doing appjs');
  
  // var faqs = require('views/faqs');  
  

  var navigation = require('text!../templates/navigation.html'); 
  var layout = require('text!../templates/layout.html');  
  var cta_content = require('text!../templates/cta.html');  
  var footer_content = require('text!../templates/footer.html'); 
  
  var about_content = require('text!../templates/about.html'); 
  var team_content = require('text!../templates/team.html'); 
  // var growth_content = require('text!../templates/growth.html'); 
  
  var team_list = require('views/team_list'); 
  var faq_list = require('views/faq_list'); 
  var growth_content = require('views/growth'); 
  var growth_data = require('views/growth_data'); 
   
  // Define a new app
  window.App = new Marionette.Application();

  // Define routes
  App.Router = Marionette.AppRouter.extend({
      appRoutes: {
          
          'about':      'about',
          'team':       'team',
          'growth':     'growth',
          'faqs':       'faqs',
          '*path':      'team',
          '':           'team',
      }
  });

  // Handle routes
  App.Controller = Marionette.Controller.extend({
      about: function() {
          var view = new App.AboutView();
          App.mainRegion.show(view);
      },
      team: function() {
          var view = new App.TeamlistView();
          App.mainRegion.show(view);
      },
      growth: function() {
          var view = new App.GrowthView();
          App.mainRegion.show(view);
      },
      faqs: function() {
          var view = new App.FaqlistView();
          App.mainRegion.show(view);
      },
      index: function() {
          var view = new App.IndexView();
          App.mainRegion.show(view);
      },
  });

  // Add targeted regions
  App.addRegions({
      ctaRegion:            "#cta-region",
      headerRegion:         "#header-region",
      footerRegion:         "#footer-region",
      mainRegion:           "#main-region #top",
      ctaRegion:            "#cta-region",
      faqsRegion:           "#faqs-region"
  });

// Route based views

  App.AboutView = Marionette.ItemView.extend({
      tagName: 'div',
      template: about_content,
      onBeforeShow: function(){
        $('body').removeClass();
        $('body').addClass('view-about');
        $('#team_list').hide();
        $('#faq_list').hide();
      },
      onShow: function(){
        console.log('AboutView shown')
      }
  });

  App.TeamlistView = Marionette.ItemView.extend({
      tagName: 'div',
      template: team_list,
      onBeforeShow: function(){
        $('body').removeClass();
        $('body').addClass('view-team');
        $('#team_list').show();
        $('#faq_list').hide();
      },
      onShow: function(){
        console.log('Teamlist shown')
      }
  });


  App.GrowthView = Marionette.ItemView.extend({
      tagName: 'div',
      template: growth_content,
      onBeforeShow: function(){
        $('body').removeClass();
        $('body').addClass('view-growth');
        $('#team_list').hide();
        $('#faq_list').hide();
      },
      onShow: function(){
        console.log('GrowthView shown');
        var content_div = $('#center_content');
        // $(content_div).removeClass();
        
        
        // Traction Graph
        var years = ["2017", "2018", "2019", "2020", "2021"];
        var number_of_users = [
            "88333",
            "1230123",
            "5185160",
            "16609191",
            "31387762"
        ];
        var annual_revenue = [
            "542410",
            "7673638",
            "32497020",
            "104631400",
            "197231400"
        ];

        // CHART
        var ctx = document.getElementById("growth_chart");

        var custom_options = {
            animation: false,
            stacked: true,
            scaleLabel: function(label){return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        };

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                      label: 'Number of Users',
                      data: number_of_users,
                      backgroundColor: [
                          '#4E9FD4',
                          '#4E9FD4',
                          '#4E9FD4',
                          '#4E9FD4',
                          '#4E9FD4',
                      ],
                      borderColor: [
                          // 'rgba(255,99,132,1)',
                      ],
                      borderWidth: 0
                  },
                  {
                      label: 'Annual Revenue',
                      data: annual_revenue,
                      backgroundColor: [
                          '#C03441',
                          '#C03441',
                          '#C03441',
                          '#C03441',
                          '#C03441',
                      ],
                      borderColor: [
                          // 'rgba(255,99,132,1)',
                      ],
                      borderWidth: 0
                  }
                ]
            },
            options: custom_options
        });


        /* Margin Graph 
        ---------------------------
                2017  2018  2019  /
        Sales   27    36    63    /
        Margins 55    43    80    /
        Profits 50    70    90    /
        ---------------------------
        */

        var three_years = ["2017", "2018", "2019"];
        var sales = [
            "27",
            "36",
            "63",
        ];
        var margins = [
            "55",
            "43",
            "80",
        ];
        var profits = [
            "50",
            "70",
            "90",
        ];

        // CHART
        var ctx = document.getElementById("chart_financial_summary");

        var custom_options = {
            animation: false,
            stacked: true,
            scaleLabel: function(label){return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        };

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: three_years,
                datasets: [{
                      label: 'Sales',
                      data: sales,
                      backgroundColor: [
                          '#4E9FD4',
                          '#4E9FD4',
                          '#4E9FD4',
                      ],
                      borderColor: [
                          // 'rgba(255,99,132,1)',
                      ],
                      borderWidth: 0
                  },
                  {
                      label: 'Margins',
                      data: margins,
                      backgroundColor: [
                          '#C03441',
                          '#C03441',
                          '#C03441',
                      ],
                      borderColor: [
                          // 'rgba(255,99,132,1)',
                      ],
                      borderWidth: 0
                  },
                  {
                      label: 'Profits',
                      data: profits,
                      backgroundColor: [
                          '#8A6E91',
                          '#8A6E91',
                          '#8A6E91',
                      ],
                      borderColor: [
                          // 'rgba(255,99,132,1)',
                      ],
                      borderWidth: 0
                  }
                ]
            },
            options: custom_options
        });
        

      } // end onShow

      // Combined Chart
      //Chart Data
  
    
  }); // end GrowthView

  App.FaqlistView = Marionette.ItemView.extend({
      tagName: 'div',
      template: faq_list,
      onBeforeShow: function(){
        $('body').removeClass();
        $('body').addClass('view-faq');
        $('#team_list').hide();
        $('#faq_list').show();
      },
      onShow: function(){
        console.log('FaqlistView shown')
      }
  });

  App.FaqsView = Marionette.ItemView.extend({
      tagName: 'h1',
      template: _.template('<span class="headline-big">FAQ View</span>'),
      onShow: function(){
        console.log('FaqsView content shown')
      }
  });

  App.IndexView = Marionette.ItemView.extend({
    tagName: 'h1',
    template: _.template('<span class="headline-big">Index View</span>'),
    onShow: function(){
      console.log('default IndexView shown')
    }
  });

// PAGE LAYOUTS

  App.HeaderView = Marionette.LayoutView.extend({
      tagName: 'ul',
      template: navigation
  });

  App.CtaView = Marionette.LayoutView.extend({
      tagName: 'div',
      template: cta_content
  });

  App.FooterView = Marionette.LayoutView.extend({
      tagName: 'div',
      template: footer_content
  });

  App.MainView = Marionette.LayoutView.extend({
      tagName: 'div',
      template: layout,
      onShow: function(){
        console.log('MainView content shown')
      }
  });


// RUN APP

  var AppView = Backbone.View.extend({
    initialize: function() {
      // Start the router and handle views
      App.router = new App.Router({
        controller: new App.Controller()
      });

      // Add base layout elements upon initialize
      var header = new App.HeaderView();
      var cta = new App.CtaView();
      // var footer = new App.FooterView();
      
      App.headerRegion.show(header);
      App.ctaRegion.show(cta);
      // App.footerRegion.show(footer);

      Backbone.history.start();
      console.log( 'app.js says: Backbone history has started!' );

    }
  });

  return AppView;
});
