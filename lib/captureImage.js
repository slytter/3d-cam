//should be async?
function captureImage (options) {
	return new Promise(function(resolve, reject) {
		setTimeout(()=>{
			console.log("grapping image with options: " + options)
			var fileName = "images/image.png"
			return resolve(fileName)
		}, 2000)
	})
}

module.exports = captureImage