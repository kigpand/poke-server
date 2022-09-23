const express = require('express');
const router = express.Router();

const conn = require('../db/database');

app.get('/', (req, res) => {
    conn.query(`select * from pokemon`, (err,rows, fields) =>{
        if(rows.length !== 0){
            res.json(rows);
        }
        else{
            res.json({ result : "fail"});
        }
    })
});

app.post('/generate', (req,res)=>{
    const generate = req.body.generate;
    conn.query(`select * from pokemon where (generate ="${generate}")`, (err, rows, fields) =>{
        res.json({ result : rows });
    })
});

app.post('/title', (req,res)=>{
    const title = req.body.title;
    conn.query(`select * from pokemon where (title ="${title}")`, (err, rows, fields) =>{
        res.json({ result : rows });
    })
});

module.exports = router;