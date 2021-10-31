const express = require("express");
var exphbs = require('express-handlebars');
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser());

app.engine('template', exphbs({
    defaultLayout: "main",
    extname: ".template"
}));
app.set('view engine', 'template');

app.get('/', function (req, res) {
    res.render('post');
});

app.post('/login', function (req, res) {
    console.log(req.body);
    res.render('login', req.body);
});

app.listen(3000, () => { console.log("Server is Listening On 3000"); });