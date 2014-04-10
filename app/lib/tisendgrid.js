/*
SMTPAPI Library for AppC
*/

function smtpapi(header) {
  header = header || {};
  this.header = {};
  this.header.to = header.to || [];
  this.header.sub = header.sub || {};
  this.header.unique_args = header.unique_args || {};
  this.header.category = header.category || [];
  this.header.section = header.section || {};
  this.header.filters = header.filters || {};
}

smtpapi.prototype.addTo = function(to) {
  if (to instanceof Array) {
    this.header.to = this.header.to.concat(to);
  } else {
    this.header.to.push(to);
  }
};

smtpapi.prototype.setTos = function(to) {
  if (to instanceof Array) {
    this.header.to = to;
  } else {
    this.header.to = [to];
  }
};

smtpapi.prototype.addSubstitution = function(key, val) {
  if (this.header.sub[key] === undefined) this.header.sub[key] = [];
  if (val instanceof Array) {
    this.header.sub = this.header.sub[key].concat(val);
  } else {
    this.header.sub[key].push(val);
  }
};

smtpapi.prototype.setSubstitutions = function(subs) {
  this.header.sub = subs;
};

smtpapi.prototype.addUniqueArg = function(key, val) {
  this.header.unique_args[key] = val;
};

smtpapi.prototype.setUniqueArgs = function(val) {
  this.header.unique_args = val;
};

smtpapi.prototype.addCategory = function(cat) {
  if (cat instanceof Array) {
    this.header.category.concat(cat);
  } else {
    this.header.category.push(cat);
  }
};

smtpapi.prototype.setCategories = function(cats) {
  if (cats instanceof Array) {
    this.header.category = cats;
  } else {
    this.header.category = [cats];
  }
};

smtpapi.prototype.addSection = function(sec, val) {
  this.header.section[sec] = val;
};

smtpapi.prototype.setSections = function(sec) {
  this.header.section = sec;
};

smtpapi.prototype.addFilter = function(filter, setting, val) {
  if (this.header.filters[filter] === undefined) {
    this.header.filters[filter] = {'settings': {}};
  }
  this.header.filters[filter].settings[setting] = val;
};

smtpapi.prototype.setFilters = function(filters) {
  this.header.filters = filters;
};

smtpapi.prototype.jsonString = function() {
  var header = {};
  for (var key in this.header) {
    if (this.header.hasOwnProperty(key) && Object.keys(this.header[key]).length) {
      header[key] = this.header[key];
    }
  }
  return JSON.stringify(header);
};

/*
SendGrid.Email implementation for AppC
*/

function Email(mail) {
  if (!(this instanceof Email)) {
    return new Email(mail);
  }

  mail = mail || {};
  smtpapi.call(this, mail['x-smtpapi']);
  this.body = {};
  this.toCounter = 0;
  this.bccCounter = 0;
  this.tonameCounter = 0;
  this.addTo(mail.to || mail['to[]']);
  this.addToName(mail.toname || mail['toname[]']);
  this.addBcc(mail.bcc || mail['bcc[]']);
  this.body.from = mail.from || '';
  this.body.fromname = mail.fromname || '';
  this.body.subject = mail.subject || '';
  this.body.text = mail.text || '';
  this.body.html = mail.html || '';
  this.body.replyto = mail.replyto || '';
  this.body.dates = mail.date || new Date().toUTCString();
  this.body.headers = mail.headers || '';
  if (mail.files && mail.files instanceof Array) {
    for (var i = 0, len = mail.files.length; i < len; i++) {
      this.addFile(mail.files[i].file, mail.files[i].name);
    }
  }
}

Email.prototype = Object.create(smtpapi.prototype);
Email.prototype.constructor = Email;

Email.prototype.addTo = function(email) {
  if (email instanceof Array) {
    for(var i = 0, len = email.length; i < len; i++) {
      this.body['to[' + this.toCounter++ +']'] = email[i];
    }
  } else {
    this.body['to['+ this.toCounter++ +']'] = email;
  }
};

Email.prototype.addToName = function(name) {
  if (name instanceof Array) {
    for(var i = 0, len = name.length; i < len; i++) {
      this.body['toname[' + this.tonameCounter++ +']'] = name[i];
    }
  } else {
    this.body['toname['+ this.tonameCounter++ +']'] = name;
  }
};

Email.prototype.setFrom = function(email) {
  this.body.from = email;
};

Email.prototype.setFromName = function(name) {
  this.body.fromname = name;
};

Email.prototype.setSubject = function(subject) {
  this.body.subject = subject;
};

Email.prototype.setText = function(text) {
  this.body.text = text;
};

Email.prototype.setHTML = function(html) {
  this.body.html = html;
};

Email.prototype.addBcc = function(bcc) {
  if (bcc instanceof Array) {
    for(var i = 0, len = bcc.length; i < len; i++) {
      this.body['bcc[' + this.bccCounter++ + ']'] = bcc[i];
    }
  } else {
    this.body['bcc['+ this.bccCounter++ +']'] = bcc;
  }
};

Email.prototype.setReplyTo = function(replyto) {
  this.body.replyto = replyto;
};

Email.prototype.setDate = function(date) {
  this.body.date = date;
};

Email.prototype.addFile = function(file, name) {
  if (typeof file === 'string') {
    file = Titanium.Filesystem.getFile(file);
  }
  name = name || file.name;
  this.body['files[' + name + ']'] = file;
};

Email.prototype.setHeaders = function(header) {
  this.body.header = header;
};

Email.prototype.setAPIHeader = function(header) {
  this.body['x-smtpapi'] = header || this.jsonString();
};

Email.prototype.getEmail = function() {
  this.setAPIHeader();
  var body = {};
  for (var key in this.body) {
    if (this.body.hasOwnProperty(key) && this.body[key]) {
      if (this.body[key] instanceof Array && this.body[key].length === 0) {
        continue;
      }
      body[key] = this.body[key];
    }
  }
  return body;
};

function SendGrid(api_user, api_key) {
  if (!(this instanceof SendGrid)) {
    return new SendGrid(api_user, api_key);
  }

  //Private
  var _buildBody = function(mail) {
    if (mail.constructor.name === 'Email') {
      mail = mail.getEmail();
    } else {
      mail = (new Email(mail)).getEmail();
    }
    mail.api_user = credentials.api_user;
    mail.api_key = credentials.api_key;
    return mail;
  };

  var options = {
    method  : 'POST',
    uri     : 'https://api.sendgrid.com/api/mail.send.json'
  };

  var credentials = {
    api_user: api_user,
    api_key: api_key
  };

  //Priviledged
  this.send = function (email, cb) {
    var client = Ti.Network.createHTTPClient({
      onload: function(e) {
        cb(null);
      },
      onerror: function(e) {
        cb(JSON.parse(this.responseText));
      },
      timeout: 5000
    });

    email = _buildBody(email);
    client.open(options.method, options.uri);
    client.send(email);
  };

  this.Email = Email;
  this.smtpapi = smtpapi;

}

module.exports = SendGrid;
