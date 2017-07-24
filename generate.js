/* ======================================================================
generate.js
Reading use case and générate a call to callTwitter.js with nodejs
=========================================================================
*/
const fs = require('fs');
const clear = require('clear');
const prompt = require('prompt');
const colors = require("colors/safe");
const exec = require('child_process').exec;
var lstApi = require("./refApi.js");

var osType = process.platform;
var fileInput = "liste.csv";
var fileOutput = "startUp";
var command = "";
if (osType == 'darwin') {
    fileOutput = fileOutput + ".sh";
    command = "sh " + fileOutput;
} else {
    fileOutput = fileOutput + ".cmd";
    var command = "start " + fileOutput;
}
var fileResult = "result.csv";
clear();
//console.log('\033[2J');

console.log('================================================================================');
console.log('Génération des commandes pour les appels TWITTER, à partir du fichier', colors.red(fileInput));
console.log('OS : ', osType);
console.log('================================================================================');
console.log('Liste des API disponibles');
var i = 0;
var max = lstApi.refApi.length;
lstApi.refApi.forEach(function (elt) {
    console.log("  " + i + ":" + elt['title']);
    i++;
});
console.log('');
var schema = [{
        name: 'numApi',
        message: colors.blue("Choisir un numéro de d'API entre 0 et " + (max - 1)),
        type: 'string',
        validator: /[0-9]/i,
        warning: "Choisir un numéro parmi la liste, entre 0 et " + (max - 1)
    },
    {
        name: 'razFicOut',
        message: colors.blue('Remise à zero du fichier de résultats (O)ui, (N)on, (A)bandonner ?'),
        type: 'string',
        validator: /[aon]/i,
        warning: 'Répondez par O, N ou A'
    }
];
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
    if (result.numApi < 0 || result.numApi >= max) {
        console.log('API non prévue.Abandon!');
        process.exit(1);
    }
    if (result.razFicOut == 'O' || result.razFicOut == 'o') {
        console.log("Supression du fichier ", lstApi.refApi[result.numApi]['fileOut']);
        fs.unlink(lstApi.refApi[result.numApi]['fileOut'], function (err) {
            if (err) {
                console.log('Fichier inexistant');
            } else {
                console.log('Fichier supprimé');
            }
        });
        generate(result.numApi, osType);
    }
    if (result.razFicOut == 'n' || result.razFicOut == 'n') {
        generate(result.numApi, osType);
    }
});


var generate = function (numApi, osType) {
    var dataOut = "";
    if (osType == "darwin") {
        dataOut = dataOut + "clear\n";
    } else {
        dataOut = dataOut + "@echo off\ncls\n";
    }
    dataOut = dataOut + "echo " + lstApi.refApi[numApi]['title'] + "\n";
    dataOut = dataOut + "echo ==================================================\n";
    fs.readFileSync(fileInput).toString().split(/\r?\n/).forEach(function (line) {
        console.log(line);
        dataOut = dataOut + "node " + lstApi.refApi[numApi]['exec'] + ".js " + numApi + " " + line + "\n";
    })
    dataOut = dataOut + "echo ... Le résultat est disponible dans le fichier " + lstApi.refApi[numApi]['fileOut']
    fs.writeFile(fileOutput, dataOut, {
        'encode': 'utf8',
        'flag': 'w'
    }, function (err) {
        if (err) throw err;
    });
    console.log('================================================================================');
    console.log('Le script est généré dans le fichier', fileOutput);
    console.log('================================================================================');
    if (osType == "darwin") {
        console.log("Lancement...(sh)");
        require('child_process').spawn('sh', [fileOutput], {
            stdio: 'inherit'
        });
    } else {
        console.log("Lancement...(cmd)", fileOutput);
        require('child_process').execSync(fileOutput);
    }
}