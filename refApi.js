/*
variable {{datain}} will be replace during API call
by the value passed by command
*/
exports.refApi = [{
    "name": "searchUser",
    "description": "Recherche de comptes Twitter",
    "title": "Analyse des comptes TWITTER",
    "url": "https://api.twitter.com/1.1/users/search.json?q={{datain}}&page=5&count=20",
    "format": "searchUser",
    "fileOut": "result.csv"
}, {
    "name": "searchUserDetail",
    "description": "Recherche de comptes Twitter",
    "title": "Analyse des comptes TWITTER - Détail",
    "url": "https://api.twitter.com/1.1/users/search.json?q={{datain}}&page=5&count=20",
    "format": "",
    "fileOut": "result.json"
}];