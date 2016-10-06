/*****************************************************************/
// Console Class - add css to console debugging.
/*****************************************************************/

/* 
  Example Usage: send a message and the bootstrap class of 'success' to print a green console message
  cc('This is the message that will be printed in the console','success');
*/

// Turn Console Messages On/Off (true/false)
var console_class = true;

var theme_run,
    theme_ready,
    theme_done,
    theme_success,
    theme_info,
    theme_warning,
    theme_error,
    theme_fatal,
    theme_default,
    theme_data = null;
var theme_highlight   = 'color: #000000; padding: 2px 10px; border: dotted 2px green; font-family: "Courier New", Courier, monospace;';

var theme = 'bootstrap';
// var theme = 'batman';

switch(theme){
  case "monalisa":
    theme_run     = 'color: #d5ae56;';
    theme_ready   = 'color: #808a58;';
    theme_done    = 'color: #8d7f48;';
    theme_success = 'color: #d5ae56;';
    theme_info    = 'color: #e0b75d;';
    theme_warning = 'color: #b38138;';
    theme_error   = 'background: #b94631; color: #fff;';
    theme_fatal   = 'background: #a9471d; color: #FFF; padding: 2px 100px;';
    theme_default = 'color: #000000;';
    theme_data    = 'color: #000000; padding: 2px 5px; border: dotted 1px #777; font-family: "Courier New", Courier, monospace;';
    break;
  case "batman":
    theme_run     = 'color: #ccc65e;';
    theme_ready   = 'background: #6a9c7c; color: #fff; padding: 1px 10px;';
    theme_done    = 'color: #535135;';
    theme_success = 'background: #000; color: #f7ef11; padding: 1px 10px;';
    theme_info    = 'background: #137bb3; color: #fff; padding: 1px 10px;';
    theme_warning = 'color: #bab4b5;';
    theme_error   = 'background: #8b1c15; color: #fff;';
    theme_fatal   = 'background: #de1e23; color: #fff; padding: 2px 100px;';
    theme_default = 'color: #000000;';
    theme_data    = 'color: #000000; padding: 2px 5px; border: dotted 1px #777; font-family: "Courier New", Courier, monospace;';
    break;
  case "bootstrap":
    theme_run     = 'background: #fff; color: #82bfd8;';
    theme_ready   = 'color: #8be8cd;';
    theme_done    = 'color: #000000;';
    theme_success = 'background: #b6dbac; color: #000;';
    theme_info    = 'background: #ffc145; color: #000;';
    theme_warning = 'background: #f79f79; color: #000;';
    theme_error   = 'background: #d71816; color: #FFF;';
    theme_fatal   = 'background: #FF0000; color: #FFF; padding: 2px 100px;';
    theme_default = 'background: #ffffff; color: #7ea2aa;';
    theme_data    = 'color: #000000; padding: 2px 5px; border: dotted 1px #777; font-family: "Courier New", Courier, monospace;';
}

function cc(message,console_class,disable_console_log){
  if (!disable_console_log) {
    var c = null;
    var m = message;
    switch(console_class){
      case "run":
        m = 'RUNNING: '+m;
        c = theme_run;
        break;
      case "ready":
        c = theme_ready;
        break;
      case "done":
        c = theme_done;
        break;
      case "success":
        c = theme_success;
        break;
      case "info":
        c = theme_info;
        break;
      case "warning":
        m = 'WARNING: '+m;
        c = theme_warning;
        break;
      case "error":
        m = 'ERROR: '+m;
        c = theme_error;
        break;
      case "fatal":
        m = 'FATAL ERROR: '+m;
        c = theme_fatal;
        break;
      case "data":
        m = m;
        c = theme_data;
        break;
      case "highlight":
        m = m;
        c = theme_highlight;
        break;
      default:
        c = theme_default;
    }
    if (console_class = true) {
      console.log('%c '+m,c);  
    };
  };
}

function runConsoleClassTests(){
  cc('Example class run', 'run');
  cc('Example class ready', 'ready');
  cc('Example class success', 'success');
  cc('Example class warning', 'warning');
  cc('Example class info', 'info');
  cc('Example class error', 'error');
  cc('Example class fatal', 'fatal');
  cc('Example class data', 'data');
}

// runConsoleClassTests();

