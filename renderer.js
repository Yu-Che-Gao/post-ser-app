const electron = require('electron');
const queryString = require('querystring');
const https = require('https');
const remoteWindow = electron.remote;
const currentWindow = remoteWindow.getCurrentWindow();

document.getElementById('sendBtn').addEventListener('click', function () {
    console.log('sendBtn now start');
    let data = queryString.stringify({
        keyword: document.getElementById('inputData').innerHTML,
        sort: "time_desc",
        token: "api_doc_token"
    });

    let options = {
        hostname: 'api.ser.ideas.iii.org.tw',
        port: 443,
        path: '/api/keyword_search/facebook',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    let req = https.request(options, function (res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
            console.log('Body: ' + body);
            document.getElementById('result').innerHTML = body;
        });

    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(data);
    req.end();

});

document.getElementById('maximized').addEventListener('click', function () {
    switch (currentWindow.isMaximized()) {
        case true:
            currentWindow.unmaximize();
            break;
        case false:
            currentWindow.maximize();
            break;
    }
});

document.getElementById('minimized').addEventListener('click', function () {
    currentWindow.minimize();
});

document.getElementById('closed').addEventListener('click', function () {
    currentWindow.close();
});