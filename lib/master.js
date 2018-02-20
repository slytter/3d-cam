const fs = require('fs');
const request = require('request');
const ips = ['http://localhost:3000/']

const download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

async function requestCameras(){
    await console.log(promisePing());
}




var promisePing = new Promise(function(resolve, reject){
    setTimeout(()=> {
        console.log('ping after 1 sec')
        return resolve() || reject()
    }, 1000)
})

module.exports = requestCameras;