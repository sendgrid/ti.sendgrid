function doClick(e) {
	var api_user='<youruser>';
	var api_key='<yourpassword>';

	var sendgrid  = require('tisendgrid')(api_user, api_key);

	var email = {
	  to:       	$.to.value.split(','),
	  from:  	   	$.from.value,
	  subject:  	$.subject.value,
	  text:     	$.message.value
	};

	var message = sendgrid.Email(email);

	sendgrid.send(message, function(e) {
		if (e) {
			console.log(JSON.stringify(e));
			alert(e.errors[0]);
		}else{
			alert('Message sent');
		}
	});
}

$.index.open();
