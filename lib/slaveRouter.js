var express = require('express');
const captureImage = require('./captureImage');

var app = express();

function slaveRouter(){
	console.log('im am a slave router')
	const PORT = 3000;
	app.get('/', function(req, res){
		console.log("request recieved");
		
		captureImage(req.query).then((fileName)=>{
			var options = {
				root: __dirname + '/',
				dotfiles: 'deny',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			};
			
			res.sendFile(fileName, options, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Sent:', fileName);
				}
			});
		})
		
	})
	
	app.listen(PORT)
	console.log("Listening on port " + PORT)
}	

module.exports = slaveRouter;