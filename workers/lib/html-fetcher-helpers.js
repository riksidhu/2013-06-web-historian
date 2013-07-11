var fs = require ('fs');
var path = require ('path');

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath,'utf8',function(err, data){
    if(err){
      throw err;
    }
    var newData = data.split('\n');
    return cb(newData);
  });
};

exports.downloadUrls = function(urls){
  debugger;
};