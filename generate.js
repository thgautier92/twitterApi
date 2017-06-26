const fs = require('fs');
var fileInput = "liste.csv";
var fileOutput = "start.bat";
var dataOut = "@echo off\ncls\n@echo Analyse des comptes TWITTER\n"
fs.readFileSync(fileInput).toString().split(/\r?\n/).forEach(function (line) {
    console.log(line);
    dataOut = dataOut + "node simple.js " + line + "\n";
})
fs.writeFile(fileOutput, dataOut, {
    'encode': 'utf8',
    'flag': 'w'
}, function (err) {
    if (err) throw err;
});