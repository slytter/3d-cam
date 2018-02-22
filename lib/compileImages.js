var videoshow = require('videoshow')


var videoOptions = {
	fps: 20,
	loop: 0.1, // seconds
	transition: false,
	videoBitrate: 1024*8,
	videoCodec: 'libx264',
	size: '1280x?',
	audioChannels: 0,
	audioBitrate: '0k',
	format: 'mp4',
	pixelFormat: 'yuv420p'
}



function compileImages(images, fileName){
	videoshow(images, videoOptions)
	.save(fileName)
	.on('start', function (command) {
		console.log('ffmpeg process started:', command)
	})
	.on('error', function (err, stdout, stderr) {
		console.error('Error:', err)
		console.error('ffmpeg stderr:', stderr)
	})
	.on('end', function (output) {
		console.error('Video created in:', output)
	})
}

module.exports = compileImages;