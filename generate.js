const fs = require('fs');
const prompt = require('prompt');
const colors = require("colors/safe");
const exec = require('child_process').exec;
var fileInput = "liste.csv";
var fileOutput = "start.sh";
var fileResult = "result.csv";
var command = "sh " + fileOutput;
console.log('\033[2J');
console.log('================================================================================');
console.log('Génération des commandes pour les appels TWITTER, à partir du fichier', colors.red(fileInput));
console.log('  ');
console.log('================================================================================');
var schema = [{
    name: 'razFicOut',
    message: colors.blue('Remise à zero du fichier de résultats (O)ui, (N)on, (A)bandonner ?'),
    type: 'string',
    validator: /[aon]/i,
    warning: 'Répondez par O, N ou A'
}];
prompt.message = colors.rainbow("?? ");
prompt.start();
prompt.get(schema, function (err, result) {
    if (err) {
        console.log('Abandon!');
        process.exit(1);
    }
    if (result.razFicOut == 'A' || result.razFicOut == 'a') {
        console.log('Abandon!');
        process.exit(1);
    }
    if (result.razFicOut == 'O' || result.razFicOut == 'o') {
        console.log("Supression du fichier ", fileResult);
        fs.unlink(fileResult);
        generate();
    }
    if (result.razFicOut == 'n' || result.razFicOut == 'n') {
        generate();
    }
});


var generate = function () {
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
    require('child_process').spawn('sh', [fileOutput], {
        stdio: 'inherit'
    });
}