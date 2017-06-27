/*
variable {{dataIn}} will be replace during API call
by the value passed by command
*/
exports.refApi = [
    "https://api.twitter.com/1.1/users/search.json?q={{datain}}&page=5&count=20"
];