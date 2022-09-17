const http = require('http');
const fs = require('fs');
const url = require('url');

const { streamInfo, details } = require('./Modules');

http.createServer(async function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const fileName = `${__dirname}/${reqUrl.query.fileName}`;

    switch (reqUrl.pathname) {
        case '/file':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            streamInfo(fileName, res)
            break;
        case '/file-details':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            await details(reqUrl, fileName, res);
            break;
        default:
            const file = __dirname + '/client/index.html';                                    
            res.writeHead(200, { "Content-Type": "text/html" });      
        
            fs.createReadStream(file).pipe(res);
    }
}).listen(8080);
