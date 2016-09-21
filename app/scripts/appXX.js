// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
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
  'views/growth_data',
  // 'views/transactions/2016/07',
  // 'views/transactions/2016/08',
  'views/finance_data',
  // 'text!../templates/growth.html',
], 
function($, _, Backbone, Marionette,navigation,layout,cta_content,footer_content,about_content,team_content,team_list,faq_list,growth_content,growth_data,finance_data){
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

        var month_label = null;
        var current_month_count = 8;
        var last_month_count = 9;

        var parent_category_list = [];
        var parent_category_list = [
          {
            "parent_category" : 'Coffee Shops'
          },
          {
            "parent_category" : 'Groceries'
          },
          {
            "parent_category" : 'zIgnore'
          },
          {
            "parent_category" : 'Travel Related'
          },
          {
            "parent_category" : 'Home Improvement & Supplies'
          },
          {
            "parent_category" : 'Fees & Financial Charges'
          },
          {
            "parent_category" : 'Personal Care & Improvement'
          },
          {
            "parent_category" : 'Utilities'
          },
          {
            "parent_category" : 'Car & Driving'
          },
          {
            "parent_category" : 'Fixed US Living Expenses'
          },
          {
            "parent_category" : 'Eating Out Expense'
          },
          {
            "parent_category" : 'Entertainment & Arts'
          },
        ]

        console.log('parent_category_list\n',parent_category_list)



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
          cc('Number of Unique Categories in 2016 Month['+month_label+']: '+category_count, 'highlight');
          
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

            // When all category total spending complete, then show on Chart
            var ce = category_count-1;

            if (i == ce ) {
              var month_data = [];

              var sorted_month_data = _.groupBy(Category_Data,"parent");
              var sorted_month_data_size = _.size(sorted_month_data);
              var sorted_month_data_obj = _.object(sorted_month_data);
              // console.log('sorted_month PARENT Categories\n',sorted_month_data_size);
              // console.log('sorted_month_data\n',sorted_month_data);
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
              // DRAW CHART
              drawMonthChart(chart_categories,chart_totals,chart_label);
            }
          } // end for loop for this month categories

          if (m == current_month_count) {
            Categories_2016 = _.uniq(Categories_2016);
            var Categories_2016_size = _.size(Categories_2016);
            cc('Nubmer of Categories_2016: '+Categories_2016_size,'highlight');
            cc('unique Categories_2016: ','highlight');
            
            // Add LABELS
            $('p.copy').append('<ul id="category_list"></ul>')
            for (c = 0; c < Categories_2016_size; c++) { 
              $('#category_list').append('<li>'+Categories_2016[c]+'</li>');
            }

            for (m = 0; m < current_month_count; m++) { 
              var getData = Data_By_Month_2016[m]["data"];
              var totalCategoriesThisMonth = Data_By_Month_2016[m]["data"].length;
              cc('totalCategoriesThisMonth['+m+']: '+totalCategoriesThisMonth);
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
                    cc('TOTAL Grouped Data:('+Yearly_Totals.length+') Month\'s Total','fatal')
                    console.log('Yearly_Totals\n',Yearly_Totals);
                    console.log('TOTAL Parent_Category_Data_2016\n',Parent_Category_Data_2016);
                    console.log('TOTAL Parent_Category_Data_2016[0]\n',Parent_Category_Data_2016[0]["Business Expenses"].length);

                    // var current_month_count_end = current_month_count -1;

                    // for (m = 0; m < current_month_count; m++) { 
                    //   // count sub categories in month
                    //   var total_c = Yearly_Totals[m]["data"].length;
                    //   // check total monthly spending
                    //   var monthly_total_out = null;
                    //   var monthly_total_in = null;

                    //   // SUBCATEGORIES
                    //   for (x = 0; x < Yearly_Totals[m]["data"].length; x++) { 
                    //     console.log(Yearly_Totals[m]["month"]+' Spent: ',Yearly_Totals[m]["data"][x]["data"]["total"]);
                    //     var d = _.sortBy(Yearly_Totals[m]["data"],'parent_category');
                    //     // console.log('Sorted array\n',d);
                    //     // check for adjacent matching categories
                    //     if (x < Yearly_Totals[m]["data"].length -1) {
                    //       if (d[x]["parent_category"] == d[x+1]["parent_category"]) {
                    //         cc([x]+' MATCHED parent_category to next node','info');
                    //         cc(d[x]["parent_category"] +' = '+d[x+1]["parent_category"] + ' : ' +d[x]["data"]["total"] +' + '+d[x+1]["data"]["total"]);
                    //       }else{
                    //         cc('No match');
                    //       }
                    //     }else{
                    //       cc('@fix me - last item','error');
                    //     }
                        
                    //     if (Yearly_Totals[m]["data"][x]["parent_category"] != 'Ignore') {
                    //       monthly_total_out = monthly_total_out + parseFloat(Yearly_Totals[m]["data"][x]["data"]["total"]);
                    //     }else{
                    //       monthly_total_in = monthly_total_in + parseFloat(Yearly_Totals[m]["data"][x]["data"]["total"]);
                    //     }

                    //     if (x == total_c-1) {
                    //       monthly_total_in = monthly_total_in.toFixed(2);
                    //       monthly_total_out = monthly_total_out.toFixed(2);

                    //       cc(Yearly_Totals[m]["month"]+' INCOME '+monthly_total_in);
                    //       cc(Yearly_Totals[m]["month"]+' OUT '+monthly_total_out);
                    //       cc(Yearly_Totals[m]["month"]+' NET GROWTH: $'+(monthly_total_in - monthly_total_out).toFixed(2),'info')
                    //     }
                    //   }
                    //   if (m = current_month_count_end) {
                    //     cc('Month END','fatal')
                    //   }
                      // var c_size = _.size(c);
                    // }
                  }
                }
              }
            } // end month loop for parent_categories
          } // end last month loop
        } // end loop through all months

        function drawMonthChart(chart_categories,chart_totals,chart_label) {
          var ctx = document.getElementById("chart-"+month_label);
          var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: chart_categories,
                  datasets: [{
                        label: chart_label,
                        data: chart_totals,
                    }
                  ]
              },
              options: custom_chart_options
          });
        }


        function findParentCategory(child_category) {
          // cc('findParentCategory for ['+child_category+']','run');
          var parent_category =  null;


          if (child_category == 'Coffee Shops' || 
              child_category == 'Cafe' ) { 
            parent_category = 0;
          }

          if (child_category == 'Groceries' || 
              child_category == 'Food' ) { 
            parent_category = 1;
          }

          if (child_category == 'Temporary Loan' || 
              child_category == 'Cash & ATM' ||
              child_category == 'Income' ||
              child_category == 'Transfer to PFCU' ||
              child_category == 'Credit Card Payment' ||
              child_category == 'Uncategorized' ) { 
            parent_category = 2;
          }

          if (child_category == 'Travel' || 
              child_category == 'Rental Car & Taxi' ||
              child_category == 'Air Travel' ) { 
            parent_category = 3;
          }

          if (child_category == 'Home Improvement' || 
              child_category == 'Home Services' ||
              child_category == 'Home Supplies' ||
              child_category == 'Furnishings' ) { 
            parent_category = 4;
          }

          if (child_category == 'Fees & Charges' || 
              child_category == 'Bank Fee' ||  
              child_category == 'Finance Charge' ||  
              child_category == 'ATM Fee' ||  
              child_category == 'Late Fee' ) { 
            parent_category = 5;
          }

          if (child_category == 'Personal Care' || 
              child_category == 'Health & Fitness' || 
              child_category == 'Hair' || 
              child_category == 'Essential Oils' || 
              child_category == 'Doctor' || 
              child_category == 'Sports' || 
              child_category == 'Spa & Massage' || 
              child_category == 'Hair and Skin Care' || 
              child_category == 'Education' || 
              child_category == 'Gym' || 
              child_category == 'Shopping' || 
              child_category == 'Clothing' ) { 
            parent_category = 6;
          }

          if (child_category == 'Toys' || 
              child_category == 'Baby Supplies' ||  
              child_category == 'Babysitter & Daycare' ||  
              child_category == 'Kids Activities' ||  
              child_category == 'Kids' ) { 
            parent_category = 7;
          }

          if (child_category == 'Business Services' || 
              child_category == 'Web Services' || 
              child_category == 'Subcontractors' || 
              child_category == 'Shipping' || 
              child_category == 'Equipment' || 
              child_category == 'Financial Advisor' || 
              child_category == 'Reimbursements' || 
              child_category == 'Office Supplies' || 
              child_category == 'Electronics & Software' ) { 
            parent_category = 8;
          }
          if (child_category == 'Mobile Phone' || 
              child_category == 'Internet' ||  
              child_category == 'Utilities' ||  
              child_category == 'Bills & Utilities' ||  
              child_category == 'Internet' ||  
              child_category == 'Home Phone' ) { 
            parent_category = 9;
          }
          if (child_category == 'Gas & Fuel' || 
              child_category == 'Highway Tolls' ||  
              child_category == 'Auto Insurance' ||  
              child_category == 'Auto & Transport' ||  
              child_category == 'Parking' ||  
              child_category == 'Service & Parts' ) { 
            parent_category = 10;
          }
          if (child_category == 'Mortgage & Rent' || 
              child_category == 'Federal Tax' ||  
              child_category == 'State Tax' ||  
              child_category == 'Health Insurance' ||  
              child_category == 'Check' ) { 
            parent_category = 11;
          }
          if (child_category == 'Eating Out' || 
              child_category == 'Food & Dining' ||  
              child_category == 'Fast Food' ||  
              child_category == 'Restaurants' ) { 
            parent_category = 12;
          }
          if (child_category == 'Alcohol & Bars' || 
              child_category == 'Arts' ||  
              child_category == 'Gift' ||  
              child_category == 'Shopping' ||  
              child_category == 'Entertainment' ||  
              child_category == 'Books' ||  
              child_category == 'Sporting Goods' ||  
              child_category == 'Movies & DVDs' ||  
              child_category == 'Music' ) { 
              // alert('Found Entertainment')
              parent_category = 13;
          }
          var parent_category_label = parent_category_list[1]["parent_category"];
          return parent_category_label;

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
