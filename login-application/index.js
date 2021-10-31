const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const e = require("express");
const app = express();
const saltRounds = 10;


app.use(cookieParser())

app.use(session({
    key: "user_id",
    secret: "k",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    },
}));

var sessionChecker = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.redirect("/dashboard")
    } //is there any session created for user ? and is there any cookie created at server side for that user
    else {
        next()
    }
}

var users = new Array();

app.use(bodyParser());

app.get("/", sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + "/views/dashboard.html");
    }
    else {
        res.send("retry");
    }
})

app.route("/signup")
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + "/views/signup.html");
    })
    .post((req, res) => {
        let { Uname, Email, Password } = req.body;
        bcrypt.hash(Password, saltRounds, function (err, hash) {
            let user = { username: Uname, email: Email, password: hash };
            users.push(user);
            console.log(users);
            req.session.user = user;
            res.redirect("/dashboard");
        });
    });

app.route("/login")
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + "/views/login.html");
    })
    .post(sessionChecker, (req, res) => {
        let { Uname, Pass } = req.body;
        let auser = users.filter(user => {
            if (user.Uname == Uname && user.Pass == Pass) {
                return true;
            }
            return false;
        });
        console.log(auser);
        res.send(__dirname + "/views/dashboard.html");
    })


app.listen(3000, (req, res) => {
    console.log("Server is listening on 3000");
});


