const _ = require('lodash');
const moment = require('moment');
const masterControllers = require('./masterControllers');
const compileImages = require('./compileImages');
const compileImagesGif = require('./compileImagesGif');

const imDir = 'images/';

const ips = [
    'http://192.168.0.33', 
    'http://192.168.0.34', 
]

const port = ':3000'

function requestImageAndCompile(){
    masterControllers.requestPings(ips).then((imageRequests) => { // requesting pings
        const maxPing = _.maxBy(imageRequests, o => o.ping) //finding the largest ping
        let requestPromises = []
        imageRequests.forEach(imageRequest => { 
            let delay = maxPing.ping - imageRequest.ping;
            requestPromises.push(new Promise((resolve, reject) => { //Appending imageRequest into an array of promises
                setTimeout(() => {
                    masterControllers.download(imageRequest.ip + port, moment()
                    .format('D-M-YY-h-mm-ss-SSS') + '.png', imDir) // downloading, and resolving if positive //not actually a png file. but it will be converted later.
                    .catch(reject)
                    .then((filename) => {
                        resolve(filename)
                    })
                }, delay)
            }))
        })
        Promise.all(requestPromises).then((fileNames)=>{
            compileImagesGif(fileNames, moment().format('D-M-YY-h-mm-ss') + '.gif')
        }).catch((err)=>{
            console.log(err)
        })
    })
}

requestImageAndCompile();

module.exports = requestImageAndCompile