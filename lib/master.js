const fs = require('fs');
const request = require('request');
const ips = ['http://localhost:3000/']

const download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function requestCameras(){
    ips.forEach(function(ip, i) {
        download(ip, i + 'downloadedImage.png', function() {
            console.log("file " + i + " has been downloaded");
        });
    }, this);
}


module.exports = requestCameras;