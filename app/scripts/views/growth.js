//Filename: views/header.js
define(['jquery','underscore','chartjs'], 
  function($, _,chartjs) {
  	console.log('views/growth loaded');
// inject into DOM
  // $('#faq_list').append(myFaqsView.el);

  var headline = '<h1 class="headline-big">Finance</h1>';
  var copy =      '<p class="copy">finance charts.</p>';
  var chart =     '<canvas id="growth_chart" width="400" height="400" style="margin:20px;"></canvas>';
  var chart_financial_summary =     '<canvas id="chart_financial_summary" width="400" height="400" style="margin:20px;"></canvas>';
  
  var Content = _.template(headline+copy+chart+chart_financial_summary);
  return Content;
});

