var express = require('express');
const captureImage = require('./captureImage');

var app = express();

function slaveRouter(){
	console.log('im am a slave router')
	const PORT = 3000;
	app.get('/', function(req, res){
		console.log("request recieved");
		
		captureImage(req.query).then((fileName)=>{
			console.log(fileName)
			var options = {
				root: __dirname + '/',
				dotfiles: 'deny',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			};
			
			res.sendFile('images/test.jpg', options, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Sent:', fileName);
				}
			});
		}).catch(err =>{
			console.log(err)
		})
		
	})
	
	app.listen(PORT)
	console.log("Listening on port " + PORT)
}	

slaveRouter()

//module.exports = slaveRouter;
