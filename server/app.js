var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');
var favicon = require('static-favicon');

// data log
var logger = require('morgan');
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', { flags: 'a' });
var errorLog = fs.createWriteStream('error.log', { flags: 'a' });

var index_routes = require('./server/routes/index');
// 倒计时
var countdown = require('./server/routes/countdowm');

var settings = require('./server/settings');
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');
app.use(flash());


app.use(favicon(path.join(__dirname, '/public/img/favicon.ico')));
app.use(logger('dev'));
app.use(logger({ stream: accessLog }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public'), { maxAge: 86400000 }));

// session mongodb
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },//30 days
    store: new MongoStore({
        url: settings.dbUrl
    })
}));


//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    next();
});


app.use('/', index_routes);
app.use('/countdown', countdown);

app.use(function (err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLog.write(meta + err.stack + '\n');
    next();
});

/// 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// 如果为开发环境，则打印错误堆栈
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生产环境
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
