/* =======================================
    Find Data within Array - Find a Needle in a Haystack
* ======================================= */

// given a data object (arr) and a value (query_item_id), check to see if the value is within the data.
// if value found found in data object, return the data for the matching ID
// Usage: If a Students ID (value) is found within a Course (arr), return the Student data so the Student ID and name can be displayed

function findItemByID(data,item_ID,item_TYPE,disable_console_log){
  cc('findItemByID(data,'+item_ID+','+item_TYPE+') disable_console_log('+disable_console_log+')','run',disable_console_log);
  console.log('findItemByID - below is the value of the incoming data:');
  console.log(data);
  cc('is data NULL?','info');
  isItemNullorUndefined(data,true);
  cc('is item NULL?','info');
  isItemNullorUndefined(item_ID,true);
  // ----- TEST TO ENSURE DATA IS WORKING ------ // 
  // var y = data[0];
  // console.log(y);
  // cc('data[0] ID = '+y.id,'success');
  // cc('data[0] fullname = '+y.fullname,'success');
  // ------------------------------------------ //

  var found = false;
  
  if (item_TYPE == 'course' || item_TYPE == 'courses') {
    console.log('checking courses...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info',disable_console_log);
      cc('data.length = '+data.length, 'info',disable_console_log);
      
      cc('node = data['+i+']:','info',disable_console_log);
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Course Details: Course Name('+data[i].fullname+') Category('+data[i].category+') STARTDATE('+data[i].startdate+')', 'success',disable_console_log);
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  category: data[i].category,
                  fullname: data[i].fullname,
                  shortname: data[i].shortname,
                  startdate: data[i].startdate
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning');
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for course or courses
  else if (item_TYPE == 'quizattempt' || item_TYPE == 'quizattempts') {
    console.log('checking quizattempts...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info');
      cc('data.length = '+data.length, 'info');
      cc('node = data['+i+']:','info' );
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Attempt Details: Quiz('+data[i].quiz+') User('+data[i].userid+')', 'success');
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  quiz: data[i].quiz,
                  userid: data[i].userid,
                  attempt: data[i].attempt,
                  uniqueid: data[i].uniqueid,
                  timestart: data[i].timestart,
                  timefinish: data[i].timefinish,
                  timemodified: data[i].timemodified,
                  timecheckstate: data[i].timecheckstate,
                  sumgrades: data[i].sumgrades
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning');
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for course or courses
  else if (item_TYPE == 'quiz' || item_TYPE == 'quizzes') {
    console.log('checking quiz...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info');
      cc('data.length = '+data.length, 'info');
      cc('node = data['+i+']:','info' );
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Quiz Details: Name('+data[i].name+') Course ID('+data[i].course+') SUMGRADES('+data[i].sumgrades+')', 'success');
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  name: data[i].name,
                  sumgrades: data[i].sumgrades,
                  course: data[i].grade
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning');
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for course or courses
  else if (item_TYPE == 'parent_ID' ) {
    console.log('checking parent_ID...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info',disable_console_log);
      cc('data.length = '+data.length, 'info',disable_console_log);
      cc('node = data['+i+']:','info',disable_console_log );
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Parent Details: Name('+data[i].name+') ID('+data[i].id+')', 'success');
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  name: data[i].name
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning',disable_console_log);
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for course or courses
  else{
    cc('Data type not found. Nothing specified to be done with the incoming data', 'error');
  } 
}

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