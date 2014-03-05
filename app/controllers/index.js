function doClick(e) {
	var api_user='<youruser>';
	var api_key='<yourpassword>';

	var sendgrid  = require('tisendgrid')(api_user, api_key);

	var cb_onsuccess = function(e) {
		console.log('Success: ' + e);
	};

	var cb_onerror = function(err, status, body) {
		console.log('Error: ' + err + '; Status: ' + status + '; Body: ' + body);
	};

	var email = {
	  to:       	['john@doe.com', 'doe@emai.com'],
	  from:  	   'yamil@aloha.com',
	  subject:  	'AppC Test',
	  text:     	'My first email through SendGrid.'
	};

	var message = sendgrid.Email(email);

	sendgrid.send(message,cb_onsuccess,cb_onerror);
}

$.index.open();
