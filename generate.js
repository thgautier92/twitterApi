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
const lstApi = require("./refApi.js");
const waitProcess = 60;
const waitCount = 1000;

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
clear();
//console.log('\033[2J');
console.log('');
console.log('================================================================================');
console.log('Génération des commandes pour les appels TWITTER, à partir du fichier', colors.red(fileInput));
console.log('  OS : ', osType);
console.log("  Pause de", waitProcess + " secondes tous les " + waitCount + " lignes.");
console.log('================================================================================');
console.log('API disponibles :');
var i = 0;
var max = lstApi.refApi.length;
lstApi.refApi.forEach(function (elt) {
    console.log("  " + i + ":  " + elt['title']);
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
        name: 'numStart',
        message: colors.blue('Numero de la première ligne (1 par defaut, 0 pour abandonner) ?'),
        type: 'string',
        validator: /[0-9]/i,
        warning: 'Choisir un nombre à partir de 1.'
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
        fs.unlink(lstApi.refApi[result.numApi]['fileErr'], function (err) {
            if (err) {
                console.log('Fichier inexistant');
            } else {
                console.log('Fichier supprimé');
            }
        });
        generate(result.numApi, result.numStart, osType);
    }
    if (result.razFicOut == 'n' || result.razFicOut == 'N') {
        generate(result.numApi, result.numStart, osType);
    }
});


var generate = function (numApi, numStart, osType) {
    console.log(numApi, numStart, osType);
    var start = numStart + 0;
    var dataOut = "";
    if (osType == "darwin") {
        dataOut = dataOut + "clear\n";
    } else {
        dataOut = dataOut + "@echo off\ncls\n";
    }
    dataOut = dataOut + "echo ============================================================\n";
    dataOut = dataOut + "echo " + lstApi.refApi[numApi]['title'] + "\n";
    dataOut = dataOut + "echo Pause de " + waitProcess + " secondes toutes les " + waitCount + " lignes\n";
    dataOut = dataOut + "echo Analyse à partir de la ligne n°" + numStart + "\n";
    dataOut = dataOut + "echo ============================================================\n";
    var i = 1;
    var total = 1;
    var lig = 1;
    fs.readFileSync(fileInput).toString().split(/\r?\n/).forEach(function (line) {
        if (lig >= numStart) {
            console.log(lig, line);
            line = line.replace("'", " ");
            if (i >= waitCount) {
                dataOut = dataOut + "echo -- Lignes traitées : " + total + ". Attente de " + waitProcess + " secondes...\n";
                dataOut = dataOut + "sleep " + waitProcess + "\n";
                i = 1;
            }
            dataOut = dataOut + "node " + lstApi.refApi[numApi]['exec'] + ".js " + numApi + " " + lig + " " + line + "\n";
            i = i + 1;
            total = total + 1;
        } else {
            console.log(lig, "non traitée.");
        }
        lig = lig + 1;
    })
    dataOut = dataOut + "echo ... " + total + " lignes traitées sur " + lig + ".\n";
    dataOut = dataOut + "echo ... Le résultat est disponible dans le fichier " + lstApi.refApi[numApi]['fileOut'];
    fs.writeFile(fileOutput, dataOut, {
        'encode': 'utf8',
        'flag': 'w'
    }, function (err) {
        if (err) {
            console.log("Erreur de creation du fichier de commande", err);
        } else {
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
        };
    });

}