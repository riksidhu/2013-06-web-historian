exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
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
var header = function(type) {
  return extend({'content-type': type},defaultCorsHeaders);
};

exports.handleRequest = function (req, res) {
  console.log(exports.datadir);

  if (req.method === "GET") {
    var rootdirectory = "../client.html";
    fs.readFile(rootdirectory, function(err, data){
      if(err){
        console.log(err);
        res.writeHead(500);
        res.end("Server 500 Error");
      } else{
        console.log(header("text/html"));
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(data);
      }

    });


  } else if (req.method === "POST") {
    // post
  } else {
    // options
    res.writeHead(200, header);
    res.end();
  }

};
