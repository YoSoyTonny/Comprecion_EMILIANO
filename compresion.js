const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

http.createServer(
    (request, response) => {
        const raw = fs.createReadStream(__dirname + "/index.html");
        const acceptEcoding = request.headers["accept-encoding"] || '';

        response.setHeader('Content-Type', 'text/html');
        console.log(acceptEcoding);

        if (acceptEcoding.includes('gzip')) {
            console.log("Comprimiendo con gzip");
            response.setHeader("Content-Encoding", "gzip");
            raw.pipe(zlib.createGzip()).pipe(response);
        }else {
            console.log("Response sin comprimir");
            raw.pipe(response);
        }
    }
).listen(process.env.PORT || 1338);