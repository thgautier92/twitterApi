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
var keyAPi = require("./API_Twitter.js");
const sep = "#";

// ===== Function callApi ==========================================
var callApi = function (num, dataIn, apiId) {
    //console.log("Recherche =>", dataIn, apiId, format);
    deferred = Q.defer();
    // Get your credentials here: https://dev.twitter.com/apps
    // -----------------------------------------------------------------------
    var fileResult = lstApi.refApi[apiId]['fileOut'];
    var fileError = lstApi.refApi[apiId]['fileErr'];
    var oauth = new OAuth1(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        keyAPi._twitterConsumerKey,
        keyAPi._twitterConsumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    var url = lstApi.refApi[apiId]['url'].replace("{{datain}}", dataIn);
    oauth.get(
        url,
        keyAPi._accessToken, //test user token 
        keyAPi._accessTokenSecret, //test user secret             
        function (e, data, res) {
            if (e) {
                //
                let errJson = JSON.parse(e.data);
                let errTxt = e.statusCode + "," + errJson['errors'][0]['code'] + "-" + errJson['errors'][0]['message'];
                let errFic = num + sep + dataIn + sep + errTxt + "\n";
                fs.writeFile(fileError, errFic, {
                    'encode': 'utf8',
                    'flag': 'a'
                }, function (err) {
                    if (err) throw err;
                });
                console.log("Occurences trouvées pour ", num, colors.red(dataIn), ":", colors.red(0), "error:" + colors.red(errTxt));
                deferred.reject(0);
            } else {
                //console.log("RESULTATS", util.inspect(data));
                var jdata = JSON.parse(data);
                console.log("Occurences trouvées pour ", num, colors.blue(dataIn), ":", colors.green(jdata.length));
                var dataOut = "";
                jdata.forEach(function (elt) {
                    switch (lstApi.refApi[apiId]['format']) {
                        case "searchUser":
                            dataOut = dataOut + num + sep + elt['id_str'] + sep +
                                elt['name'] + sep +
                                elt['screen_name'] + sep +
                                elt['location'] + sep +
                                //util.inspect(elt['description']) + sep +
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
// get all parameters in command line, except script path and name
var arg = process.argv.splice(4, process.argv.length);
//var line = encodeURIComponent(arg.join(' '));
var line = arg.join(' ');
callApi(process.argv[3], line, process.argv[2]).then(function (info) {
    //console.log(info);
}, function (error) {

});
// ===== END =======================================================