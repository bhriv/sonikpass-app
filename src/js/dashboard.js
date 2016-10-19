// @author: BHRIV

/********* FRONTEND API ENDPOINT NOTES *************/
/* 

	Use the ajax request type specifies the action (GET, POST, DELETE)

	All API endpoints will all be listed at api.sonikpass.com.
	The first call should be to api.sonikpass.com to get all API endpoint URI's.

	The 'base_url' is likely to be api.sonikpass.com/v1/ but this is not set in stone. Each session should request the name

	GET:
	Get version: 		base_url/version
	Get users list	 /account/{accountid}/users
 
	POST:
 	Create account	base_url/account
 	Create user		base_url/account/{accountid}/user
 
	DELETE:
 	Delete user	  base_url/account/{accountid}/user/{user_id}

 	* Note - Sonikpass currently does not have any DELETE actions. Rather, the 'lifespan.is_enabled' is updated to = false

*/

// Define Static endpoints
// @FIXME - replace with call to api.sonikpass.com to fetch all endpoint definitions once available
var api = [];
var api_base_url = 'api.sonikpass.com.js';

//
function defineEndpointURIs() {
	var data_source = api_base_url;

	var request_done = $.getJSON(data_source, function( json ){
		cc('Requesting data from endpoint: '+data_source);
	})
	.always(function( json ) {
  	// cc( "Data Returned: \n",'info' );
  	// console.log(json);
  })
  .success(function( json ) {
  	var data = _.flatten(json);
  	cc( "Success: API endpoints are defined \n",'success' );
  	runApplication();
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    cc( "Request Failed: " + err,'error' );
    cc('Response: \n',jqxhr,'error');
    handleAjaxError(jqxhr);
    $('#testing-only').hide();
    $('#current-user').html('<p class="error">API Endpoint Loading Failed. Fix API Endpoints to proceed.</p>');
	});
  // If data returned, determine what to do next
	$.when(request_done).then(function(data){
	  cc('defineEndpointURIs request_done.');
	  api = data[0];
	  cc('API Base URL for Single Accounts: '+api.account);
	  cc('API URL for All Accounts: '+api.accounts);
	  cc('API URL for Version: '+api.version);
	});
}

// Run UI

defineEndpointURIs();

function runApplication(argument) {
	currentUserStatus();
}

function clearResults(argument) {
	cc('clearing results','info');
	$('#response_details').html('');
	$('div.result').html('');
}

/*********************************
* Core Function for Handling Main UI Actions
*	--------------------------------
* - accept the action request and parameters
* - get data for the corresponding endpoint
* - handle errors
* - update UI
*
/*********************************/
function processRequestedAction(chained_action,search_id,item_type,user_id) {
	cc('processRequestedAction','run');
	// event.preventDefault();
	var data_source = api.account;
	// @FIXME - testing only
	// Use hard coded routes to data files to test routing to full endpoints
	// When the server endpoints are configured comment out the TEST ENDPOINT lines below.
	// START TEST ENDPOINTS
		var data_source = api.accounts;
		if (chained_action == 'getAccountByID' || chained_action == 'listAllAccounts' || search_id == 'all') {
			data_source = api.account+search_id+'.js';
		}
		if (chained_action == 'getUserByAccountIDandUserID') {
			data_source = api.account+search_id+'/user/'+user_id+'.js';
		}
	// END TEST ENDPOINTS

	var request_done = $.getJSON(data_source, function( json ){
		cc('Requesting data from endpoint: '+data_source);
	})
	.always(function( json ) {
  	// var data = _.flatten(json);
  	cc( "Data Returned: \n",'info' );
  	console.log(json);
  })
  .success(function( json ) {
  	var data = _.flatten(json);
  	cc( "Request Success: \n",'success' );
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    cc( "Request Failed: " + err,'error' );
    cc('Response: \n',jqxhr,'error');
    handleAjaxError(jqxhr);
	});

  // If data returned, determine what to do next
	$.when(request_done).then(function(data){
	  cc('processRequestedAction request_done. chained_action = '+chained_action);
	  switch(chained_action){
	  	case 'listAllAccounts':
	  				cc('listAllAccounts','highlight')
	  				listAllAccounts(data);	
	  				break
	  	case 'listFirstAccount':
	  				listFirstAccount(data);		
	  				break
	  	case 'listAllUsers':
	  				listAllUsers(data);		
	  				break
	  	case 'checkForAccountID':
	  				var found = findItemByID(data,search_id,item_type,false);		
	  				cc('found_account data:','done');
	  				if (found != undefined) {
	  					listFoundAccountDetails(found);
	  				}else{
	  					cc('account was NOT found','info');
	  					var jqxhr = { status: '404', statusText: 'Account Not Found'};
	  					handleAjaxError(jqxhr);
	  				}
	  				break
	  	case 'checkForUsername':
	  				var found = findItemByID(data,search_id,item_type,false);		
	  				cc('found_username data:','done');
	  				if (found != undefined) {
	  					listFoundUserDetails(found);	
	  				}else{
	  					cc('username was NOT found','info');
	  					var jqxhr = { status: '404', statusText: 'Username Not Found'};
	  					handleAjaxError(jqxhr);
	  				}
	  				break
	  	case 'getUserByID':
	  				var found = findItemByID(data,search_id,item_type,false);		
	  				cc('found_user data:','done');
	  				if (found != undefined) {
	  					listFoundUserDetails(found);
	  				}else{
	  					cc('user was NOT found','info');
	  					var jqxhr = { status: '404', statusText: 'User Not Found'};
	  					handleAjaxError(jqxhr);
	  				}
	  				break
	  	case 'getUserByAccountIDandUserID':
	  				cc('getUserByAccountIDandUserID','highlight');
	  				listFullUserDetails(data);
	  				break
	  	case 'getAccountByID':
	  				var found = findItemByID(data,search_id,item_type,false);		
	  				cc('found_account data:','done');
	  				if (found != undefined) {
	  					listFoundAccountDetails(found);
	  				}else{
	  					cc('account was NOT found','info');
	  					var jqxhr = { status: '404', statusText: 'Account Not Found'};
	  					handleAjaxError(jqxhr);
	  				}
	  				break
	  	default :
	  				cc('No chained_action set for processRequestedAction','warning');
	  				console.log(data);
	  }
	});
}

