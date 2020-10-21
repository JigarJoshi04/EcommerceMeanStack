var express = require('express');
const createError = require('http-errors');
var app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser : true , useUnifiedTopology: true ,useFindAndModify: false}, ()=> console.log('Connected to Db!!'));

app.use(express.json());

const homeRouter = require('./routes/home')



// Router
app.use('/api',homeRouter);
app.use('/api/auth',authRouter)
app.use('/api/product',productRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});


app.listen(3000, ()=>{
  console.log('server at 3000');
} );



















// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// require('./models/db');
// var app = express();

// // view engine setup


// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'jade');

// // app.use(logger('dev'));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });




// app.listen(3000, ()=>{
//   console.log('server at 3000');
// } );

// module.exports = app;