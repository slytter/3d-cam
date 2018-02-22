const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const compileImages = require('./compileImages');
const sanitize = require('sanitize-filename');
const ping = require('ping');
const domainFromPartialUrl = require('domain-from-partial-url');

const download = function(uri, timeStamp, imDir) {
	return new Promise((resolve, reject) => {
		const filename = imDir + sanitize(uri) + timeStamp
		request.head(uri, function(err, res, body) {
			if(err) reject(err)
			request(uri).pipe(fs.createWriteStream(filename)).on('close', () => resolve(filename))
		})
	})
}

const requestPings = function(hosts){
	return new Promise(function(resolve, reject){
		let pingPromises = [];
		hosts.forEach(function (host) {
			pingPromises.push( new Promise(function(resolve, reject){
				ping.promise.probe(domainFromPartialUrl(host)).then((res) =>{
					res.host = host;
					resolve(res);
				}).catch(reject)
			}))
		});
		
		Promise.all(pingPromises).then(function (results) {
			const ipsAndPings = _.map(results, sortPing)
			console.log(ipsAndPings)
			return resolve(ipsAndPings)
		}).catch(reject)
	})
}

function sortPing(host){
	return { ip: host.host, ping: Math.round(host.avg) }
}

module.exports = {download, requestPings};