// Various mock UI update functions 
// - move to Backbone Collections and Item views once API server configured

function listFirstAccount(data) {
	cc('listFirstAccount','run');
	for (i = 0; i < 1; i++) { 
		cc('Account: '+data[i].name+' ID:'+data[i].id)
  }
}

function listAllAccounts(data) {
	cc('listAllAccounts','run');
	console.log(data);

	for (i = 0; i < data.length; i++) { 
		cc('Account: '+data[i].name+' ID:'+data[i].id)
		var content = '<li>ACCOUNT ID:'+data[i].id+' '+data[i].name+' <br>Billing ID'+data[i].billing_id+'<br>Contact: '+data[i].users[0].contact[0].given_name+' '+data[i].users[0].contact[0].surname+' ('+data[i].users[0].email[0].address+')<hr></li>'
	$('#response_details').append(content)
  }
}

function listFoundAccountDetails(data) {
	cc('listFoundAccountDetails','run');
	console.log(data);
	data = JSON.parse(data);
	
	var content = '<li>FOUND ACCOUNT with ID:'+data.id+'<br>'+data.name+' <br>Billing ID'+data.billing_id+'<br>Contact: '+data.users[0].contact[0].given_name+' '+data.users[0].contact[0].surname+' ('+data.users[0].email[0].address+')</li>'
	$('#response_details').append(content)
}

function listFoundUserDetails(data) {
	cc('listFoundUserDetails','run');
	console.log(data);
	data = JSON.parse(data);	
	$('#response_details').html('');
	var content = '<li>FOUND USER with ID:'+data.id+'<br>'+data.username+' Contact: '+data.contact[0].given_name+' '+data.contact[0].surname+' ('+data.email[0].address+')<br> Telephone'+data.telephone[0].number+'</li>'
	$('#response_details').append(content)
}

function listFullUserDetails(data) {
	cc('listFullUserDetails','run');
	console.log(data);
	data = data[0];
	$('#response_details').html('');
	var content = '<li>USER ID:'+data.id+'<br>'+data.username+' is_enabled: '+data.lifespan.is_enabled+' Contact: '+data.contact[0].given_name+' '+data.contact[0].surname+' ('+data.email[0].address+')<br> Telephone'+data.telephone[0].number+'</li>'
	$('#response_details').append(content)
}

function listAllUsers(data) {
	cc('listAllUsers (from all accounts)','run');
	for (var i = 0; i < data.length; i++) { 
		cc('Account: '+data[i].name+' ID:'+data[i].id)
		var account_data = JSON.stringify( data[i]);
		var content = '<li class="accounts" data-accountdata="'+account_data+'" id="account-'+data[i].id+'"><strong>Account</strong> ID: '+data[i].id+' <strong>Company</strong>:'+data[i].name+'</li>';
		$('#response_details').append(content);
		var users = data[i].users;
		var sub_content = '';
		for (u = 0; u < users.length; u++) { 
			cc(' - Username: '+users[u].username+' ID:'+users[u].id,'done');
			var user_data = JSON.stringify( users[u]);
			sub_content = sub_content+ '<li data-userdata="'+user_data+'"> Username: '+users[u].username+' ID:'+users[u].id+'</li>';
	  }
	  $('#account-'+data[i].id).append('<ul></ul>');
	  $('#account-'+data[i].id+' ul').append(sub_content);
  }
}

