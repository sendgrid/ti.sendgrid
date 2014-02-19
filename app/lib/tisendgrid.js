/*
* Sendgrid module for Appcelerator Titanium
* Author: Ricardo Alcocer (@ricardoalcocer)
*
* Based on https://github.com/sendgrid/sendgrid-nodejs
*
*/

"use strict";

var Sendgrid = function(api_user, api_key) {
  if( !(this instanceof Sendgrid) ) {
    return new Sendgrid(api_user, api_key);
  }

  var send = function(email,onsuccess,onerror) {
    email.api_user=api_user;
    email.api_key=api_key;

    var postOptions = {
      method  : 'POST',
      //uri     : 'http://posttestserver.com/post.php'
      uri     : 'https://api.sendgrid.com/api/mail.send.json'
    };

    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
        onsuccess(this.responseText);
      },
      onerror : function(e) {
        onerror(this.error,this.status,this.responseText);
      },
      timeout : 5000
    })
      
    client.open(postOptions.method, postOptions.uri);
    client.send(email);
  };

  /*
  * Expose public API calls
  */

  this.api_user = api_user;
  this.api_key = api_key;
  this.send = send;

  return this;
};

module.exports = Sendgrid;