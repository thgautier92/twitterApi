/* ======================================================================
callTwitter.js
script to call an Twitter API and store the result in a output CSV file
=========================================================================
*/
const util = require('util');
const fs = require('fs');
const https = require("https");
const request = require('request');
const eol = require('eol');
const Q = require('q');
const colors = require("colors/safe");
var lstApi = require("./refApi.js");
const sep = ";";
const newLine = "\n";

// ===== Function callApi ==========================================
var callApi = function (dataIn, apiId) {
    //console.log("Recherche =>", dataIn, apiId, format);
    deferred = Q.defer();
    // Get your credentials here: https://dev.twitter.com/apps
    // -----------------------------------------------------------------------
    var fileResult = lstApi.refApi[apiId]['fileOut'];
    var url = lstApi.refApi[apiId]['url'].replace("{{datain}}", dataIn);
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
            //console.log(data.data.result.items);
            //console.log("RESULTATS", util.inspect(data));
            var jdata = data.data.result.items;
            console.log("Occurences trouvées pour ", colors.blue(dataIn), ":", colors.green(jdata.length));
            var dataOut = "";
            if (jdata.length > 0) {
                jdata.forEach(function (elt) {
                    switch (lstApi.refApi[apiId]['format']) {
                        case "searchFormat":
                            dataOut = dataOut + elt['position'] + sep +
                                elt['title'] + sep +
                                elt['url'] + sep +
                                elt['desc'] + sep +
                                elt['_type'] + sep +
                                elt['_score'] +
                                newLine;
                            break;
                        case "searchSocial":
                            dataOut = dataOut + dataIn + sep +
                                elt['title'] + sep +
                                elt['type'] + sep +
                                elt['url'] + sep +
                                elt['userUrl'] + sep +
                                elt['card'] +
                                newLine;
                            break;
                        default:
                            dataOut = data + newLine;;
                    }
                });
            } else {
                dataOut = dataOut + dataIn + sep + "0" + newLine;
            }
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
//var line = encodeURIComponent(arg.join(' '));
var line = arg.join(' ');
callApi(line, process.argv[2]).then(function (info) {
    //console.log(info);
});
// ===== END =======================================================