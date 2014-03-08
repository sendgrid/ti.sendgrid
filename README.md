# Titanium SendGrid

Simple CommonJS library to be used in Titanium projects in order to
send emails through
[SendGrid's Web API](http://sendgrid.com/docs/API_Reference/Web_API/mail.html).

## Installation

Titanium IDE:

* Copy tisendgrid.js into your lib folder.

Gittio:
* **TODO**

## Example

```js
var sendgrid = require('tisendgrid')('SENDGRID-USERNAME', 'SENDGRID-PASSOWORD');
sendgrid.send({
	to: 'john@email.com',
	from: 'doe@email.com',
	subject: 'Hello!',
	text: 'Hello again!'
}, function (e) {
	if (e) {
		console.log(e); // Email wasn't sent
	}
});
```

### Create Email Object

```js
var sendgrid = require('tisendgrid')('SENDGRID-USERNAME', 'SENDGRID-PASSOWORD');
var email = sendgrid.Email({to: ['john@email', 'doe@email.com']});
var otherEmail = sendgrid.Email();
```

#### Adding Recipients

```js
email.addTo('jose@email.com');
email.addTo(['jose2@email.com', 'happy@email.com']);
```

#### Adding ToName

```js
email.addToName('Jose');
email.addToName(['Jose 2', 'Happy']);
```

#### Setting From

```js
email.setFrom('joseph@email.com');
```

#### Setting FromName

```js
email.setFromName('Joseph');
```

#### Setting Subject

```js
email.setSubject('subject');
```

#### Setting Text

```js
email.setText('this text');
```

#### Setting HTML

```js
email.setHTML('<b>that html</b>');
```

#### Adding BCC Recipients

```js
email.addBcc('jose@email.com');
email.addBcc(['jose2@email.com', 'happy@email.com']);
```

#### Setting Reply To

```js
email.setReplyTo('email@email.com');
```

#### Setting Date

```js
email.setDate(new Date().toUTCString());
```

#### Adding Files

```js
// Filename parameter is optional
email.addFile('./filepath/file', 'filename');
email.addFile(file); // Titanium.Filesystem.File
```

#### Setting Header

```js
email.setHeader('some header');
```

#### Setting SMTPAPI Header

```js
email.setAPIHeader('{sub:{key:value}}');
```

## SendGrid's  [X-SMTPAPI](http://sendgrid.com/docs/API_Reference/SMTP_API/)


### [Substitution](http://sendgrid.com/docs/API_Reference/SMTP_API/substitution_tags.html)

```js
emai.addSubstitution('key', 'value')
```

### [Section](http://sendgrid.com/docs/API_Reference/SMTP_API/section_tags.html)

```js
email.addSection('section', 'value')
```

### [Category](http://sendgrid.com/docs/Delivery_Metrics/categories.html)

```js
email.addCategory('category')
```

### [Unique Arguments](http://sendgrid.com/docs/API_Reference/SMTP_API/unique_arguments.html)

```js
email.addUniqueArg('key', 'value')
```

### [Filter](http://sendgrid.com/docs/API_Reference/SMTP_API/apps.html)

```js
email.addFilter('filter', 'setting', 'value')
```
