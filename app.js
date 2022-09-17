const express = require('express');
const app = express();
const conn = require('./db/database');

conn.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.set('port', process.env.PORT || 4000);

app.get('/pokemon', (req, res) => {
    conn.query(`select * from pokemon`, (err,rows, fields) =>{
        if(rows.length !== 0){
            res.json(rows);
        }
        else{
            res.json({ result : "fail"});
        }
    })
});

app.listen(app.get('port'), () => {
    console.log('포켓몬 서버 실행');
});