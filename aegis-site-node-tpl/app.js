var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'hello'
}));

app.use('/order', require('./routes/order'));
app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

if (!module.parent) {
    var port; 
    if( process.env.DOMAIN == 'a') {
        port = 3001;
    } else if( process.env.DOMAIN == 'b') {
        port = 3002;
    }else{
        port = 3001;
    }

    app.set('port', port);
    
    var server = app.listen(app.get('port'), function() {
        console.log('Express started on http://localhost:' +
            app.get('port') + '; press Ctrl-C to terminate.');
    });
}
