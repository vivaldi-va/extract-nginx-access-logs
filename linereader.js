var fs = require('fs');
var wstream = fs.createWriteStream('nginxlog.log');
var readLine = require('readline').createInterface({
  input: fs.createReadStream(__dirname + '/log.log')
});

readLine.on('line', function (line) {
  jsonline = JSON.parse(line);

  if(!!jsonline.image.match(/nginx/)) {
    console.log(jsonline.line);
    wstream.write(jsonline.line + '\n');
  }
});

readLine.on('end', wstream.end);