function logoutAction() {
	localStorage.removeItem('logged_in_user');
	$('.user-actions').hide();
	currentUserStatus();
}

function currentUserStatus(){
	cc('currentUserStatus','run');
	var data = localStorage.getItem('logged_in_user');
	data = JSON.parse(data);
	console.log(data);
	if (data != null && data != undefined) {
		$('body span.user-status').html('Logged In As: '+data.users[0].username+'<br>User Account Enabled:'+data.users[0].lifespan.is_enabled);
		$('body .user-actions').show();
		$('#tempLogin').hide();
	}else{
		$('body span.user-status').html('Not Logged In');
		$('#tempLogin').show();
	}
}


// User Interaction Specific Test Triggers

// Sinple test for 
$( "button.trigger" ).click(function( event ) {
	event.preventDefault();
	console.log('working');
});

$( "body.testing button" ).click(function( event ) {
	event.preventDefault();
	clearResults();
});

$( "#listAllAccounts" ).click(function( event ) {
	var id = $(this).attr("id");
	cc(id,'run');
	event.preventDefault();
	processRequestedAction(id,'all','accounts');	
});

$( "#listAllUsers" ).click(function( event ) {
	var id = $(this).attr("id");
	cc(id,'run');
	event.preventDefault();
	processRequestedAction(id,'all','accounts');	
});

$( "#checkForAccountID" ).click(function( event ) {
	var id = $(this).attr("id");
	cc(id,'run');
	event.preventDefault();
	var a_id = $( "input[name='checkForAccountID']" ).val();
	cc('submitted ID: '+a_id);
	if (a_id == '') {
		alert('Please enter an ID')
	}else{
		processRequestedAction(id,a_id,'account');	
	}
});

$( "#checkForUsername" ).click(function( event ) {
	var id = $(this).attr("id");
	cc(id,'run');
	event.preventDefault();
	var a_id = $( "input[name='checkForUsername']" ).val();
	cc('submitted username: '+a_id);
	if (a_id == '') {
		alert('Please enter a username')
	}else{
		processRequestedAction(id,a_id,'username');	
	}
});

$( "#getUserByID" ).click(function( event ) {
	var id = $(this).attr("id");
	cc(id,'run');
	event.preventDefault();
	var a_id = $( "input[name='getUserByID']" ).val();
	cc('submitted ID: '+a_id);
	if (a_id == '') {
		alert('Please enter an ID')
	}else{
		processRequestedAction(id,a_id,'user');	
	}
});

$( "#getAccountByID" ).click(function( event ) {
	var id = $(this).attr("id");
	cc(id,'run');
	event.preventDefault();
	var a_id = $( "input[name='getAccountByID']" ).val();
	cc('submitted ID: '+a_id);
	if (a_id == '') {
		alert('Please enter an ID')
	}else{
		processRequestedAction(id,a_id,'account');	
	}
});

$( "#getUserByAccountIDandUserID" ).click(function( event ) {
	var id = $(this).attr("id");
	cc(id,'run');
	event.preventDefault();
	var a_id = $( "input[name='getAccountByID']" ).val();
	var user_id = $( "input[name='getUserByID']" ).val();
	cc('submitted ID: '+a_id);
	if (a_id == '' || user_id == '') {
		alert('Please enter an ID in both getAccountByID and getUserByID')
	}else{
		processRequestedAction(id,a_id,'account',user_id);	
	}
});

$( "#logout" ).click(function( event ) {
	var id = $(this).attr("id");
	cc('logout','highlight')
	cc(id,'run');
	event.preventDefault();
	logoutAction();
});

// Mock Test Example to Update User status. 
$( ".deactivate_user" ).click(function( event ) {
	var id = $(this).attr("class");
	cc(id,'run');
	event.preventDefault();
	var data = localStorage.getItem('logged_in_user');
	data = JSON.parse(data);
	console.log(data);
	// Add data to expected format
	var accountID = data.account_id;
	var userEmail = data.users[0].email[0].address;
 	var new_data = {
	  account_id: accountID,
	  users: [
	    {
	      username: userEmail,
	      email: [
	        {
	          label: 'primary',
	          address: userEmail
	        }
	      ],
	      lifespan: {
	      	is_enabled : false
	      }
	    }
	  ]  
	};
	// set local user
	localStorage.removeItem('logged_in_user');
	localStorage.setItem('logged_in_user',JSON.stringify(new_data));
	currentUserStatus();
});

