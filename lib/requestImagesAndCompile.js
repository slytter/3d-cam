const _ = require('lodash');
const moment = require('moment');
const masterControllers = require('./masterControllers');
const compileImages = require('./compileImages');

const imDir = 'images/';

const ips = [
    'https://i1.sndcdn.com/artworks-000285660779-t6vhdt-t500x500.jpg', 
    'https://i1.sndcdn.com/artworks-000285144533-vhebsv-t500x500.jpg', 
    'https://i1.sndcdn.com/artworks-000304892541-n8lkv9-t500x500.jpg',
    'https://i1.sndcdn.com/artworks-000306311700-icrb48-t500x500.jpg',
]

function requestImageAndCompile(){
    masterControllers.requestPings(ips).then((imageRequests) => { // requesting pings
        const maxPing = _.maxBy(imageRequests, o => o.ping) //finding the largest ping
        let requestPromises = []
        imageRequests.forEach(imageRequest => { 
            let delay = maxPing.ping - imageRequest.ping;
            requestPromises.push(new Promise((resolve, reject) => { //Appending imageRequest into an array of promises
                setTimeout(() => {
                    masterControllers.download(imageRequest.ip, moment().format('D-M-YY-h-mm-ss-SSS') + '.jpg', imDir) // downloading, and resolving if positive
                    .catch(reject)
                    .then((filename) => {
                        resolve(filename)
                    })
                }, delay)
            }))
        })
        Promise.all(requestPromises).then((fileNames)=>{
            compileImages(fileNames, moment().format('D-M-YY-h-mm-ss') + '.mp4')
        }).catch((err)=>{
            console.log(err)
        })
    })
}

requestImageAndCompile();

module.exports = requestImageAndCompile