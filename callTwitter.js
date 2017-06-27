/* ======================================================================
callTwitter.js
script to call an Twitter API and store the result in a output CSV file
=========================================================================
*/
const util = require('util');
const fs = require('fs');
const OAuth1 = require('OAuth').OAuth;
const https = require("https");
const Q = require('q');
const colors = require("colors/safe");
var lstApi = require("./refApi.js");
const sep = ";";

// ===== Function callApi ==========================================
var callApi = function (dataIn, apiId) {
    //console.log("Recherche =>", dataIn, apiId, format);
    deferred = Q.defer();
    // Get your credentials here: https://dev.twitter.com/apps
    var _twitterConsumerKey = "cjNYea1Mx6WJScAvq27pZfskF";
    var _twitterConsumerSecret = "XYgJLiTHR4vGB9zhMiZPgJXlOUdk2ZZsOthb55tC01fU5ezV7Z";
    var _accessToken = "145807600-mtYhECTolWHCTNX3sLV2dzwnyhD5oqiq7A1Lhf5v";
    var _accessTokenSecret = "3iiEZkohtONPeNjklIOfjUt4CtZnvCWzCQMFGDTkkAFIK";
    // -----------------------------------------------------------------------
    var fileResult = lstApi.refApi[apiId]['fileOut'];
    var oauth = new OAuth1(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        _twitterConsumerKey,
        _twitterConsumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    var url = lstApi.refApi[apiId]['url'].replace("{{datain}}", dataIn);
    oauth.get(
        url,
        _accessToken, //test user token 
        _accessTokenSecret, //test user secret             
        function (e, data, res) {
            if (e) {
                //console.error(e);
                console.log("Occurences trouvées pour ", dataIn, ":", colors.red(0));
                deferred.resolve(0);
            } else {
                //console.log("RESULTATS", util.inspect(data));
                var jdata = JSON.parse(data);
                console.log("Occurences trouvées pour ", colors.blue(dataIn), ":", colors.green(jdata.length));
                var dataOut = "";
                jdata.forEach(function (elt) {
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