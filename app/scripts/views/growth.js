//Filename: views/header.js
define(['jquery','underscore','chartjs'], 
  function($, _,chartjs) {
  	console.log('views/growth loaded');
// inject into DOM
  // $('#faq_list').append(myFaqsView.el);

  var headline = '<h1 class="headline-big">Finance</h1>';
  var copy =      '<p class="copy">finance charts.</p>';
  
  var jan =     '<canvas id="chart-Jan" width="400" height="400" style="margin:20px;"></canvas>';
  var feb =     '<canvas id="chart-February" width="400" height="400" style="margin:20px;"></canvas>';
  var march =     '<canvas id="chart-March" width="400" height="400" style="margin:20px;"></canvas>';
  var april =     '<canvas id="chart-April" width="400" height="400" style="margin:20px;"></canvas>';
  var may =     '<canvas id="chart-May" width="400" height="400" style="margin:20px;"></canvas>';
  var june =     '<canvas id="chart-June" width="400" height="400" style="margin:20px;"></canvas>';
  var july =     '<canvas id="chart-July" width="400" height="400" style="margin:20px;"></canvas>';
  var august =     '<canvas id="chart-August" width="400" height="400" style="margin:20px;"></canvas>';
  var sept =     '<canvas id="chart-September" width="400" height="400" style="margin:20px;"></canvas>';
  var oct =     '<canvas id="chart-October" width="400" height="400" style="margin:20px;"></canvas>';
  var nov =     '<canvas id="chart-November" width="400" height="400" style="margin:20px;"></canvas>';
  var dec =     '<canvas id="chart-December" width="400" height="400" style="margin:20px;"></canvas>';

  var chart =     '<canvas id="growth_chart" width="400" height="400" style="margin:20px;"></canvas>';
  var chart_financial_summary =     '<canvas id="chart_financial_summary" width="400" height="400" style="margin:20px;"></canvas>';
  
  var Content = _.template(headline+copy
  	+jan
  	+feb
  	+march
  	+april
  	+may
  	+june
  	+july
  	+august
  	+sept
  	+oct
  	+nov
  	+dec
  	+chart+chart_financial_summary);
  return Content;
});

