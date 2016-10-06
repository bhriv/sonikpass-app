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

