var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var search = require('youtube-search');


var index = require('./routes/index');
var users = require('./routes/users');
cors = require('cors');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('static'));

var escapeShell = function(cmd) {
  return '"'+cmd.replace(/(["\s'$`\\])/g,'\\$1')+'"';
};
app.get('/api/:id', function (req, res) {

  exec('youtube-dl -j '+req.params.id+';',
    function (error, stdout, stderr) {
      res.send(stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
})
app.get('/api/audio/:id', function (req, res) {

  exec('youtube-dl -x -g '+req.params.id+';',
    function (error, stdout, stderr) {
request(stdout).pipe(res);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
})
app.get('/api/video/:id', function (req, res) {

  exec('youtube-dl -j '+req.params.id+';',
    function (error, stdout, stderr) {
      var jsonData = stdout; 
      var parsed = JSON.parse(stdout);
      
      res.send(parsed.formats[15].url);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
})


function getDATA(query){

}
app.get('/api/search/:id', function (req, res) {
 global.data;
  var opts = {
  maxResults: 10,
  key: 'AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI',
  type:'video'
};

search(req.params.id, opts, function(err, results) {
  if(err) return console.log(err);
 
  global.data = results;
  //console.log(global.data)
  return results;
});
exec('youtube-dl -j '+global.data[0].link+';',
    function (error, stdout, stderr) {

      var parsed = JSON.parse(stdout);
            console.log(parsed.fulltitle);
            console.log(req.params.id);

      var linkeu = parsed.formats[19].url;
res.send(linkeu);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
   // res.send(global.data[0].link);
    //console.log(global.data);
    
  });
app.get('/api/search/audio/:id', function (req, res) {
 global.data;
  var opts = {
  maxResults: 10,
  key: 'AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI',
  type:'video'
};

search(req.params.id, opts, function(err, results) {
  if(err) return console.log(err);
 
  global.data = results;
  //console.log(global.data)
  return results;
});
exec('youtube-dl -j '+global.data[0].link+';',
    function (error, stdout, stderr) {

      var parsed = JSON.parse(stdout);
            console.log(parsed.formats[15].url);
      var linkeu = parsed.formats[15].url;
res.send(linkeu);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
   // res.send(global.data[0].link);
    //console.log(global.data);
    
  });
module.exports = app;
