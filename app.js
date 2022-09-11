const express = require('express');
const app = express();
const conn = require('./db/database');

conn.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.set('port', process.env.PORT || 4000);

app.get('/pokemon/:generate', (req, res) => {
    res.send(`generate: ${req.params.generate}`);
});

app.get('/generate', (req, res) => {
    res.send('pokemon123');
});

app.listen(app.get('port'), () => {
    console.log('포켓몬 서버 실행');
});