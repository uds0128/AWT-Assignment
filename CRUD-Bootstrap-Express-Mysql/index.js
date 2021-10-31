const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const { json } = require("body-parser");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'universityforcrud'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});

const app = express();

app.use(bodyParser());



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.post("/api/insert", (req, res) => {

    let institute = "";

    for (let i = 0; i < req.body.institute.length; i++) {
        institute += req.body.institute[i] + ",";
    }

    const dbInsert = `INSERT INTO coursetable
    (courseid, coursename, department, institute, university)
    VALUES ('${req.body.courseId}', '${req.body.courseName}', '${req.body.department}', '${req.body.institute}', '${req.body.university}')`;

    connection.query(dbInsert, (err, result) => {
        if (err) {
            res.json({
                "status": 0,
                "message": "Addition Failed"
            });
        }
        else {
            res.json({
                "status": 1,
                "message": "Addition Succesful"
            });
        }
    });



})

app.get("/api/show", (req, res) => {

    let getAllCourses = "SELECT * FROM coursetable";
    connection.query(getAllCourses, (err, result) => {
        if (err) {
            res.json({
                "status": 0,
                "message": "Record Fetching Failed"
            });
        }
        else {
            res.json({
                "status": 1,
                "message": "Record Fetched Successfully",
                "data": result
            });
        }
    });
})

app.post("/api/update", (req, res) => {
    let institute = "";

    for (let i = 0; i < req.body.institute.length; i++) {
        institute += req.body.institute[i] + ",";
    }

    const dbInsert = `UPDATE TABLE coursetable SET courseid = '${req.body.courseId}', coursename = '${req.body.courseName}', '${req.body.department}', '${req.body.institute}', '${req.body.university}' WHERE id=${req.body.id} )`;

    connection.query(dbInsert, (err, result) => {
        if (err) {
            res.json({
                "status": 0,
                "message": "Updation Failed"
            });
        }
        else {
            res.json({
                "status": 1,
                "message": "Updation Succesful"
            });
        }
    });
})


app.delete("/api/delete/:id", (req, res) => {
    let id = req.params.id;

    let deleteCourses = `DELETE FROM coursetable WHERE id = ${id}`;
    connection.query(deleteCourses, (err, result) => {
        if (err) {
            res.json({
                "status": 0,
                "message": "Deletation Failed"
            });
        }
        else {
            res.json({
                "status": 1,
                "message": "Deleted Successfully",
            });
        }
    });

})


app.listen(3000, () => { console.log("Server is listening on port 3000"); });