function doClick(e) {
	var api_user='<youruser>';
	var api_key='<yourpassword>';

	var sendgrid  = require('tisendgrid')(api_user, api_key);

	var email = {
	  to:       	['john@doe.com', 'doe@emai.com'],
	  from:  	   'yamil@aloha.com',
	  subject:  	'AppC Test',
	  text:     	'My first email through SendGrid.'
	};

	var message = sendgrid.Email(email);

	sendgrid.send(message, function(e) {
		if (e) {
			console.log(e);
		}
	});
}

$.index.open();
