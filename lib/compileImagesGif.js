const GifCreationService = require('gif-creation-service');
var jimp = require("jimp");
const _ = require('lodash');

function compileImages(images, fileName){
    images = makeImagesFlip(images)
    promises = []
    images.forEach((image, i) => {
        promises.push(new Promise(function(resolve, reject){
            jimp.read(image).then(function (loadedImage) {
                loadedImage.rgba( false )             // set whether PNGs are saved as RGBA (true, default) or RGB (false) 
                loadedImage.filterType( 0 );     // set the filter type for the saved PNG 
                loadedImage.deflateLevel( 0 )
                // jimp.deflateStrategy( 0 )
                loadedImage.write(image + i + '.png', (err, res)=>{
                    console.log('written file')
                    return resolve(res);
                })
                // set the deflate level for the saved PNG 
            }).catch(reject);
        }))
    });
    
    Promise.all(promises).then(()=>{
        images = _.map(images, (image, i) => image + i + '.png')
        GifCreationService.createAnimatedGifFromPngImages(images, fileName, {repeat: false, fps: 10, quality: 10})
        .then(outputGifFile => {
            console.log(`GIF ${outputGifFile} created.`);
        });
        
    }).catch(console.log)
}


function makeImagesFlip(images){
    reversedOrderImages = images.slice(0).reverse().slice(1);
    images = images.concat(reversedOrderImages).slice(1)
    console.log({images})
    return images;
}

module.exports = compileImages