const http = require('http');
const htmlRes = require('./htmlResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
    switch (req.url) {
    case '/':
        htmlRes.getIndex(req, res);
        break;
    case '/style.css':
        htmlRes.getCSS(req, res);
        break;
    default:
        htmlRes.getIndex(req, res);
        break;
    }
};

http.createServer(onRequest).listen(port);