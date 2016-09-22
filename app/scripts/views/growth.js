//Filename: views/header.js
define(['jquery','underscore','chartjs'], 
  function($, _,chartjs) {
  	console.log('views/growth loaded');
// inject into DOM
  // $('#faq_list').append(myFaqsView.el);

  var headline = '<h1 class="headline-big">Finance</h1>';
  var copy =      '<p class="copy">finance charts.</p>';
  
  var jan =     '<canvas class="byMonth" id="chart-January"></canvas>';
  var feb =     '<canvas class="byMonth" id="chart-February"></canvas>';
  var march =     '<canvas class="byMonth" id="chart-March"></canvas>';
  var april =     '<canvas class="byMonth" id="chart-April"></canvas>';
  var may =     '<canvas class="byMonth" id="chart-May"></canvas>';
  var june =     '<canvas class="byMonth" id="chart-June"></canvas>';
  var july =     '<canvas class="byMonth" id="chart-July"></canvas>';
  var august =     '<canvas class="byMonth" id="chart-August"></canvas>';
  var sept =     '<canvas class="byMonth" id="chart-September"></canvas>';
  var oct =     '<canvas class="byMonth" id="chart-October"></canvas>';
  var nov =     '<canvas class="byMonth" id="chart-November"></canvas>';
  var dec =     '<canvas class="byMonth" id="chart-December"></canvas>';
  
  var parent_jan =     '<canvas class="byMonth" id="chart-parent-January"></canvas>';
  var parent_feb =     '<canvas class="byMonth" id="chart-parent-February"></canvas>';
  var parent_march =     '<canvas class="byMonth" id="chart-parent-March"></canvas>';
  var parent_april =     '<canvas class="byMonth" id="chart-parent-April"></canvas>';
  var parent_may =     '<canvas class="byMonth" id="chart-parent-May"></canvas>';
  var parent_june =     '<canvas class="byMonth" id="chart-parent-June"></canvas>';
  var parent_july =     '<canvas class="byMonth" id="chart-parent-July"></canvas>';
  var parent_august =     '<canvas class="byMonth" id="chart-parent-August"></canvas>';
  var parent_sept =     '<canvas class="byMonth" id="chart-parent-September"></canvas>';
  var parent_oct =     '<canvas class="byMonth" id="chart-parent-October"></canvas>';
  var parent_nov =     '<canvas class="byMonth" id="chart-parent-November"></canvas>';
  var parent_dec =     '<canvas class="byMonth" id="chart-parent-December"></canvas>';
  
  var category_chart =     '<canvas class="byCategory" id="chart-byCategory"></canvas>';

  // var chart =     '<canvas class="byMonth" id="growth_chart"></canvas>';
  // var chart_financial_summary =     '<canvas class="byMonth" id="chart_financial_summary"></canvas>';
  
  var Content = _.template(headline+copy

    +category_chart
    // +dec
  	// +parent_dec
    // +nov
  	// +parent_nov
    // +oct
  	// +parent_oct
    // +sept
  	// +parent_sept
    +august
  	+parent_august
    +july
  	+parent_july
    +june
  	+parent_june
    +may
  	+parent_may
    +april
  	+parent_april
    +march
  	+parent_march
    +feb
  	+parent_feb
    +jan
  	+parent_jan

  	);
  return Content;
});

