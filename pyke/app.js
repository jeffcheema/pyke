var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));
var escapeShell = function(cmd) {
  return '"'+cmd.replace(/(["\s'$`\\])/g,'\\$1')+'"';
};
app.get('/api/:id', function (req, res) {

  exec('youtube-dl -j https://youtube.com/watch?v='+escapeShell(req.params.id),
    function (error, stdout, stderr) {
      res.send(stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
})
app.get('/api/redirect/audio/:id', function (req, res) {

  exec('youtube-dl -x -g https://youtube.com/watch?v='+escapeShell(req.params.id),
    function (error, stdout, stderr) {
res.set('Location', stdout);
res.redirect(stdout);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
})
app.get('/api/redirect/video/:id', function (req, res) {
  res.set('Location', stdout);
res.redirect(stdout);
  exec('youtube-dl -g https://youtube.com/watch?v='+escapeShell(req.params.id),
    function (error, stdout, stderr) {
res.set('Location', stdout);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
})
module.exports = app;
