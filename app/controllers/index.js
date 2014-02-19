function doClick(e) {
	var api_user="<youruser>";
	var api_key="<yourpassword>";

	var sendgrid  = require('tisendgrid')(api_user, api_key);

	var cb_onsuccess=function(e){
		console.log('Success: ' + e)
	}

	var cb_onerror=function(err,status,body){
		console.log('Error: ' + err + '; Status: ' + status + '; Body: ' + body);
	}

	var email={
	  		to:       	'to@email.com',
	  		toname: 	'to name',
	  		from:  	   	'from@email.com',
	  		fromname: 	'from name',
	  		subject:  	'Hello World',
	  		text:     	'My first email through SendGrid.',
	  		html: 	  	'<b>This is a test!!!</b>'
		}


    /*f1 = Titanium.Filesystem.getFile('appicon.png');
    i1 = f1.read(); // this variable is sent to the server
    email.image=i1;*/

	sendgrid.send(email,cb_onsuccess,cb_onerror);
}

$.index.open();
