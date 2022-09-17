const fs = require('fs')

module.exports = function(fileName, res) {
    const readStream = fs.createReadStream(fileName);

    readStream.on('open', function () {
        readStream.pipe(res);
    });

    readStream.on('error', function(err) {
        res.end(err);
    });
}
 