//Filename: views/header.js
define(['jquery','underscore','chartjs'], 
  function($, _,chartjs) {
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
  	console.log('views/growth_data loaded');
// inject into DOM
  // $('#faq_list').append(myFaqsView.el);
  
  // var Content = _.template(data);
  // return Content;
});

