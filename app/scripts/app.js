// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'useful',
  'chartjs',
  'vendor/consoleclass/consoleclass',
  'text!../templates/navigation.html',
  'text!../templates/layout.html',
  'text!../templates/cta.html',
  'text!../templates/footer.html',
  'text!../templates/about.html',
  'text!../templates/team.html',
  'views/team_list',
  'views/faq_list',
  'views/growth',
  // 'views/growth_data',
  // 'views/transactions/2016/07',
  // 'views/transactions/2016/08',
  'views/finance_data',
  // 'views/faqs',
  // 'text!../templates/growth.html',
], 
function($, _, Backbone, Marionette,useful,navigation,layout,cta_content,footer_content,about_content,team_content,team_list,faq_list,growth_content,finance_data){
  console.log('doing appjs');
  cc('consoleclass working');
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
  // var growth_data = require('views/growth_data'); 
   
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
        
        // Chart Options
        var custom_chart_options = {
          animation: false,
          stacked: true,
          scaleLabel: function(label){return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        };

        // Setup VARIABLES
        var Yearly_Totals = [];
        var Yearly_Totals_size = _.size(Yearly_Totals);
        Yearly_Totals_size--;

        // Get Data from Mint Exports
        var Categories_2016 = [];
        var Data_By_Month_2016 = [];
        var Subcategory_Data_2016 = [];
        var Parent_Category_Data_2016 = [];
        var Parent_Category_Total_2016 = [];

        var Parent_Yearly_Totals = [];
        var Parent_Category_Monthly_Spent = [];
        var Parent_Category_Yearly_Spent = [];


        var month_label = null;
        var current_month_count = 8;
        var last_month_count = 9;


        for (m = 1; m < last_month_count; m++) { 
          // Initialize Arrays 
          var Category_Data = [];
          var chart_categories = [];
          var chart_totals = [];
          // Add Readable Month Label
          var month_label = getMonthLabel(m);
          // CATEGORIES

          // Get Data from Mint Exports
          var Categories = _.pluck(data_2016[m], 'Category');
          // Only Load Category Label Once
          var All_Categories = _.uniq(Categories);
          var category_count = _.size(All_Categories);
          cc('Number of Unique Categories in 2016 Month['+month_label+']: '+category_count);
          
          // Iterate Through categories, add total spent per category
          for (i = 0; i < category_count; i++) { 
            var current_category = All_Categories[i];
            var current_category_parent = findParentCategory(current_category);
            // cc('current_category_parent: '+current_category_parent,'info');
            var total = totalSpent(current_category, data_2016[m]);  
            total = parseFloat(total);
            total = total.toFixed(2);

            var data = [];
                data = [{
                    "category" : current_category,
                    "total" : total,
                    "parent" : current_category_parent,
                  }];  
            Category_Data = Category_Data.concat(data);  
            var Category_Data_Size = _.size(Category_Data);

            // After processing single transactions, when all category grouped total spending complete, then show on Chart
            var ce = category_count-1;

            if (i == ce ) {
              var month_data = [];

              var sorted_month_data = _.groupBy(Category_Data,"parent");
              var sorted_month_data_size = _.size(sorted_month_data);
              // var sorted_month_data_array = _.toArray(sorted_month_data);
              // console.log('sorted_month PARENT Categories\n',sorted_month_data_size);
              // console.log('sorted_month_data_array\n',sorted_month_data);
              Parent_Category_Data_2016 = Parent_Category_Data_2016.concat(sorted_month_data);
              // saveParent_Category_Data_2016(sorted_month_data);

              month_data = [{
                  "month" : m,
                  "data" : Category_Data
                }];  
              Data_By_Month_2016 = Data_By_Month_2016.concat(month_data); 
              // Remove Income categories // Order Dataset

              Category_Data = removeIncomeCategories(Category_Data);
              Category_Data = _.sortBy(Category_Data,"category");
              // Prepare Chart Needs
              chart_categories = _.pluck(Category_Data, 'category');
              // Add uniq categories to All Categories
              Categories_2016 = Categories_2016.concat(chart_categories);
              chart_totals = _.pluck(Category_Data, 'total');
              var chart_label = month_label+' Spending Category';
              // SINGLE CATEGORYDRAW CHART
              drawChart(chart_categories,chart_totals,chart_label,'child','bar');
            }
          } // end for loop for this month categories

          // Single transactions are now grouped into categories
          // Process categories
          if (m == current_month_count) {
            Categories_2016 = _.uniq(Categories_2016);
            var Categories_2016_size = _.size(Categories_2016);
            cc('Number of Categories_2016: '+Categories_2016_size);
            // cc('unique Categories_2016: ','highlight');
            
            // Show list of Categories
            $('p.copy').append('<ul id="category_list"></ul>')
            for (c = 0; c < Categories_2016_size; c++) { 
              $('#category_list').append('<li>'+Categories_2016[c]+'</li>');
            }

            for (m = 0; m < current_month_count; m++) { 
              var getData = Data_By_Month_2016[m]["data"];
              var totalCategoriesThisMonth = Data_By_Month_2016[m]["data"].length;
              // cc('totalCategoriesThisMonth['+m+']: '+totalCategoriesThisMonth);
              var totalCategoriesThisMonth_flag = totalCategoriesThisMonth--;

              var year_month_data = [];
              var month_data = []
              
              for (c = 0; c < totalCategoriesThisMonth_flag; c++) {
                // cc('Found Category in Month['+m+']: '+Data_By_Month_2016[m]["data"][c]["category"]+ ' total: '+Data_By_Month_2016[m]["data"][c]["total"],'done');
                var child_category = Data_By_Month_2016[m]["data"][c]["category"];
                var parent_category = findParentCategory(child_category);
                var total = Data_By_Month_2016[m]["data"][c]["total"];
                total = parseFloat(total);
                total = total.toFixed(2);
                
                var this_month_data = {
                  parent_category : parent_category,
                  data : {
                    category : child_category,
                    total : total,
                  }
                };
                month_data = month_data.concat(this_month_data);
                
                if (c == totalCategoriesThisMonth) {
                  var month_count = m+1;
                  var this_month_data = [
                    {
                      month : getMonthLabel(month_count),
                      data : month_data
                    }
                  ];
                  Yearly_Totals = Yearly_Totals.concat(this_month_data);
                  var all_months_done = current_month_count-1;

                  if (m == all_months_done) {
                    cc('TOTAL Grouped Data:('+Yearly_Totals.length+') Month\'s Total','highlight');
                    console.log('Single Transactions Grouped by Category\n',Yearly_Totals);
                    processParentCategories(Parent_Category_Data_2016);
                  }
                }
              }
            } // end month loop for parent_categories
          } // end last month loop
        } // end loop through all months


        function processParentCategories(obj) {
          cc('processParentCategories','run');
          for (m = 0; m < last_month_count-1; m++) { 
            var total = null;
            // var year_month_data = [];
            var parent_month_data = []
            // var all_months_done = last_month_count-1;
            var sorted_month_data_array = _.toArray(obj[m]);
            // console.log('Month ['+getMonthLabel(m+1)+'] Sorted Parent Data: \n',sorted_month_data_array);
            cc('Total Sorted Parent Categories in '+getMonthLabel(m+1)+' : '+sorted_month_data_array.length);

            // For each single category, group under Parent Category and get total spend in this Parent Category
            for (i = 0; i < sorted_month_data_array.length; i++) { 
              total = 0;
              Parent_Category_Monthly_Spent = [];
              // for each subcategory get the total spend and add to running total
              for ( j = 0; j < sorted_month_data_array[i].length; j++) { 
                var this_total = sorted_month_data_array[i][j]["total"];
                total = total+parseFloat(this_total);
                // if all subcategory totals added then store the parent category total data into a month array
                if (j == sorted_month_data_array[i].length-1) {
                  // cc(getMonthLabel(m+1)+' Running TOTAL for : '+sorted_month_data_array[i][j]["parent"]+ ' $' +total.toFixed(2),'highlight');

                  // Dont Include Income categories
                  if (sorted_month_data_array[i][j]["parent"] != 'zIgnore') {
                    var this_data = {
                        parent_category : sorted_month_data_array[i][j]["parent"],
                        total_spent : total.toFixed(2)
                    };
                    parent_month_data = parent_month_data.concat(this_data);
                    parent_month_data = _.sortBy(parent_month_data,"parent_category");
                  }// end zIgnore
                  
                } 
              } // end [j]
              // Put all Parent categories into an array for the month
              if (i == sorted_month_data_array.length-1) {
                // console.log(parent_month_data);
                var this_data = {
                    month : getMonthLabel(m+1),
                    data : parent_month_data
                  };
                Parent_Yearly_Totals = Parent_Yearly_Totals.concat(this_data);
                // console.log('Unsorted\n',parent_month_data);
                // parent_month_data = _.sortBy(parent_month_data,'total_spent');
                var parent_month_data = _.sortBy(parent_month_data, function(obj){ return parseInt(obj.total_spent, 10) });

                // console.log('SORTED\n',parent_month_data);
                chart_categories = _.pluck(parent_month_data, 'parent_category');
                chart_totals = _.pluck(parent_month_data, 'total_spent');
                var chart_label = getMonthLabel(m+1)+' Parent Category Spending';
                // DRAW CHART
                drawChart(chart_categories,chart_totals,chart_label,'parent','bar');

                // if all of the monthly data has been added show the totals
                if (m == last_month_count-2) {
                  cc('DONE: Transactions Grouped into Parent Categories:','highlight');
                  console.log(Parent_Yearly_Totals);

                  if (urlParams["s"] != null || urlParams["s"] != undefined) {
                    var search_term = decodeURI(urlParams["s"]);
                    getSpendingByParentCategory(Parent_Yearly_Totals,search_term);
                  }
                }
              }
            } // end [i]
          } // end [m]
        }

        var chart_parent_categories = [];
        var chart_parent_totals = [];

        function getSpendingByParentCategory(Parent_Yearly_Totals,search_term) {
          $('.byMonth').hide();
          $('#byCategory').show();
          var chart_parent_categories = [];
          var chart_parent_totals = [];
          var chart_label = search_term+ ' Spending Trend';

          for (m = 0; m < last_month_count-1; m++) { 
            var g = searchCategory(search_term,Parent_Yearly_Totals[m]["data"]);
            chart_parent_categories = chart_parent_categories.concat(getMonthLabel(m+1));
            chart_parent_totals = chart_parent_totals.concat(g.total_spent);
            // console.log('Groceries\n',g);
            if (m == last_month_count-2) {
              cc('DONE: getSpendingByParentCategory','highlight');
              console.log('chart_categories\n',chart_parent_categories);
              console.log('chart_totals\n',chart_parent_totals);
              drawChart(chart_parent_categories,chart_parent_totals,chart_label,'byCategory','line');
            }
          }// end m
        }
        function searchCategory(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].parent_category === nameKey) {
                    return myArray[i];
                }
            }
        }

        function drawChart(chart_categories,chart_totals,chart_label,chart_type,style) {
          switch(chart_type){
            case 'parent' :
              var ctx = document.getElementById("chart-parent-"+month_label);  
              break;
            case 'byCategory' :
              var ctx = document.getElementById("chart-byCategory");
              break;
            default :
              var ctx = document.getElementById("chart-"+month_label);
          }
          
          // var ctx = document.getElementById("chart-"+month_label);
          var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: chart_categories,
                  datasets: [{
                        label: chart_label,
                        data: chart_totals,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(205, 90, 132, 0.2)',
                            'rgba(14, 12, 215, 0.2)',
                            'rgba(205, 26, 96, 0.2)',
                            'rgba(70, 12, 182, 0.2)',
                            'rgba(103, 108, 155, 0.2)',
                            'rgba(201, 33, 99, 0.2)',
                            'rgba(207, 9, 24, 0.2)',
                            'rgba(211, 12, 94, 0.2)'
                        ],
                    }
                  ]
              },
              options: custom_chart_options
          });
        }


        function containsCategory(Yearly_Totals,size,find_category){

          cc('containsCategory['+find_category+'] total months['+size+']','run');

          for (x = 0; x < size; x++) {
            var category_count = Yearly_Totals[x]["data"].length;
            for (y = 0; y < category_count; y++) {
              var current = Yearly_Totals[x]["data"];
              cc('Month['+Yearly_Totals[x]["month"]+'] Category['+Yearly_Totals[x]["data"][y]["category"]+'] Total['+Yearly_Totals[x]["data"][y]["total"]+']');
              if (Yearly_Totals[x]["data"][y]["category"] == find_category) {
                cc('category MATCHED','success');
              }
            }
          }
        }

        function groupSubCategories(Category_Data,category_count) {
          cc('groupSubCategories','run');
          // console.log(Category_Data);
          // cc('Category_Data[0]["data"][0]["category"] '+Category_Data[0]["data"][0]["category"],'info')
          var size = _.size(Category_Data);
          var loop_end = size;
          // cc('size'+size,'highlight')
          // cc('Categories_2016_size: '+Categories_2016_size,'done');
          
          var st = 0;
          var Entertainment_Total = 0;
          var Eating_Out_Total = 0;

          for (c = 0; c < size; c++) {
            
          }
          cc('post','info')
          
        }

        function removeIncomeCategories(data){
          // Remove Income from Spending Categories
          var data = $.grep(data, function(e){ 
             return e.category != 'Income'; 
          });
          // Remove Transfers from Spending Categories
          var data = $.grep(data, function(e){ 
             return e.category != 'Transfer to PFCU'; 
          });
          // Remove Payments to Credit Accounts from Spending Categories
          var data = $.grep(data, function(e){ 
             return e.category != 'Credit Card Payment'; 
          });
          return data;
        }

        function totalSpent(category,period){
          var category_data = _.where(period, {Category: category});        
          var category_amounts = _.pluck(category_data,'Amount');
          var category_sum = _.reduce(category_amounts, function(memo, num){ return memo + num; }, 0); 
          var category_total_spent = parseFloat(category_sum).toFixed(2);
          cc('Category Total Spent('+category+'): $'+category_total_spent,'success',true);
          return category_total_spent;
        }

        function getMonthLabel(m) {
          switch(m) {
            case 1:
                month_label = 'January'
                break;
            case 2:
                month_label = 'February'
                break;
            case 3:
                month_label = 'March'
                break;
            case 4:
                month_label = 'April'
                break;
            case 5:
                month_label = 'May'
                break;
            case 6:
                month_label = 'June'
                break;
            case 7:
                month_label = 'July'
                break;
            case 8:
                month_label = 'August'
                break;
            case 9:
                month_label = 'September'
                break;
            case 10:
                month_label = 'October'
                break;
            case 11:
                month_label = 'November'
                break;
            case 12:
                month_label = 'December'
                break;
            default:
                month_label = 'error'
          }
          return month_label
        }
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
