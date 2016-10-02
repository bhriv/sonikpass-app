/******************************************************************/
/*********  Commonly Useful Functions and Custom Helpers  *********/
/******************************************************************/

// $(document).ready(function() {
  console.error();
  console.warn();
  console.log('%c Document Ready', 'background: #00cc00; color: #000; padding: 2px 300px');
  // startSession();
// }); // end Doc Ready 

/*************************************************************/
/******************** Open Link in Pop Up Window  ****************/
/*************************************************************/

// Open link in a new popup window pre-sized 
function pop_up(hyperlink, window_name){
    if (!window.focus) {
        return true;
    }
    var href = (typeof(hyperlink) == 'string' ? hyperlink : hyperlink.href);
    window.open(href, window_name, 'width=800,height=800,toolbar=no, scrollbars=yes');
    return false;
}


/*****************************************************************/
/****************** FIND parameters in URL string ****************/
/*****************************************************************/
/*
   Populate a JSON object of all URL query string parameters
   Reference Resource: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
*/

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
console.log('*************** urlParams ************\n',urlParams,'***************');
// console.log(urlParams);



/*****************************************************************/
/****************** Date Functions                ****************/
/*****************************************************************/

/*****************************************************************/
// Date Picker Processing Functions 
/*****************************************************************/


function setStartDate(){
  cc('setStartDate','run');
  var start_date = $('#start_date').val();
  alert(start_date);
  // if (isItemNullorUndefined(start_date,true)) {
  //   setDateRange();
  // }
  localStorage.setItem( 'start_date', start_date );
  cc('start_date set: '+start_date,'info');
}

function setEndDate(){
  cc('setEndDate','run');
  var end_date = $('#end_date').val();
  // if (isItemNullorUndefined(end_date,true)) {
  //   setDateRange();
  // }
  localStorage.setItem( 'end_date', end_date );
  cc('end_date set: '+end_date,'info');
}