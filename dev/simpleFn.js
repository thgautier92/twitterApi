const simple = require('./simple.js');
const fs = require('fs');
const readline = require('readline');
var fileInput = "liste.csv";
var lineReader = readline.createInterface({
    input: fs.createReadStream(fileInput, 'utf8'),
    output: process.stdout,
    terminal: false
});
fs.readFileSync(fileInput).toString().split(/\r?\n/).forEach(function (line) {
    console.log(line);
    /*simple.callApi(line).then(function (info) {
        console.log(info);
    });*/
})

/*simple.callApi("gautier,PARIS").then(function (info) {
    console.log(info);
});*/