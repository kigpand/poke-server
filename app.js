const express = require('express');
const mysql = require('mysql');

const app = express();

app.set('port', process.env.PORT || 4000);

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
})

app.get('/pokemon/:generate', (req, res) => {
    res.send(`generate: ${req.params.generate}`);
});

app.get('/generate', (req, res) => {
    res.send('pokemon123');
});

app.listen(app.get('port'), () => {
    console.log('포켓몬 서버 실행');
});