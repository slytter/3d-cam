var express = require('express');
const captureImage = require('./captureImage');
const path = require('path')
fs = require('fs')
var app = express();

function slaveRouter(){
	console.log('im am a slave router')
	const PORT = 3000;
	app.get('/', function(req, res){
		console.log("request recieved");
		
		captureImage(req.query).then((fileName)=>{
			console.log(fileName)
			var options = {
				root: path.join(__dirname, '/../images/'),
				dotfiles: 'deny',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			};
			
			res.sendFile('image.jpg', options, function (err) {
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
