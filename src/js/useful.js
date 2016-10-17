/*****************************************************************/
/*************************** Data Type ***************************/
/*****************************************************************/

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