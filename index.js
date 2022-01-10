const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin@123",
    database: "freeboard"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res)=>{
    console.log('api/get', req.body);
    const sqlQuery = "SELECT * FROM freeboard;";
    db.query(sqlQuery, (err, result)=>{
        if (err) throw err;
        res.send(result);
    })
})

app.post("/api/insert", (req, res) => {
    console.log('api/insert', req.body);
    const title = req.body.title;
    const content = req.body.content;
    const sqlQuery = "INSERT INTO freeboard (title, content) VALUES (?,?)";
    db.query(sqlQuery, [title, content], (err, result) => {
        if (err)
            throw err;
        console.log(result);
        res.send('success!');
    });
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});