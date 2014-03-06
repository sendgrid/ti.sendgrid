# ti.sendgrid

> This library was a working proof-of-concept.  The code was recently submitted to Sendgrid, and after some (a lot) of extra coding, it is now Sendgrid's official Titanium Library - Cool!.  This repo will not be maintained.  For an up-to-date version please refer to Sendgrid's Github account.


A Sendgrid CommonJS library for Titanium

This module provides basic support for sending emails through Sendgrid from you Titanium App.

## Usage

	// define api access
	var api_user="<youruser>";
	var api_key="<yourpassword>";

	// load the module
	var sendgrid  = require('tisendgrid')(api_user, api_key);

	// define success callback
	var cb_onsuccess=function(e){
		console.log('Success: ' + e)
	}

	// define error callback
	var cb_onerror=function(err,status,body){
		console.log('Error: ' + err + '; Status: ' + status + '; Body: ' + body);
	}

	// create email object
	var email={
		to:       		'to@email.com',
		toname: 		'to name',
		from:  	   		'from@email.com',
		fromname: 		'from name',
		subject:  		'Hello World',
		text:     		'My first email through SendGrid.', 
 		html: 	  		'<b>This is a test!!!</b>'
	}

	// send email
	sendgrid.send(email,cb_onsuccess,cb_onerror);
	
---