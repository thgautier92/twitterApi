/*
variable {{datain}} will be replace during API call
by the value passed by command
*/
exports.refApi = [{
        "name": "searchUser",
        "description": "Recherche de comptes Twitter",
        "title": "Analyse des comptes TWITTER",
        "url": "https://api.twitter.com/1.1/users/search.json?q={{datain}}&page=5&count=20",
        "exec": "callTwitter",
        "format": "searchUser",
        "fileOut": "result.csv"
    }, {
        "name": "searchUserDetail",
        "description": "Recherche de comptes Twitter",
        "title": "Analyse des comptes TWITTER - Détail",
        "url": "https://api.twitter.com/1.1/users/search.json?q={{datain}}&page=5&count=20",
        "exec": "callTwitter",
        "format": "",
        "fileOut": "result.json"
    }, {
        "name": "searchGoole",
        "description": "Recherche à partir du moteur Google SEARCH",
        "title": "Recherche GOOGLE SEARCH",
        "url": "https://www.googleapis.com/customsearch/v1?q={{datain}} ",
        "exec": "callGoogleSearch",
        "format": "",
        "fileOut": "result_google.csv"
    }, {
        "name": "searchQuantSocial",
        "description": "Recherche RESEAUX SOCIAUX à partir du moteur Qwant",
        "title": "Recherche Qwant Réseaux Sociaux",
        "url": "https://api.qwant.com/api/search/social?q={{datain}}",
        "exec": "callQwant",
        "format": "searchSocial",
        "fileOut": "result_qwant_social.csv"
    },
    {
        "name": "searchQuantAll",
        "description": "Recherche à partir du moteur Qwant",
        "title": "Recherche Qwant globale",
        "url": "https://api.qwant.com/api/search/all?q={{datain}}",
        "exec": "callQwant",
        "format": "searchFormat",
        "fileOut": "result_qwant.csv"
    }
];