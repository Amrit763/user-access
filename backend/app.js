var express = require("express");
var path = require('path');
var logger = require('morgan');
var authentication = require('./middleware/authenticate')
// const path = require('path');

require('./config/dbconnection')
var config = require('./config')

var indexRouter = require('./routes/auth');
var usersRouter = require('./routes/users')
var testRouter = require('./routes/test')

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', indexRouter);
// app.use('')
app.use('/user' ,usersRouter);
// app.user('/test',authentication,testRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log('I am error handling middleware >>>>', err);
  res.status(err.status || 500);
  res.json({
    message: err.msg || err
  })
});

app.listen(config.port, function (err, done) {
  if (err) {
    console.log('Server listening fail >>>>> ', err)
  }
  console.log('Serer listening at port >>>> ', config.port)
})