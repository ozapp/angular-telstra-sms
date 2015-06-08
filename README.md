angular-telstra-sms
============

An angularjs service that take care of send SMS with telstra API.



#### How to use?

Install with bower:

```
$ bower install angular-telstra-sms
```


In you controller:

```
// first inject it into your app
angular.module('youApp', ['telstraApi'])

.controller('yourCtrl', function(TelstraSms) {

	TelstraSms.init({
		APP_KEY:'12345678901234567890',
		APP_SECRET:'1234567890'
	});

	TelstraSms.sendSms({
		to:'0400123456',
		body:'test message from Telstra API'
	}).then(function(response){
			console.log(response.messageId)
		});

	TelstraSms.getMessageStatus('A3B6D420BF5A923CA3122B').then(function(response){
			console.log(response.status);
		});

	TelstraSms.getMessageResponse('8FDD80E4DA4C8485A69').then(function(messageArray){
			console.log(messageArray);
		});




});

```


#### Build

```
$ npm install
$ gulp build
```

#### License

MIT