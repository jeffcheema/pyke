var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;


var index = require('./routes/index');
var users = require('./routes/users');
cors = require('cors')
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

  exec('youtube-dl -g '+req.params.id+';',
    function (error, stdout, stderr) {
request(stdout).pipe(res);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
})
module.exports = app;
