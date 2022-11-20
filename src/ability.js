const express = require('express');
const router = express.Router();

const conn = require('../db/database');

router.get('/:name', (req, res) => {
    conn.query(`select * from abilities where name = ?`, [req.params.name], (err,rows, fields) =>{
        if (rows.length !== 0) {
            res.json(rows);
        }
        else{
            res.json({ result : "fail"});
        }
    })
});

module.exports = router;