const { parse } = require('querystring');
const { getIndex, getCSS } = require('./htmlResponse.js');
const { getUsers, addUser, sendError } = require('./jsonResponse.js');

const onRequest = (req, res) => {
  const { method, url } = req;
  let body = [];
  req.on('data', chunk => body.push(chunk)).on('end', () => {
    // Route selection for get/head requests
    if (method === 'GET' || method === 'HEAD') {
      switch (url) {
        case '/':
          getIndex(req, res);
          break;
        case '/style.css':
          getCSS(req, res);
          break;
        case '/getUsers':
          getUsers(req, res);
          break;
        default:
          sendError(req, res, 404, 'notFound', 'The page/resource you are looking for cannot be found');
          break;
      }
    } else if (method === 'POST') {
      // Parse body of request
      body = parse(Buffer.concat(body).toString());
      switch (url) {
        case '/addUser':
          if (body.age === '' || body.name === '') {
            sendError(req, res, 400, 'missingParams', 'Name and age are both required.');
            return;
          }
          addUser(req, res, body);
          break;
        default:
          sendError(req, res, 404, 'notFound', 'POST API endpoint not found');
          break;
      }
    }
  });
};

module.exports.onRequest = onRequest;
