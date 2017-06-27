/* ================================================================================
* Outil de vérification de l'existence d'un compte TWITER
* Fichier des noms à rechercher : LISTES.CSV
* Fichier de sortie             : RESULT.JSON
*
* Auteur : GAUTIER
================================================================================  */
const fs = require('fs');
const readline = require('readline');
const request = require("request");
const Q = require('q');
const OAuth1 = require('OAuth').OAuth;
const https = require("https");
// ----------------------------------------------------------------------- 
// Get your credentials here: https://dev.twitter.com/apps
var _twitterConsumerKey = "cjNYea1Mx6WJScAvq27pZfskF";
var _twitterConsumerSecret = "XYgJLiTHR4vGB9zhMiZPgJXlOUdk2ZZsOthb55tC01fU5ezV7Z";
var _accessToken = "145807600-mtYhECTolWHCTNX3sLV2dzwnyhD5oqiq7A1Lhf5v";
var _accessTokenSecret = "3iiEZkohtONPeNjklIOfjUt4CtZnvCWzCQMFGDTkkAFIK";
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
var fileInput = "liste.csv";
var lineReader = readline.createInterface({
  input: fs.createReadStream(fileInput, 'utf8')
});
console.log("===== Démmarage du traitement =====");
var dataOut = [];
lineReader.on('line', function (line) {
  runApi(line).then(result => {
    console.log(result);
    dataOut.push({
      "search": line,
      "result": result
    });
    writeResult(dataOut);
  }).fail(err => {
    console.log(err);
    dataOut.push({
      "search": line,
      "result": err
    });
    writeResult(dataOut);
  })

});
lineReader.on('close', function () {
  console.log("===== Fin du traitement =====");
})
// end

// Run Twitter API Function
var runApi = function (row) {
  deferred = Q.defer();
  console.log("Recherche =>", row);
  var oauth = new OAuth1(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    _twitterConsumerKey,
    _twitterConsumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  var url = "https://api.twitter.com/1.1/users/search.json?q=" + row + "&page=1&count=3";
  oauth.get(
    url,
    _accessToken, //test user token 
    _accessTokenSecret, //test user secret             
    function (error, data, body) {
      //console.log(require('util').inspect(data));
      //if (error) console.error(error);
      deferred.resolve(require('util').inspect(data));
    }
    //if (e) console.error(e);
    //console.log(require('util').inspect(data));
  );
  return deferred.promise;
};
var writeResult = function (data) {
  fs.writeFile('result.json', JSON.stringify(data, null, 2), 'utf8', function (err) {
    if (err) throw err;
  });
}