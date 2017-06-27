var OAuth2 = require('OAuth').OAuth2;
var OAuth1 = require('OAuth').OAuth;
var https = require("https");
var accessToken = null;
// Get your credentials here: https://dev.twitter.com/apps
var _twitterConsumerKey = "cjNYea1Mx6WJScAvq27pZfskF";
var _twitterConsumerSecret = "XYgJLiTHR4vGB9zhMiZPgJXlOUdk2ZZsOthb55tC01fU5ezV7Z";
var _accessToken = "145807600-mtYhECTolWHCTNX3sLV2dzwnyhD5oqiq7A1Lhf5v";
var _accessTokenSecret = "3iiEZkohtONPeNjklIOfjUt4CtZnvCWzCQMFGDTkkAFIK";
// -----------------------------------------------------------------------
var restApi1 = function (data) {
    var url = "https://api.twitter.com/1.1/users/search.json?q=" + data + "&page=1&count=3";
    oauth.get(
        url,
        _accessToken, //test user token 
        _accessTokenSecret, //test user secret             
        function (e, data, res) {
            if (e) console.error(e);
            console.log(require('util').inspect(data));
        });
}
var typeOauth = 1;
if (typeOauth == 2) {
    var oauth2 = new OAuth2(_twitterConsumerKey, _twitterConsumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);
    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function (e, access_token) {
        console.log(access_token); //string that we can use to authenticate request
        restApi2(access_token, "gautier,PARIS");
    });
} else {
    var oauth = new OAuth1(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        _twitterConsumerKey,
        _twitterConsumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    restApi1("gautier,PARIS");
}
// ====== END ======

var restApi2 = function (access_token, data) {
    var options = {
        hostname: 'api.twitter.com',
        path: '/1.1/users/search.json?q=' + data + '&page=1&count=3',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    };
    https.get(options, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (data) {
            console.log(data); //the response!
        });
    });
}