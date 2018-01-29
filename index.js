const argv = require('yargs').argv;
const fs = require('fs');
var imageSearch = require('node-google-image-search');
const download = require('image-downloader')

let searchText = argv.keyword;
let quantity = parseInt(argv.quantity);
let path = `./images/${searchText}`;

if (!searchText || !quantity) {
    console.log('Enter All Parameters')
} else {
    var results = imageSearch(searchText,
        (results) => {
            fs.mkdir(path, (err) => {
                if (err) {
                    console.log('issue while creating directory')
                } else {
                    console.log('directory created')
                }
            })
            results.forEach((element) => {
                let options = {
                    url: element.link,
                    dest: path
                }
                download.image(options)
                    .then(({ filename, image }) => {
                        console.log('File saved to', path)
                    }).catch((err) => {
                        console.log(err)
                    })
            });
        }
    , 1, quantity);
}


