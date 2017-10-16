var express = require('express');
var app = express();


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
})


var routes=require('./routes/index');

app.set('view engine','ejs');

routes(app);

app.listen(3002);
console.log('Listening on PORT 3002')