// Mock User Login - to provide tests for status handling
$( "#tempLogin" ).submit(function( event ) {
	var id = $(this).attr("class");
	cc(id,'run');
	// Stop form from submitting normally
  event.preventDefault();
  clearResults();
  // Get some values from elements on the page:
  var $form = $(this);
  var userEmail = $form.find( "input[name='userEmail']" ).val();
  var accountID = $form.find( "input[name='accountID']" ).val();
  if (userEmail == '') {
  	alert('Please enter a valid test email as the username');
  	logoutAction();
  }
  // Add data to expected format
 	var formData = {
	  account_id: accountID,
	  users: [
	    {
	      username: userEmail,
	      email: [
	        {
	          label: 'primary',
	          address: userEmail,
	          confirmed: false
	        }
	      ],
	      lifespan: {
	      	is_enabled : true
	      }
	    }
	  ]  
	};
	// set local user
	localStorage.setItem('logged_in_user',JSON.stringify(formData));
	currentUserStatus();
});


$( "#setupNewAccount" ).submit(function( event ) {
	cc('setupNewAccount','run');
  event.preventDefault();// Stop form from submitting normally
  clearResults();
  // Get some values from elements on the page:
  var $form = $(this);
  var userEmail = $form.find( "input[name='newAccount']" ).val();
  // Add data to expected format
 	var formData = {
	  account_id: '', // account ID is blank as this is a new account.
	  users: [
	    {
	      username: userEmail,
	      email: [
	        {
	          label: 'primary',
	          address: userEmail,
	          confirmed: false
	        }
	      ],
	    }
	  ]  
	};
	localStorage.setItem('newAccount',JSON.stringify(formData));
	// Send data to Add User endpoint
	var data_source = api.account;
	// To test a FAIL, set the following: 
  // var data_source = 'failtest.js';
	$.ajax({
	    url: data_source,
	    type: "POST",
	    data: formData,
	    processData: false,
	    contentType: 'application/json'
	})
	// $.getJSON(data_source, function( json ){
	// 	console.log('Requested data from URL: '+data_source);
	// })
  .success(function( json ) {
  	cc( "POST successful JSON Data Returned: \n" + json,'info' );
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    cc( "Request Failed: " + err,'error' );
    cc('Response: \n',jqxhr,'error');
    handleAjaxError(jqxhr);
	});

});


/* =======================================
    Find Data within Array - Find a Needle in a Haystack
* ======================================= */

// given a data object (arr) and a value (query_item_id), check to see if the value is within the data.
// if value found found in data object, return the data for the matching ID
// Usage: If a Students ID (value) is found within a Course (arr), return the Student data so the Student ID and name can be displayed

function findItemByID(data,item_ID,item_TYPE,disable_console_log){
  cc('findItemByID(data,'+item_ID+','+item_TYPE+')','run',disable_console_log);
  console.log('incoming data:\n',data);
  var found = false;

  if (item_TYPE == 'account' || item_TYPE == 'accounts') {
    for(var i = 0; i < data.length; i++) {
      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED in Data: '+found, 'success');
              var json = JSON.stringify(data[i]);
              // console.log('data to return: \n',json);
              return json;
              break;
          }else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning');
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for account
  else if (item_TYPE == 'user' || item_TYPE == 'user') {
    for(var i = 0; i < data.length; i++) {
    	//  only loop through required node
      var users = data[i].users;
			for (u = 0; u < users.length; u++) { 
				cc(' Username: '+users[u].username+' ID:'+users[u].id,'done');
				if (users[u].id == item_ID) {
            found = true;
            cc('ID MATCHED in Data: '+found, 'success');
            var json = JSON.stringify(users[u]);
            // console.log('data to return: \n',json);
            return json;
            break;
        }else{
          cc('ID not matched in users['+u+'], moving on to the next node', 'warning');
        }
		  }
    } // end for // iterate through dataay
  } // end check for user
  else if (item_TYPE == 'username') {
    for(var i = 0; i < data.length; i++) {
    	//  only loop through required node
      var users = data[i].users;
			for (u = 0; u < users.length; u++) { 
				cc(' Username: '+users[u].username+' ID:'+users[u].id,'done');
				if (users[u].username == item_ID) {
            found = true;
            cc('username MATCHED in Data: '+found, 'success');
            var json = JSON.stringify(users[u]);
            // console.log('data to return: \n',json);
            return json;
            break;
        }else{
          cc('username not matched in users['+u+'], moving on to the next node', 'warning');
        }
		  }
    } // end for // iterate through dataay
  } // end check for user
  else{
    cc('Data type not found. Nothing specified to be done with the incoming data', 'error');
  } 
}

// end @author: BHRIV