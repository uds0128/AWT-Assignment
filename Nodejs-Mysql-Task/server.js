const express = require('express')
const mysql = require('mysql')

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'university'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});

app.get("/db-create", (req, res) => {
    const dbquery = "CREATE DATABASE IF NOT EXISTS University";

    connection.query(dbquery, (err, result) => {
        if (err) throw err;
        console.log("Database created successfully", result)
    })
});

app.get("/db-table", (req, res) => {
    const dbtable = `CREATE TABLE IF NOT EXISTS facultyInfo(
        studentID varchar(10) NOT NULL,
        fname varchar(50) NOT NULL,
        lname varchar(50) NOT NULL,
        mobileNo varchar(15) NOT NULL,
        PRIMARY KEY (studentID))`
    connection.query(dbtable, (err, result) => {
        if (err) throw err;
        console.log("Table created successfully", result)
    });
});

app.get("/db-insert", (req, res) => {
    const dbInsert = `INSERT INTO facultyInfo
    (studentID,fname,lname,mobileNo)
    VALUES ('1','Tony','Stark','9979998798'),
    ('2','Steve','Rogers','9529595295'),
    ('3','Bruce','Banner','8578545645'),
    ('4','Prince','Burkingham', '9764319764')`;

    connection.query(dbInsert, (err, result) => {
        if (err) throw err;
        console.log(`Total affected ROWS: ${result['affectedRows']}`)
    });
});

app.get("/db-display", (req, res) => {
    const dbDisplay = "SELECT * FROM facultyInfo";

    connection.query(dbDisplay, (err, result) => {
        if (err) throw err;
        console.log(result)
    })
});

app.listen(3000, () => {
    console.log("Server is running on port number 3000")
})
