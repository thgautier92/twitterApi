const fs = require('fs');
var fileInput = "liste.csv";
var fileOutput = "start.sh";
console.log('================================================================================');
console.log('Génération des commandes pour les appels TWITTER, à partir du fichier', fileInput);
console.log('================================================================================');
var dataOut = "clear\necho Analyse des comptes TWITTER\n";
dataOut = dataOut + "echo ==================================================\n";
fs.readFileSync(fileInput).toString().split(/\r?\n/).forEach(function (line) {
    console.log(line);
    dataOut = dataOut + "node callTwitter.js " + line + "\n";
})
fs.writeFile(fileOutput, dataOut, {
    'encode': 'utf8',
    'flag': 'w'
}, function (err) {
    if (err) throw err;
});
console.log('================================================================================');
console.log('Le script est généré dans le fichier', fileOutput);
console.log('================================================================================');