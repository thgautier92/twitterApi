const util = require('util');
const fs = require('fs');
const OAuth1 = require('OAuth').OAuth;
const https = require("https");
const Q = require('q');
const sep = ";";

var callApi = function (dataIn) {
    //console.log("Recherche =>", dataIn);
    deferred = Q.defer();
    // Get your credentials here: https://dev.twitter.com/apps
    var _twitterConsumerKey = "cjNYea1Mx6WJScAvq27pZfskF";
    var _twitterConsumerSecret = "XYgJLiTHR4vGB9zhMiZPgJXlOUdk2ZZsOthb55tC01fU5ezV7Z";
    var _accessToken = "145807600-mtYhECTolWHCTNX3sLV2dzwnyhD5oqiq7A1Lhf5v";
    var _accessTokenSecret = "3iiEZkohtONPeNjklIOfjUt4CtZnvCWzCQMFGDTkkAFIK";
    // -----------------------------------------------------------------------
    var oauth = new OAuth1(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        _twitterConsumerKey,
        _twitterConsumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    var url = "https://api.twitter.com/1.1/users/search.json?q=" + dataIn + "&page=5&count=20";
    oauth.get(
        url,
        _accessToken, //test user token 
        _accessTokenSecret, //test user secret             
        function (e, data, res) {
            if (e) {
                //console.error(e);
                console.log("Occurences trouvées pour ", dataIn, ":", 0);
                deferred.resolve(0);
            } else {
                //console.log("RESULTATS", util.inspect(data));
                var jdata = JSON.parse(data);
                console.log("Occurences trouvées pour ", dataIn, ":", jdata.length);
                var dataOut = "";
                jdata.forEach(function (elt) {
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
                });
                fs.writeFile('result.csv', dataOut, {
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
var arg = process.argv.splice(2, process.argv.length);
var line = encodeURIComponent(arg.join(' '));
callApi(line).then(function (info) {
    //console.log(info);
});