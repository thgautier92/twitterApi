/* ======================================================================
callTwitter.js
script to call an Twitter API and store the result in a output CSV file
=========================================================================
*/
const util = require('util');
const fs = require('fs');
const https = require("https");
const request = require('request');
const Q = require('q');
const colors = require("colors/safe");

var lstApi = require("./refApi.js");
var keyAPi = require("./googleSearchAPI.js");
const sep = ";";

// ===== Function callApi ==========================================
var callApi = function (dataIn, apiId) {
    //console.log("Recherche =>", dataIn, apiId, format);
    deferred = Q.defer();
    // Get your credentials here: https://dev.twitter.com/apps
    // -----------------------------------------------------------------------
    var fileResult = lstApi.refApi[apiId]['fileOut'];
    var url = lstApi.refApi[apiId]['url'].replace("{{datain}}", dataIn);
    url = url + "&key=" + keyAPi._apiKey + "&cx=" + keyAPi._customSearch;
    request.get({
        url: url,
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
            fs.writeFile(fileResult, util.inspect(data), {
                'encode': 'utf8',
                'flag': 'a'
            }, function (err) {
                if (err) throw err;
            });
            deferred.resolve(0);
        } else {
            // data is already parsed as JSON:
            console.log(data.html_url);
            //console.log("RESULTATS", util.inspect(data));
            var jdata = JSON.parse(data);
            var jstat = jdata['searchInformation'];
            var jItems = jdata['items'];
            console.log("Occurences trouvées pour ", colors.blue(dataIn), ":", colors.green(jstat['totalResults']), "en ", colors.green(jstat['formattedSearchTime']), "s");
            var dataOut = "";
            jItems.forEach(function (elt) {
                switch (lstApi.refApi[apiId]['format']) {
                    case "searchUser":
                        dataOut = dataOut + elt['id_str'] + sep +
                            elt['name'] + sep +
                            elt['screen_name'] + sep +
                            elt['location'] + sep +
                            util.inspect(elt['description']) + sep +
                            elt['protected'] + sep +
                            elt['followers_count'] + sep +
                            elt['friends_count'] + sep +
                            elt['favourites_count'] + sep +
                            elt['statuses_count'] + sep +
                            elt['created_at'] + "\n";
                        break;
                    default:
                        dataOut = data;
                }
            });
            fs.writeFile(fileResult, dataOut, {
                'encode': 'utf8',
                'flag': 'a'
            }, function (err) {
                if (err) throw err;
            });
            deferred.resolve(jdata.length);
        }
    });
    return deferred.promise;
}

// ===== Start searching ===========================================
// get all parametres in command line, except script path and name
var arg = process.argv.splice(3, process.argv.length);
var line = encodeURIComponent(arg.join(' '));
callApi(line, process.argv[2]).then(function (info) {
    //console.log(info);
});
// ===== END =======================================================