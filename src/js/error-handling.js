
/********** ERROR HANDLING *************/
/* Gracefully deal with request errors 
	 Provide meaningful, friendly feedback to the user
*/
// Example: Error: 403, error.status: 'rate_limit';

// How to Run Tests: 
//  - specify an server_error_status_code
//  - specify a specific status server_error_status_string
//  - uncomment the following 3 lines: 

// var server_error_status_code = '403';
// var server_error_status_string = 'rate_limit';
// var processErrors = getResponseLabels(server_error_status_code,server_error_status_string);	

var result_holder = 'div.result';

function getResponseLabels(server_error_status_code,server_error_status_string){
	console.log('getResponseLabels');
	console.log(server_error_status_code);
	console.log(server_error_status_string);
  // Look through predefined statusErrorFeedback details
  // error responses located in /js/error-handling.js
  var data = statusErrorFeedbackDetails; // feedback object
  console.log(data);
  data = $.grep(data, function(e){ 
     return e.error_code == server_error_status_code; // Find labels based on Error Code
  });
  return data;
}

function getErrorInstructions(data,server_error_status_string){
	console.log('getErrorInstructions\n',data);
	console.log('server_error_status_string\n',server_error_status_string);
  // Look through predefined statusErrorFeedback details
  var data = $.grep(data, function(e){ 
  		// console.log('this status: '+e.status);
     return e.status == server_error_status_string; // Find labels based on Error Code
  });
  return data;
}

function handleAjaxError(jqxhr) {
	console.log('Response Code: '+jqxhr.status);
	console.log('Response Text: '+jqxhr.statusText);
	var processErrors = getResponseLabels(jqxhr.status,jqxhr.statusText);	
	// If there was an error, get the custom response details, display details for User.
	$.when(processErrors).then(function(data){
	  // After the error has been processed, display User friendly feedback with instructions. 
	  cc('processErrors','done');
	  console.log(data);
	  var ui_data = data[0];
	  var error_class = ui_data.ui_class;
	  if (error_class = undefined) {
	  	error_class = 'error';
	  }
	  $(result_holder).addClass(error_class).html('<strong>'+ui_data.error_code+' Response: '+ui_data.ui_title+'</strong><br>');
	  var s = data[0].error_status;
	  var info = getErrorInstructions(s,jqxhr.statusText);
	 	info = info[0];
	 	// If not a 503 Error, Display additional instructions
	 	if (info != undefined) {
	 		$(result_holder).append('<span>'+info.ui_title+'. '+info.ui_instruction+'</span>');	
	 	}
	 	$(result_holder).show();
	});
}
console.log('error-handling loaded');


var statusErrorFeedbackDetails = [
	{
		error_code: '0',
		label: 'Fatal Error',
		ui_title : 'Fatal Error',
		ui_class : 'fatal',
		error_status :  [
			{
				status: 'error',
				ui_title: 'Something went wrong.',
				ui_instruction : 'Please contact support.'
			}
		]
	},
	{
		error_code: '200',
		label: 'OK',
		ui_title : 'Response OK',
		ui_class : 'success',
		error_status : [
			{
				status: 'response_ok',
				ui_title: 'Response OK',
				ui_instruction : 'The response seems OK.'
			}
		]
	},
	{
		error_code: '400',
		label: 'Bad Request',
		ui_title : 'Value Invalid',
		ui_class : 'error',
		error_status : [
			{
				status: 'value_invalid',
				ui_title: 'Value Invalid',
				ui_instruction : 'Usually this is a server issue. Try refreshing your browser and resubmitting.'
			}
		]
	},
	{
		error_code: '403',
		label: 'Forbidden',
		ui_title : 'Forbidden',
		ui_class : 'error',
		error_status :  [
			{
				status: 'account_disabled',
				ui_title: 'Account Disabled',
				ui_instruction : 'This account disabled. Please contact your account administrator.'
			},
			{
				status: 'permission_denied',
				ui_title: 'Permission Denied',
				ui_instruction : 'You do not have sufficient permissions to complete this request.'
			},
			{
				status: 'rate_limit',
				ui_title: 'Rate Limit Exceeded',
				ui_instruction : 'The rate limit for this request has been exceeded in the given timeframe.'
			},
			{ 
				status: 'user_disabled',
				ui_title: 'User Disabled',
				ui_instruction : 'This user has been disabled.'
			},
			{ 
				status: 'username_exists',
				ui_title: 'Address Not Available',
				ui_instruction : 'The submitted email address already exists. Please submit a new email address or if you have previously signed up to Sonikpass using this email address please login. '
			}
		]
	},
	{
		error_code: '404',
		label: 'Not Found',
		ui_title : 'Not Found',
		ui_class : 'error',
		error_status :  [
			{
				status: 'Not Found',
				ui_title: 'Resource Not Found',
				ui_instruction : 'The requested resource was not found.'
			}
		]
	},
	{
		error_code: '503',
		label: 'Service Unavailable',
		ui_title : 'Service Unavailable',
		ui_class : 'fatal',
		error_status : [
			{
				status: null,
				ui_title: 'Service Unavailable. Try Again Later.',
				ui_instruction : 'Usually this means you have lost network or server connectivity. Please try again in a few minutes.'
			}
		]
	}
];