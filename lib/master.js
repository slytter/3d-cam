const fs = require('fs');
const request = require('request');
const ips = ['http://localhost:3000/']

const download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function requestCameras(){
    promisePing(ips).then((res)=>{
        console.log("i got: "+ res)
    })
}

var promisePing = function(ips){
    return new Promise(function(resolve, reject){
        setTimeout(()=> {
            console.log('ping after 1 sec')
            return resolve([1, 2, 3, 4]) || reject()
        }, 1000)
    })
}

module.exports = requestCameras;