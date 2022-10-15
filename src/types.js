const express = require('express');
const router = express.Router();

const conn = require('../db/database');

router.get('/', (req, res) => {
    conn.query(`select * from types where name=${req.type}`, (err,rows, fields) =>{
        if(rows.length !== 0){
            res.json(rows);
        }
        else{
            res.json({ result : "fail"});
        }
    })
});

module.exports = router;