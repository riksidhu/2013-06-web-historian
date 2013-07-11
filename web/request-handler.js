//exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
var fs = require("fs");
var path = require("path");

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var extend = function(target, source){
  for (var key in source){
    target[key] = source[key];
  }
  return target;
};

var mimeTypes = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css"
};

var header = function(type) {
  return extend({'content-type': type},defaultCorsHeaders);
};

exports.handleRequest = function (req, res) {
  console.log(exports.datadir);

  if (req.method === "GET") {

    if(req.url === '/favicon.ico'){
      res.end();
      return;
    }
    var rootdirectory = "../client.html";
    var lookup = path.basename(decodeURI(req.url));

    if (lookup === ''){
      lookup = 'client.html';
    }

    fs.readFile(rootdirectory, function(err, data){
      if(err){
        console.log(err);
        res.writeHead(500);
        res.end("Server 500 Error");
      } else{
        res.writeHead(200, {'content-type': mimeTypes[path.extname(lookup)]});
        console.log(path.extname(lookup));
        console.log(mimeTypes[path.extname(lookup)]);
        res.end(data);
      }

    });

  } else if (req.method === "POST") {
    var postData = '';
    var removeQuotes = new RegExp (/[^"|'](.+)[^"|']/g);
    req.on('data', function(chunk){
      postData += chunk;
    });
    req.on('end', function(){
      fs.appendFile('../data/sites.txt', "\n"+ removeQuotes.exec(postData)[0], function(err){
        if(err){
          throw err;
        }
        console.log("file saved!");
      });
    });
  } else {
    // options
    res.writeHead(200, header);
    res.end();
  }

};