define(['jquery','underscore','moment'], 
  function($, _, moment) {
    console.log('useful.js LOADED');
    /******************************************************************/
    /*********  Commonly Useful Functions and Custom Helpers  *********/
    /******************************************************************/

    // $(document).ready(function() {
      console.error();
      console.warn();
      console.log('%c jquery underscore moment Ready', 'background: #00cc00; color: #000; padding: 2px 300px');
      // startSession();
    // }); // end Doc Ready 



    /*************************************************************/
    /******************** Check for Existence of Value ****************/
    /*************************************************************/


    function isItemNullorUndefined(item,disable_console_log){
      // cc('isItemNullorUndefined: '+item,'run');
      cc('isItemNullorUndefined: ','run',disable_console_log)
      if (item == null || item == 'null' || item == undefined || item == 'undefined') {
        cc('ITEM is - '+item,'error');
        return true
      }else{
        cc('ITEM is not Null or Underfined','success');
        return false
      }
    }




    /*****************************************************************/
    /********************** SET LOCAL STORAGE  ***********************/
    /*****************************************************************/

    function setLocalStorage(data,name){
      cc('setLocalStorage', 'run');
      var data_return = 'not sure';
      var d = dataType(data,'string');
      localStorage.setItem(name,d);
    }



    /*****************************************************************/
    /********** Work With Local Storage Session Data *****************/
    /*****************************************************************/

    function startSession(){
      cc('startSession','run');
      setupStorage();
    }

    function setupStorage(){
      cc('checkSessionTime','run')
      var stored_timestamp = localStorage.getItem('session_timestamp');
      var stored_id = localStorage.getItem('session_id');
      var session_started = localStorage.getItem('session_started');
      if (stored_timestamp == undefined || stored_id == undefined || session_started == undefined ) {
        resetSessionData();
      }else{
        cc('Session already set: id('+stored_id+') timestamp('+stored_timestamp+')','info');
        var timestamp = moment().format("X");
        var time_passed = timestamp - stored_timestamp;
        // alert('time_passed passed(millisec): '+time_passed)
        // alert('time_passed passed(mins): '+time_passed/60)
        // alert('time_passed passed(hours): '+time_passed/60/60)
        var hours_passed = time_passed/60/60;
        if (hours_passed > 1) {
          cc('Last session started over 1 hour ago, resetting session to get new data','warning')
          resetSessionData();
        };
      }
    }

    function resetSessionData(){
      cc('resetSessionData','run')
      clearSession();
      setSessionID();
      setSessionTime();
      setDateRange();
    }

    function clearSession(){
      cc('clearSession','run');
      localStorage.removeItem( 'session_id');
      localStorage.removeItem( 'session_started');
      localStorage.removeItem( 'session_timestamp');
      localStorage.removeItem( 'start_date');
      localStorage.removeItem( 'end_date');
    }  



    /*****************************************************************/
    /***********************  Set Session Data  Values **************/
    /*****************************************************************/

    function setSessionID(){
      // create new random ID
      cc('setSessionID','run')
      var session_id = Math.random().toString(36).substr(2, 7);
      localStorage.setItem( 'session_id', session_id );
      console.log('session_id set: '+session_id);
    }

    function setSessionTime(){
      // create new random ID
      cc('setSessionTime','run')
      var now = new Date();
      now = moment().format("YYYY-MM-DD, h:mm:ss a");
      var session_started = now;
      localStorage.setItem( 'session_started', session_started );
      var timestamp = moment().format("X");
      localStorage.setItem( 'session_timestamp', timestamp );
    }


    /*****************************************************************/
    /****************** Date Functions                ****************/
    /*****************************************************************/

    function setDateRange(){
      // create new random ID
      cc('setDateRange','run');
      var earlier = moment().subtract(3, 'months');
      earlier = moment(earlier).format("YYYY-MM-DD");
      var today = moment().format("YYYY-MM-DD");
      localStorage.setItem( 'start_date', earlier );
      localStorage.setItem( 'end_date', today );
      cc('start_date: '+earlier+' end_date: '+today,'success')
    }

    function checkStartDate(){
      cc('checkStartDate','run');
      var start_date = localStorage.getItem( 'start_date' );
      if (isItemNullorUndefined(start_date,true)) {
        cc('No Start Date set;','error');
        // setDateRange();
        var start_date = moment().format("YYYY/MM/DD");
        // var start_date = localStorage.getItem( 'start_date' );
      }
      cc('start_date is:'+start_date,'info');
      return start_date;
    }


    function checkEndDate(){
      var end_date = localStorage.getItem( 'end_date' );
      if (isItemNullorUndefined(end_date,true)) {
        cc('No End Date set;');
        setDateRange();
        var end_date = localStorage.getItem( 'end_date' );
      };
      return end_date;
    }


    function setStartDate(){
      cc('setStartDate','run');
      var start_date = $('#start_date').val();
      if (isItemNullorUndefined(start_date,true)) {
        setDateRange();
      }else{
        localStorage.setItem( 'start_date', start_date );
        cc('start_date set: '+start_date,'info');
      }
    }

    function setEndDate(){
      cc('setEndDate','run');
      var end_date = $('#end_date').val();
      if (isItemNullorUndefined(end_date,true)) {
        setDateRange();
      }else{
        localStorage.setItem( 'end_date', end_date );
        cc('end_date set: '+end_date,'info');  
      }
      
    }



    /*****************************************************************/
    /*************************** Data Functions  ***************************/
    /*****************************************************************/


    function getLocalData(data_name){
      cc('getLocalData('+data_name+')','run');
      var d = localStorage.getItem(data_name);
      return d;
      // Example:  localStorage.setItem( 'session_item_data_array',data);
    }


    function dataType(data,convert_to){
      cc('dataType', 'run');
      var data_return = 'not sure';

      if (_.isObject(data)) {
        cc('original data type is object','info');
        if(convert_to == 'string' || convert_to == 'JSON'){
          new_data_object = JSON.stringify(data);
          if (_.isString(new_data_object)) {
            cc('data is NOW converted from object to string','success');
            return new_data_object;
          }
          else{
            return data;
          }
        }
      }
      else if (_.isString(data)) {
        cc('original data type is string','info');
        if(convert_to == 'object'){
          new_data_object = JSON.parse(data);
          if (_.isObject(new_data_object)) {
            cc('data is NOW converted from string to object','success');
            return new_data_object;
          }
          else{
            return data;
          }
        }
      }
      else{
        return data;
      }
    }
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

});


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
console.log('*************** urlParams ************\n',urlParams,'\n***************');
// console.log(urlParams);